import { Link } from "react-router-dom";

export default function SingleListing({ listing }) {
  const timestamp = new Date().getTime();

  return (
    <div className="group flex flex-col h-fit bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="flex flex-col  justify-center items-center bg-primary rounded-t-xl">
        <img
          src={
            listing.imageUrl ||
            `https://source.unsplash.com/random/?house,property,interior&t=${timestamp}`
          }
          alt={listing.title}
          className="object-cover h-64 w-full bg-cover bg-no-repeat "
        />
      </div>
      <div className="p-4 md:p-6 md:py-10">
        <div className="flex flex-row gap-x-1">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-primary"
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
            <h3 className=" block mb-1 text-xs font-semibold uppercase text-primary">
              {listing.address}
            </h3>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{listing.title}</h3>
        <p className="mt-3 text-xs text-gray-500">
          {listing.description.slice(0, 100)}
        </p>
        {!listing.discountedPrice ? (
          <h3 className="mt-3 text-xl font-semibold text-gray-800">
            ${listing.regularPrice}
          </h3>
        ) : (
          <div className="flex flex-row gap-x-5">
            <strike>
              <h3 className="mt-3 text-xl font-semibold text-gray-500">
                ${listing.regularPrice}
              </h3>
            </strike>
            <h3 className="mt-3 text-xl font-semibold text-gray-800">
              ${listing.discountedPrice}
            </h3>
          </div>
        )}

        <div className="mt-3 flex flex-row whitespace-nowrap flex-wrap gap-y-2">
          <span class="mx-2 py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-primary/20 text-primary rounded-md ">
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
            {listing.beds} Beds
          </span>
          <span class="mx-2 py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-primary/20 text-primary rounded-md ">
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
            {listing.baths} Baths
          </span>
          {/* <span class="mx-2 py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-primary/20 text-primary rounded-md ">
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
            {listing.isFurnished ? "Furnished" : "Not Furnished"}
          </span> */}
          {/* <span class="mx-2 py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-primary/20 text-primary rounded-md ">
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
            {listing.isParkingSlot ? "Parking Slot" : "No Parking"}
          </span> */}
          <span class="mx-2 py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-primary/20 text-primary rounded-md ">
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
            {listing.isSell ? "For Sale" : "Not For Sale"}
          </span>
          <span class="mx-2 py-1 px-2 inline-flex items-center gap-x-1 text-xs font-medium bg-primary/20 text-primary rounded-md ">
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
            {listing.isRent ? "For Rent" : "Not For Rent"}
          </span>
        </div>
      </div>

      <div className="mt-2 flex border-t border-gray-200 divide-x divide-gray-200">
        <Link
          to={`/listings/${listing._id}`}
          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
        >
          <span className="">View More</span>
        </Link>
        <Link
          to="#"
          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-primary text-white shadow-sm  disabled:pointer-events-none"
        >
          <span className="">Contact Now</span>
        </Link>
      </div>
    </div>
  );
}
