import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SignIn } from "../redux/user/userSlice";

function GoogleAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    // console.log("handleGoogleAuth");
    setIsLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/googleAuth`,
        {
          method: "Post",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: result.user.email,
            displayName: result.user.displayName,
            photoURL: result.user.photoURL
          }),
        }
      );
      const response = await res.json();

      if (!res.ok) {
        const errorResponse = await res.json();
        toast.error(errorResponse.message);
      } else {
        toast.success("Google SignIn Success!");
        dispatch(SignIn(response));
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Can not SignIn with Google", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      onClick={handleGoogleAuth}
      type="button"
      className={`w-full py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-primary transition-all text-sm ${
        isLoading ? "bg-primary  cursor-not-allowed" : ""
      }`}
      disabled={isLoading}
    >
      <svg
        className="w-4 h-auto"
        width="46"
        height="47"
        viewBox="0 0 46 47"
        fill="none"
      >
        <path
          d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
          fill="#4285F4"
        />
        <path
          d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
          fill="#34A853"
        />
        <path
          d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
          fill="#FBBC05"
        />
        <path
          d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
          fill="#EB4335"
        />
      </svg>

      {isLoading ? "Logging In..." : "Continue with Google"}
    </button>
  );
}

export default GoogleAuth;
