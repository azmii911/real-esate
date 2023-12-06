import React from "react";
import UserDashboard from "../../layout/UserDashboard";
import AllListingTable from "../../components/Forms/listings/AllListingTable";

function Listings() {
  return (
    <UserDashboard>
      <div className="max-w-full mx-auto bg-white px-5 py-10 rounded-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl ">
            Listings
          </h1>
        </div>

        <div className="mt-12">
         <AllListingTable />
        </div>
      </div>
    </UserDashboard>
  );
}

export default Listings;
