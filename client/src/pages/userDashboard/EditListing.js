import React from "react";
import UserDashboard from "../../layout/UserDashboard";
import AllListingTable from "../../components/Forms/listings/AllListingTable";
import { useParams } from "react-router-dom";
import EditListingForm from "../../components/Forms/listings/EditListingForm";

function ViewListing() {
  const { listingId } = useParams();

  
  return (
    <UserDashboard>
      <div className="max-w-6xl mx-auto bg-white px-5 py-10 rounded-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl ">
            Edit Listing
          </h1>
        </div>

        <div className="mt-12">
          {/* <AllListingTable /> */}
          Edit Listing Id: <span className="font-bold">{listingId}</span>
          <div className="py-5">
            <hr />
          </div>
          <EditListingForm listingId={listingId} />
        </div>
      </div>
    </UserDashboard>
  );
}

export default ViewListing;
