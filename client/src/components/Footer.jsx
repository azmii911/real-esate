import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full  py-10 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="text-center">
        <div className="mt-3">
          <p className="text-gray-500">
            Coded with ❤️ by{" "}
            <Link
              to="https://www.upwork.com/freelancers/~0198749a995f7e386e"
              target="_blank"
            >
              <span className="font-semibold text-primary hover:text-green-600">
                Raheel Azmi
              </span>{" "}
            </Link>
          </p>
          <p className="text-gray-500">
            © Raheel Azmi. 2023 Real-Estate App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
