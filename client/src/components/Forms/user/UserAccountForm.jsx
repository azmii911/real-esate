import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignIn } from "../../../redux/user/userSlice";

function UserAccountForm() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Check if any field other than password and newPassword has changed
    const hasChanges = Object.keys(data).some(
      (key) =>
        key !== "password" &&
        key !== "newPassword" &&
        data[key] !== currentUser[key]
    );

    // Check if new password is changing
    const isNewPasswordChanging =
      data.newPassword && data.newPassword !== currentUser.newPassword;

    // If no changes and new password is not changing, show a warning message
    if (!hasChanges && !isNewPasswordChanging) {
      toast.warn("No field is changed. Can not update.");
      return; // Early return if there's no change
    }

    // If new password is changing, validate current password
    if (isNewPasswordChanging && !data.password) {
      toast.error(
        "Current Password is required when changing the new password"
      );
      return; // Early return if there's an error
    }

    // If new password is changing, ensure current password is not the same as new password
    if (isNewPasswordChanging && data.password === data.newPassword) {
      toast.error("New Password cannot be the same as the current Password");
      return; // Early return if there's an error
    }

    try {
      setIsLoading(true);
      const result = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/user/update/${currentUser?._id}`,
        {
          method: "POST",
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
        console.log("errorResponse.message", errorResponse.message);
      } else {
        toast.success("Account Updated Successfully!");
        dispatch(SignIn(response));

        // reset();
        // navigate("/login");

        // perform actions upon successful signup
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 lg:gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          <div>
            <label
              htmlFor="hs-firstname-hire-us-2"
              className="block mb-2 text-sm text-gray-700 font-medium "
            >
              First Name
            </label>
            <input
              type="text"
              defaultValue={currentUser?.firstName}
              name="hs-firstname-hire-us-2"
              id="hs-firstname-hire-us-2"
              className="py-3 px-4 block w-full border-[1px] border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none"
              {...register("firstName", {
                required: "First Name is required",
                minLength: 2,
                maxLength: 15,
              })}
            />
            {errors.firstName?.type == "minLength" && (
              <p className="text-xs text-red-600 mt-2" role="alert">
                At least 2 Characters
              </p>
            )}
            {errors.firstName?.type == "maxLength" && (
              <p className="text-xs text-red-600 mt-2" role="alert">
                Max 15 Characters
              </p>
            )}
            <p className="text-xs text-red-600 mt-2" role="alert">
              {errors.firstName?.message}
            </p>
          </div>

          <div>
            <label
              htmlFor="hs-lastname-hire-us-2"
              className="block mb-2 text-sm text-gray-700 font-medium"
            >
              Last Name
            </label>
            <input
              type="text"
              defaultValue={currentUser?.lastName}
              name="hs-lastname-hire-us-2"
              id="hs-lastname-hire-us-2"
              className="py-3 px-4 block w-full border-[1px] border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none"
              {...register("lastName", {
                required: "Last Name is required",
                minLength: 2,
                maxLength: 15,
              })}
            />
            {errors.lastName?.type == "minLength" && (
              <p className="text-xs text-red-600 mt-2" role="alert">
                At least 2 Characters
              </p>
            )}
            {errors.lastName?.type == "maxLength" && (
              <p className="text-xs text-red-600 mt-2" role="alert">
                Max 15 Characters
              </p>
            )}
            <p className="text-xs text-red-600 mt-2" role="alert">
              {errors.lastName?.message}
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="hs-email-hire-us-2"
            className="block mb-2 text-sm text-gray-700 font-medium "
          >
            Email
          </label>
          <input
            type="email"
            defaultValue={currentUser?.email}
            name="hs-email-hire-us-2"
            id="hs-email-hire-us-2"
            autoComplete="email"
            className="py-3 px-4 block w-full border-[1px] border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          <div>
            <label
              htmlFor="hs-password-hire-us-2"
              className="block mb-2 text-sm text-gray-700 font-medium "
            >
              Current Password
            </label>
            <input
              type="password"
              name="hs-password-hire-us-2"
              id="hs-password-hire-us-2"
              className="py-3 px-4 block w-full border-[1px] border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
              {...register("password", {
                minLength: 8,
                maxLength: 26,
              })}
            />
            {errors.password?.type === "minLength" && (
              <p className="text-xs text-red-600 mt-2" role="alert">
                At least 8 Characters
              </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-xs text-red-600 mt-2" role="alert">
                Max 26 Characters
              </p>
            )}
            {errors.password?.message && (
              <p className="text-xs text-red-600 mt-2" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="hs-new-password-hire-us-2"
              className="block mb-2 text-sm text-gray-700 font-medium "
            >
              New Password
            </label>
            <input
              type="password"
              name="hs-new-password-hire-us-2"
              id="hs-new-password-hire-us-2"
              className="py-3 px-4 block w-full border-[1px] border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
              {...register("newPassword", {
                minLength: 8,
                maxLength: 26,
              })}
            />
            {errors.newPassword?.type === "minLength" && (
              <p className="text-xs text-red-600 mt-2" role="alert">
                At least 8 Characters
              </p>
            )}
            {errors.newPassword?.type === "maxLength" && (
              <p className="text-xs text-red-600 mt-2" role="alert">
                Max 26 Characters
              </p>
            )}
            {errors.newPassword?.message && (
              <p className="text-xs text-red-600 mt-2" role="alert">
                {errors.newPassword.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="hs-about-hire-us-2"
            className="block mb-2 text-sm text-gray-700 font-medium "
          >
            About You
          </label>
          <textarea
            id="hs-about-hire-us-2"
            name="hs-about-hire-us-2"
            rows="4"
            defaultValue={currentUser?.about}
            className="py-3 px-4 block w-full border-[1px] border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
            {...register("about", {
              required: false,
              minLength: 100,
              maxLength: 1000,
            })}
          ></textarea>
          {errors.about?.type == "minLength" && (
            <p className="text-xs text-red-600 mt-2" role="alert">
              At least 100 Characters
            </p>
          )}
          {errors.about?.type == "maxLength" && (
            <p className="text-xs text-red-600 mt-2" role="alert">
              Max 1000 Characters
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 grid">
        <button
          type="submit"
          className={`w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-normal rounded-lg border border-transparent bg-primary text-white hover:bg-primary disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ${
            isLoading ? "bg-primary/50  cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Updating ..." : "Update Account"}
        </button>
      </div>
    </form>
  );
}

export default UserAccountForm;
