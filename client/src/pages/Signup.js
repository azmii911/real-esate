import React from "react";
import MainLayout from "../layout/MainLayout";
import { Link } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
import SignupForm from "../components/Forms/SignupForm";

function Signup() {
  return (
    <MainLayout>
      <main className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm ">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-3xl font-bold text-gray-800 ">
                Create your Account
              </h1>
              <p className="mt-2 text-sm text-gray-600 ">
                Already have an account?
                <Link to="/login">
                  <span className="ml-1 text-primary decoration-2 hover:underline font-medium">
                    Login here
                  </span>
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <GoogleAuth />

              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:mr-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ml-6 ">
                Or
              </div>

              <SignupForm />
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

export default Signup;
