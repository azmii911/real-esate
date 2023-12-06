import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function AllListingTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const {currentUser} = useSelector((state)=> state.user);

  const getAllListings = async () => {
    setIsLoading(true);

    try {
      //   Simulating API call, replace this with actual API call
      const result = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/user/listings/${currentUser._id}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const response = await result.json();

      // Simulated response for testing
      //   const response = [
      //     {
      //       _id: "1",
      //       title: "House 1",
      //       beds: 3,
      //       baths: 2,
      //       isFurnished: true,
      //       isRent: true,
      //       isParkingSlot: false,
      //       isSell: true,
      //       createdAt: "2022-01-10",
      //       regularPrice: 2000,
      //       discountedPrice: 1800,
      //     },
      //     {
      //       _id: "2",
      //       title: "House 2",
      //       beds: 4,
      //       baths: 3,
      //       isFurnished: false,
      //       isRent: true,
      //       isParkingSlot: true,
      //       isSell: false,
      //       createdAt: "2022-02-15",
      //       regularPrice: 2500,
      //       discountedPrice: null,
      //     },
      //     // Add more data as needed
      //   ];

      setListings(response);
    } catch (error) {
      toast.error("An unexpected error occurred", error.message);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllListings();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredListings = listings?.filter((listing) => {
    return (
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(listing.beds).includes(searchTerm) ||
      String(listing.baths).includes(searchTerm) ||
      String(listing.createdAt).includes(searchTerm) ||
      String(listing.regularPrice).includes(searchTerm) ||
      (listing.discountedPrice &&
        String(listing.discountedPrice).includes(searchTerm))
    );
  });

  return (
    <div className="max-w-full px-4 py-5 sm:px-6 lg:px-8  mx-auto">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden ">
              {/* Search */}
              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
                <div className="sm:col-span-1">
                  <label
                    htmlFor="hs-as-table-product-review-search"
                    className="sr-only"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="hs-as-table-product-review-search"
                      name="hs-as-table-product-review-search"
                      className="py-2 px-3 ps-11 block w-full border-[1px] border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    {/* ... (your existing search icon) */}
                  </div>
                </div>
              </div>

              {/* Main Table */}
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          Title
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          Beds and Baths
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          Details
                        </span>
                      </div>
                    </th>

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          Date
                        </span>
                      </div>
                    </th>

                    {/* <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          Status
                        </span>
                      </div>
                    </th> */}

                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          Regular Price
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          Discounted Price
                        </span>
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-start">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 ">
                          Action
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                {/* Table Rows */}
                <tbody className="divide-y divide-gray-200">
                  {filteredListings.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        NO DATA FOUND
                      </td>
                    </tr>
                  ) : (
                    filteredListings.map((listing) => (
                      <tr
                        className="bg-white hover:bg-gray-50 "
                        key={listing?._id}
                      >
                        <td className="h-px w-px whitespace-nowrap align-top">
                          <span className="block p-6" href="#">
                            <div className="flex items-center gap-x-4">
                              <img
                                className="flex-shrink-0 h-[2.375rem] w-[2.375rem] rounded-lg"
                                src="https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=320&q=80"
                                alt="Image Description"
                              />
                              <div>
                                <span className="block text-sm font-semibold text-gray-800 ">
                                  {listing.title}
                                </span>
                              </div>
                            </div>
                          </span>
                        </td>
                        <td className="h-px w-px whitespace-nowrap align-top">
                          <span className="block p-6" href="#">
                            <div className="flex items-center ">
                              <div className="grow flex flex-col gap-x-2 items-center ">
                                <span className=" text-sm font-normal text-gray-800 ">
                                  <svg
                                    className=" fill-primary h-6 w-6"
                                    version="1.1"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 511.998 511.998"
                                  >
                                    <g>
                                      <g>
                                        <path
                                          d="M235.561,335.822c-15.536,0-28.138-12.183-28.746-27.641c-0.253-6.419-0.302-12.887-0.119-19.576h-81.239
			c3.829-4.03,6.193-9.464,6.193-15.461c0-12.409-10.059-22.468-22.468-22.468h-0.313c15.053-3.356,26.432-16.645,26.728-32.747
			c0.347-18.884-14.682-34.475-33.567-34.821c-18.884-0.347-34.475,14.682-34.821,33.566c-0.303,16.526,11.168,30.529,26.694,34.002
			H52.657V136.21c0-6.283-5.093-11.376-11.376-11.376H11.376C5.093,124.834,0,129.927,0,136.21l0.199,219.577
			c0,7.755,6.288,14.043,14.043,14.043h24.474v8.229c0,5.028,4.076,9.104,9.104,9.104h45.669c5.028,0,9.104-4.076,9.104-9.104
			v-8.229H408.25v8.229c0,5.028,4.076,9.104,9.104,9.104h45.669c5.028,0,9.104-4.076,9.104-9.104v-8.229h21.509
			c7.755,0,14.043-6.288,14.043-14.043v-20.156C458.447,335.663,252.037,335.822,235.561,335.822z"
                                        />
                                      </g>
                                    </g>
                                    <g>
                                      <g>
                                        <path
                                          d="M320.098,214.364c-0.001-0.001-0.002-0.003-0.003-0.004c-4.804-7.754-15.006-10.108-22.711-5.337
			c-0.001,0-0.002,0.001-0.003,0.002l-48.526,30.055l-57.053-26.148l26.78,4.723c4.175-12.724,8.895-23.192,13.237-31.378
			l-62.089-1.14c-12.892-0.236-23.294,10.163-23.523,22.674l-0.756,41.192c-0.231,12.712,10.003,23.292,22.677,23.524l39.412,0.723
			c0.212-2.548,0.457-5.052,0.732-7.511l-28.126-21.845c0.247,0.114,63.004,28.875,63.004,28.875
			c4.798,2.198,10.74,2.012,15.561-0.974l56.047-34.714C322.536,232.265,324.881,222.086,320.098,214.364z"
                                        />
                                      </g>
                                    </g>
                                    <g>
                                      <g>
                                        <path
                                          d="M463.476,208.226c-62.726-18.113-164.001-31.505-201.971-30.431c0,0-12.598,14.513-22.559,43.451l6.706,1.182
			l43.387-26.873c14.998-9.289,34.99-4.931,44.525,10.466c9.365,15.118,4.772,35.091-10.466,44.526l-56.047,34.714
			c-13.218,8.188-27.946,4.425-33.623,0.017l-5.883-4.569c-0.503,8.387-0.643,17.255-0.272,26.666
			c0.175,4.45,3.831,7.971,8.285,7.971H497.76c4.068,0,7.537-2.95,8.189-6.965l5.294-32.56
			C516.415,244.021,494.427,217.163,463.476,208.226z"
                                        />
                                      </g>
                                    </g>
                                  </svg>
                                </span>
                                <span className="text-xs">{listing.beds}</span>
                              </div>
                              <div className="grow flex flex-col gap-x-2 items-center">
                                <span className=" text-sm font-normal text-gray-800 ">
                                  <svg
                                    className=" fill-primary h-6 w-6"
                                    version="1.1"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                  >
                                    <g
                                      id="SVGRepo_bgCarrier"
                                      strokeWidth="0"
                                    ></g>
                                    <g
                                      id="SVGRepo_tracerCarrier"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                      {" "}
                                      <path d="M484.615,197.061v24.064c0,0.61,0,1.208-0.012,1.817c-0.966,92.403-76.184,167.011-168.806,167.011 h-205.42c-45.839,0-82.994-37.155-82.994-82.994V197.061L484.615,197.061L484.615,197.061z"></path>{" "}
                                      <path d="M358.928,370.978H153.514c-45.839,0-83-37.16-83-83v-90.919H27.38v109.898c0,45.839,37.16,83,83,83 h205.414c32.59,0,63.018-9.244,88.821-25.24C390.082,368.793,374.761,370.978,358.928,370.978z"></path>{" "}
                                      <path d="M484.394,157.766H27.606c-10.481,0-18.979,8.497-18.979,18.979v1.337 c0,10.481,8.497,18.979,18.979,18.979h456.788c10.482,0,18.979-8.497,18.979-18.979v-1.337 C503.373,166.263,494.876,157.766,484.394,157.766z"></path>{" "}
                                      <path d="M78.285,177.413L78.285,177.413c0-10.851,8.796-19.647,19.647-19.647H28.274 c-10.851,0-19.647,8.796-19.647,19.647l0,0c0,10.851,8.796,19.647,19.647,19.647h69.657 C87.081,197.06,78.285,188.264,78.285,177.413z"></path>{" "}
                                      <polyline points="62.646,373.436 35.865,443.54 66.228,443.54 139.458,389.958 "></polyline>{" "}
                                      <path d="M484.615,197.061v24.064c0,0.61,0,1.208-0.012,1.817H27.384v-25.882H484.615z"></path>{" "}
                                      <polyline points="351.467,384.972 431.5,443.535 461.866,443.535 424.903,346.749 424.796,346.487 "></polyline>{" "}
                                      <path d="M512,177.413c0-15.59-12.683-28.274-28.274-28.274h-83.5c-4.765,0-8.627,3.863-8.627,8.627c0,4.765,3.863,8.627,8.627,8.627 h83.5c6.076,0,11.02,4.943,11.02,11.02c0,6.077-4.943,11.02-11.02,11.02H28.274c-6.076,0-11.02-4.943-11.02-11.02 c0-6.076,4.943-11.02,11.02-11.02h335.041c4.765,0,8.627-3.863,8.627-8.627c0-4.765-3.863-8.627-8.627-8.627H51.637V97.04 c0-11,8.949-19.951,19.951-19.951c11,0,19.95,8.949,19.95,19.951v1.786c0,4.765,3.863,8.627,8.627,8.627 c4.765,0,8.627-3.863,8.627-8.627V97.04c0-20.514-16.69-37.205-37.205-37.205c-20.514,0-37.204,16.69-37.204,37.205v52.099h-6.108 C12.684,149.139,0,161.822,0,177.413c0,12.251,7.834,22.703,18.753,26.621v43.037c0,4.765,3.863,8.627,8.627,8.627 s8.627-3.863,8.627-8.627v-41.383h439.985v9.503c0,18.385-2.98,36.444-8.858,53.675c-1.538,4.509,0.87,9.412,5.38,10.951 c0.923,0.315,1.862,0.465,2.786,0.465c3.589,0,6.941-2.257,8.165-5.845c6.492-19.028,9.783-38.961,9.783-59.245v-11.156 C504.167,200.116,512,189.664,512,177.413z"></path>{" "}
                                      <path d="M435.064,349.171c13.018-12.172,24.271-26.213,33.296-41.681c2.401-4.116,1.011-9.398-3.103-11.8 c-4.117-2.4-9.398-1.011-11.8,3.104c-14.389,24.66-35.01,45.334-59.635,59.788c-25.357,14.883-54.393,22.749-83.97,22.749h-196.55 c-42.62,0-77.293-34.673-77.293-77.293v-23.031c0-4.765-3.863-8.627-8.627-8.627s-8.627,3.863-8.627,8.627v23.03 c0,28.921,13.066,54.836,33.59,72.193L27.806,440.46c-1.012,2.651-0.657,5.632,0.954,7.97c1.61,2.339,4.268,3.735,7.107,3.735 h30.363c1.831,0,3.617-0.583,5.095-1.664l70.954-51.917h167.575c13.402,0,26.698-1.487,39.662-4.352l76.893,56.264 c1.478,1.081,3.262,1.664,5.095,1.664h30.364c2.839,0,5.496-1.396,7.105-3.735s1.966-5.319,0.954-7.97L435.064,349.171z M63.41,434.912H48.395l18.538-48.526c13.647,7.714,29.379,12.151,46.131,12.192L63.41,434.912z M434.319,434.908l-63.755-46.651 c11.087-3.882,21.808-8.819,31.991-14.795c6.444-3.782,12.629-7.962,18.543-12.483l28.236,73.93H434.319z"></path>{" "}
                                    </g>
                                  </svg>
                                </span>
                                <span className="text-xs">{listing.baths}</span>
                              </div>
                            </div>
                          </span>
                        </td>
                        <td className="h-px w-72 min-w-[18rem] align-top">
                          <span className="block p-6" href="#">
                            <span className="block ">
                              {/* Sell Rent Parking Spot Funrished */}
                              <div className="flex flex-row  items-center gap-x-2 ">
                                <span className="text-xs  bg-gray-100 p-1 rounded-sm w-fit">
                                  {listing.isFurnished
                                    ? "Furnished"
                                    : "Not Furnished"}
                                </span>
                                <span className="text-xs  bg-gray-100 p-1 rounded-sm w-fit">
                                  {listing.isRent ? "Rent" : "Not Rent"}
                                </span>
                                <span className="text-xs  bg-gray-100 p-1 rounded-sm w-fit">
                                  {listing.isParkingSlot
                                    ? "Parking Slot"
                                    : "No Parking Slot"}
                                </span>
                                <span className="text-xs  bg-gray-100 p-1 rounded-sm w-fit">
                                  {listing.isSell ? "Sell" : "No Sell"}
                                </span>
                              </div>
                            </span>
                          </span>
                        </td>
                        <td className="h-px w-px whitespace-nowrap align-top">
                          <span className="block p-6" href="#">
                            <span className="text-sm text-gray-600 ">
                              {/* 10 Jan 2022 */}
                              {moment(listing.createdAt).format("DD MMM YYYY")}
                            </span>
                          </span>
                        </td>
                        {/* <td className="h-px w-px whitespace-nowrap align-top">
                              <span className="block p-6" href="#">
                                <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full">
                                  <svg
                                    className="w-2.5 h-2.5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                  </svg>
                                  Published
                                </span>
                              </span>
                            </td> */}

                        <td className="h-px w-px whitespace-nowrap align-top">
                          <span className="block p-6">
                            <span className="text-sm text-gray-600 font-semibold ">
                              {listing.discountedPrice ? (
                                <strike> ${listing.regularPrice}</strike>
                              ) : (
                                listing.regularPrice
                              )}
                            </span>
                          </span>
                        </td>
                        <td className="h-px w-px whitespace-nowrap align-top">
                          <span className="block p-6">
                            <span className="text-sm text-gray-600 font-semibold ">
                              {listing.discountedPrice
                                ? `$ ${listing.discountedPrice}`
                                : "None"}
                            </span>
                          </span>
                        </td>
                        <td className="h-px w-px whitespace-nowrap align-top">
                          <span className="block p-6" href="#">
                            <Link to={`/dashboard/listings/${listing._id}`}>
                              <span className="py-2 px-3 inline-flex items-center gap-x-1 text-xs font-medium bg-primary text-white rounded-md cursor-pointer">
                                View
                              </span>
                            </Link>
                            <Link to={`/dashboard/listings/edit/${listing._id}`}>
                              <span className="ml-2 py-2 px-3 inline-flex items-center gap-x-1 text-xs font-medium bg-primary text-white rounded-md cursor-pointer">
                                Edit
                              </span>
                            </Link>
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Table bottom */}
              <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 ">
                <div className="max-w-sm space-y-3">
                  <select className="py-2 px-3 pe-9 block border-[1px] border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 ">
                    <option defaultValue={1}>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                  </select>
                </div>

                <div>
                  <div className="inline-flex gap-x-2">
                    <button
                      type="button"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
                    >
                      <svg
                        className="flex-shrink-0 w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                      Prev
                    </button>

                    <button
                      type="button"
                      className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
                    >
                      Next
                      <svg
                        className="flex-shrink-0 w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllListingTable;
