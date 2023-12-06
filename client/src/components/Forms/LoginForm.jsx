import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {  useDispatch } from "react-redux";
import {SignIn} from "../../redux/user/userSlice"

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/signin`,
        {
          method: "Post",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
        const response = await result.json();

      if (!result.ok) {
        const errorResponse = await result.json();
        toast.error(errorResponse.message);
      }
      else{
            toast.success("Login Successfully!");
            reset();
            dispatch(SignIn(response));
            navigate("/dashboard/account")
      }
    } catch (error) {
      toast.error("An unexpected error occurred", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-y-4">
        <div>
          <label htmlFor="email" className="block text-sm mb-2 ">
            Email address
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              className="py-3 px-4 block w-full border-[1px] border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary "
              aria-describedby="email-error"
              {...register("email", {
                required: "Email is Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please enter a valid email",
                },
              })}
            />
            <p className="text-xs text-red-600 mt-2" role="alert">
              {errors.email?.message}
            </p>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="block text-sm mb-2">
              Password
            </label>
          </div>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              className="py-3 px-4 block w-full border-[1px] border-gray-200 rounded-md text-sm focus:border-primary focus:ring-primary  "
              aria-describedby="password-error"
              {...register("password", {
                required: "password is required",
                minLength: 8,
                maxLength: 26,
              })}
            />
            {errors.password?.type == "minLength" && (
              <p className="text-xs text-red-600 mt-2" role="alert">
                At least 8 Characters
              </p>
            )}
            {errors.password?.type == "maxLength" && (
              <p className="text-xs text-red-600 mt-2" role="alert">
                Max 26 Characters
              </p>
            )}
            <p className="text-xs text-red-600 mt-2" role="alert">
              {errors.password?.message}
            </p>
          </div>
        </div>

        <button
          type="submit"
          className={`py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-normal ${
            isLoading
              ? "bg-primary/50  cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none focus:ring-offset-primary transition-all"
          } text-sm`}
          disabled={isLoading}
        >
          {isLoading ? "Logging In..." : "Login"}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
