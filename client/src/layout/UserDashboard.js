import React from 'react'
import Sidebar from "../components/UserDashboard/Sidebar.jsx";
import Breadcrum from "../components/UserDashboard/Breadcrum.jsx";

function UserDashboard({ children }) {
  return (
    <div className="bg-gray-50 ">
      <Breadcrum />

      <Sidebar />

      <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:pl-72 bg-gray-100 h-screen">
        <section className='h-full'>{children}</section>
      </div>
    </div>
  );
}

export default UserDashboard