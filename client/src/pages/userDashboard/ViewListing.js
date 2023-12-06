import React, { useEffect, useState } from "react";
import UserDashboard from "../../layout/UserDashboard";
import AllListingTable from "../../components/Forms/listings/AllListingTable";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

function ViewListing() {
  const { listingId } = useParams();
  console.log(listingId);
  const [listing, setListing] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchListing = async () => {
    try {
      const result = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/listing/listing/${listingId}`,
        {
          method: "Get",
          credentials: "include",
        }
      );
      const response = await result.json();
      setListing(response);
      console.log("DATA SHOULD BE HERE >>", listing);
    } catch (error) {
      toast.error("An unexpected error occurred", error.message);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchListing();
  }, []);
  return (
    <UserDashboard>
      <div className="max-w-4xl mx-auto bg-white px-5 py-10 rounded-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl ">
            View Listings
          </h1>
        </div>

        <div className="mt-12">
          {/* <AllListingTable /> */}
          <div className="flex flex-col gap-5">
            <span className="">
              ID of the listing:
              <span className="font-semibold ml-2">{listingId}</span>
            </span>
            <span className="">
              Posted At:
              <span className="font-semibold ml-2">
                {" "}
                {moment(listing.createdAt).format("DD MMM YYYY")}
              </span>
            </span>
          </div>
          <SingleListing listing={listing} />
        </div>
      </div>
    </UserDashboard>
  );
}

export default ViewListing;

export function SingleListing({ listing }) {
  return (
    <div className=" pt-5 ">
      <hr />
      <div className="flex flex-col md:flex-row justify-between gap-10  mt-5">
        {/* Col 1 */}
        <div className="flex flex-col gap-y-5 w-[70%]">
          <div className="flex flex-row items-center gap-x-3 text-md">
            <span className=" text-gray-400 text-sm">Title:</span>
            <span>{listing?.title}</span>
          </div>
          <div className="flex flex-row items-center gap-x-3 text-md">
            <span className=" text-gray-400 text-sm">Address:</span>
            <span>{listing?.address}</span>
          </div>

          <div className="flex flex-row items-center gap-x-3 text-md">
            <span className=" text-gray-400 text-sm">Number of Beds:</span>
            <span>{listing?.beds}</span>
          </div>
          <div className="flex flex-row items-center gap-x-3 text-md">
            <span className=" text-gray-400 text-sm">Number of Baths:</span>
            <span>{listing?.baths}</span>
          </div>
          <div className="flex flex-row items-center gap-x-3 text-md">
            <span className=" text-gray-400 text-sm">Regular Price:</span>
            <span>${listing?.regularPrice}</span>
          </div>
          {listing.discountedPrice ? (
            <div className="flex flex-row items-center gap-x-3 text-md">
              <span className=" text-gray-400 text-sm">Discounted Price:</span>
              <span>${listing?.discountedPrice}</span>
            </div>
          ) : (
            ""
          )}
          <div className="flex flex-row  gap-x-3 text-md">
            <span className=" text-gray-400 text-sm">Description:</span>
            <span className="">{listing?.description}</span>
          </div>
        </div>
        {/* col 2 */}
        <div className="flex flex-col gap-y-5 flex-1">
          <div className="flex flex-row items-center gap-x-3 text-md">
            <span className=" text-gray-400 text-sm">Sell:</span>

            {listing?.isSell ? <span>Yes</span> : "No"}
          </div>
          <div className="flex flex-row items-center gap-x-3 text-md">
            <span className=" text-gray-400 text-sm">Rent:</span>
            {listing?.isRent ? <span>Yes</span> : "No"}
          </div>
          <div className="flex flex-row items-center gap-x-3 text-md">
            <span className=" text-gray-400 text-sm">Parking Slot:</span>
            {listing?.isParkingSlot ? <span>Yes</span> : "No"}
          </div>
          <div className="flex flex-row items-center gap-x-3 text-md">
            <span className=" text-gray-400 text-sm">Funrished:</span>
            {listing?.isFurnished ? <span>Yes</span> : "No"}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end p-3 mt-10">
        <div className="grid">
          <Link
            to={`/dashboard/listings/edit/${listing._id}`}
          >
            <span
              className={`w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-normal rounded-lg border border-transparent bg-primary text-white hover:bg-primary disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
            >
              {/* {isLoading ? "Publishing ..." : "Publish Lisitng"} */}
              Edit Listing
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
