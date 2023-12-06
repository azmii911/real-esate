import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListingCard from "../components/ListingCard";

function SingleListing() {
  const { id } = useParams();
  const [listing, setlisting] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  const getListingAndUserDetails = async () => {
    try {
      const result = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/listing/listing/${id}`
      );
      const response = await result.json();
      setlisting(response);

      const userResult = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/user/getuser/${response.userId}`
      );
      const userResponse = await userResult.json();
      setUserDetails(userResponse);
    } catch (error) {
      toast.error("An unexpected error occurred", error.message);
    }
  };
 
  useEffect(() => {
    getListingAndUserDetails();
  }, []);

  return (
    <MainLayout>
      <div className="pb-10">
        <img
          src={
            listing?.imageUrl || `https://source.unsplash.com/random/?property`
          }
          alt={listing?.title}
          className="w-full md:h-[600px] object-cover bg-cover bg-center"
        />

        <div className="flex flex-col md:flex-row justify-start  gap-10">
          <div
            id="firstChild"
            className="max-w-5xl  flex-auto p-4  bg-white border-[1px] rounded-xl sm:mt-10 md:p-10"
          >
            <div className="flex flex-row gap-x-1 ">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-primary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className=" block mb-1 text-md font-semibold uppercase text-primary">
                  {listing?.address}
                </h3>
              </div>
            </div>
            <div className="mt-2">
              {!listing?.discountedPrice ? (
                <h3 className="text-2xl md:text-4xl font-semibold text-gray-800">
                  {listing?.title} - ${listing?.regularPrice}
                </h3>
              ) : (
                <h3 className="text-2xl md:text-4xl font-semibold text-gray-800">
                  {listing?.title} - <strike className="text-gray-500 font-normal">${listing?.regularPrice}</strike> $
                  {listing?.discountedPrice}
                </h3>
              )}

              <div className="mt-5 flex flex-row ">
                <div>
                  {listing?.isSale ? (
                    <button
                      type="button"
                      className="mr-5 py-3 px-4 inline-flex items-center gap-x-2 text-md font-semibold rounded-md border border-transparent bg-primary text-white "
                    >
                      For Sale
                    </button>
                  ) : (
                    ""
                  )}
                </div>

                <div>
                  {listing?.isRent ? (
                    <button
                      type="button"
                      className="py-3 px-4 inline-flex items-center gap-x-2 text-md font-semibold rounded-md border border-transparent bg-primary text-white "
                    >
                      For Rent
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="mt-8 flex flex-row whitespace-nowrap flex-wrap gap-y-2">
                <span className="mx-2 py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-primary/20 text-primary rounded-md ">
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  {listing?.beds} Beds
                </span>
                <span className="mx-2 py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-primary/20 text-primary rounded-md ">
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  {listing?.baths} Baths
                </span>
                <span className="mx-2 py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-primary/20 text-primary rounded-md ">
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  {listing?.isFurnished ? "Furnished" : "Not Furnished"}
                </span>
                <span className="mx-2 py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-primary/20 text-primary rounded-md ">
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  {listing?.isParkingSlot ? "Parking Slot" : "No Parking"}
                </span>
                <span className="mx-2 py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-primary/20 text-primary rounded-md ">
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  {listing?.isSell ? "For Sale" : "Not For Sale"}
                </span>
                <span className="mx-2 py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-primary/20 text-primary rounded-md ">
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                  {listing?.isRent ? "For Rent" : "Not For Rent"}
                </span>
              </div>

              <div className="mt-5">
                <div className=" mb-3 font-semibold text-xl">Descrtiption: </div>
                <span className="text-gray-500 text-sm">{listing?.description}</span>
              </div>
            </div>
          </div>
          <div id="secondChild" className="flex-auto">
            <div className="">
              <div className="mt-5 p-4  bg-white border-[1px] rounded-xl sm:mt-10 md:p-10">
                <div className="mb-10">
                  <h2 className=" font-normal text-3xl">
                    Contact{" "}
                    <span className="font-semibold text-primary">
                      {userDetails?.firstName} {userDetails?.lastName}
                    </span>
                  </h2>
                  {userDetails?.phone ? (
                    <label className="block mt-5 text-sm font-medium ">
                      Phone Number:{" "}
                      <span className="text-primary">{userDetails?.phone}</span>
                    </label>
                  ) : (
                    ""
                  )}
                  {userDetails?.email ? (
                    <label className="block mt-5 text-sm font-medium ">
                      Email Address:{" "}
                      <span className="text-primary">{userDetails?.email}</span>
                    </label>
                  ) : (
                    ""
                  )}
                </div>
                <form>
                  <div className="mb-5 font-semibold text-xl">
                    Request information about this property
                  </div>
                  <div className="mb-4 sm:mb-8">
                    <label
                      for="hs-feedback-post-comment-name-1"
                      className="block mb-2 text-sm font-medium "
                    >
                      Full name
                    </label>
                    <input
                      type="text"
                      id="hs-feedback-post-comment-name-1"
                      className="py-3 px-4 block w-full border-[1px] border-gray-200 rounded-lg text-sm focus:border-primnary focus:ring-primnary disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Full name"
                    />
                  </div>
                  <div className="mb-4 sm:mb-8">
                    <label
                      for="hs-feedback-post-comment-email-1"
                      className="block mb-2 text-sm font-medium "
                    >
                      Email address
                    </label>
                    <input
                      type="email"
                      id="hs-feedback-post-comment-email-1"
                      className="py-3 px-4 block w-full border-[1px] border-gray-200 rounded-lg text-sm focus:border-primnary focus:ring-primnary disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label
                      for="hs-feedback-post-comment-textarea-1"
                      className="block mb-2 text-sm font-medium "
                    >
                      Comment
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="hs-feedback-post-comment-textarea-1"
                        name="hs-feedback-post-comment-textarea-1"
                        rows="3"
                        className="py-3 px-4 block w-full border-[1px] border-gray-200 rounded-lg text-sm focus:border-primnary focus:ring-primnary disabled:opacity-50 disabled:pointer-events-none"
                        placeholder="Leave your comment here..."
                      ></textarea>
                    </div>
                  </div>
                  <div className="mt-6 grid">
                    <button
                      type="button"
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white hover:bg-primary disabled:opacity-50 disabled:pointer-events-none "
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </div>
     
    </MainLayout>
  );
}

export default SingleListing;

