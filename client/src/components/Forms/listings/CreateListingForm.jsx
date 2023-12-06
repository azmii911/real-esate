import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateListingForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Parse values as numbers and check if discounted price is less than or equal to regular price
      const regularPrice = parseFloat(data.regularPrice);
      const discountedPrice = parseFloat(data.discountedPrice);

      if (
        isNaN(regularPrice) ||
        isNaN(discountedPrice) ||
        discountedPrice >= regularPrice
      ) {
        throw new Error("Discounted price must be greater than regular price");
      } else {
        const result = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/listing/create`,
          {
            method: "Post",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...data , userId : currentUser._id}),
          }
        );
        const response = await result.json();

        if (!result.ok) {
          const errorResponse = response;
          toast.error(errorResponse.message);
        } else {
          toast.success("Successfully!");
          reset();
          // dispatch(SignIn(response));
          // navigate("/dashboard/account");
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col md:flex-row justify-between gap-10 items-start">
        <div className="grid gap-4 lg:gap-6 flex-1">
          <div>
            <label
              htmlFor="hs-title-hire-us-2"
              className="block mb-2 text-sm text-gray-700 font-medium "
            >
              Title
            </label>
            <input
              type="text"
              defaultValue={currentUser?.title}
              name="hs-title-hire-us-2"
              id="hs-title-hire-us-2"
              className="py-3 px-4 block w-full border-[1px] border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none"
              {...register("title", {
                required: "Title is required",
                minLength: 2,
                maxLength: 100,
              })}
            />
            {errors.title?.type == "minLength" && (
              <p className="text-xs text-red-600 mt-2" role="alert">
                At least 2 Characters
              </p>
            )}
            {errors.title?.type == "maxLength" && (
              <p className="text-xs text-red-600 mt-2" role="alert">
                Max 30 Characters
              </p>
            )}
            <p className="text-xs text-red-600 mt-2" role="alert">
              {errors.title?.message}
            </p>
          </div>

          <div>
            <label
              htmlFor="hs-about-hire-us-2"
              className="block mb-2 text-sm text-gray-700 font-medium "
            >
              Description
            </label>
            <textarea
              id="hs-description-hire-us-2"
              name="hs-description-hire-us-2"
              rows="4"
              defaultValue={currentUser?.description}
              className="py-3 px-4 block w-full border-[1px] border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
              {...register("description", {
                required: "Description is Required",
                minLength: 100,
                maxLength: 3000,
              })}
            ></textarea>
            <p className="text-xs text-red-600 mt-2" role="alert">
              {errors.description?.message}
            </p>
            {errors.description?.type == "minLength" && (
              <p className="text-xs text-red-600 mt-2" role="alert">
                At least 100 Characters
              </p>
            )}
            {errors.description?.type == "maxLength" && (
              <p className="text-xs text-red-600 mt-2" role="alert">
                Max 1000 Characters
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="hs-title-hire-us-2"
              className="block mb-2 text-sm text-gray-700 font-medium "
            >
              Address
            </label>
            <input
              type="text"
              defaultValue={currentUser?.address}
              name="hs-address-hire-us-2"
              id="hs-address-hire-us-2"
              className="py-3 px-4 block w-full border-[1px] border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none"
              {...register("address", {
                required: "address is required",
                minLength: 10,
                maxLength: 150,
              })}
            />
            {errors.address?.type == "minLength" && (
              <p className="text-xs text-red-600 mt-2" role="alert">
                At least 10 Characters
              </p>
            )}
            {errors.address?.type == "maxLength" && (
              <p className="text-xs text-red-600 mt-2" role="alert">
                Max 150 Characters
              </p>
            )}
            <p className="text-xs text-red-600 mt-2" role="alert">
              {errors.address?.message}
            </p>
          </div>

          <div className="flex justify-start items-center gap-10">
            <div className="flex">
              <input
                type="checkbox"
                className=" border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                id="hs-sell-checkbox"
                {...register("isSell", { value: true })}
              />
              <label
                htmlFor="hs-sell-checkbox"
                className="text-sm text-gray-500 ms-3"
              >
                Sell
              </label>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                className=" border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                id="hs-rent-checkbox"
                {...register("isRent", { value: true })}
              />
              <label
                htmlFor="hs-rent-checkbox"
                className="text-sm text-gray-500 ms-3"
              >
                Rent
              </label>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                className=" border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                id="hs-parking-checkbox"
                {...register("isParkingSlot", { value: true })}
              />
              <label
                htmlFor="hs-parking-checkbox"
                className="text-sm text-gray-500 ms-3"
              >
                Parking Spot
              </label>
            </div>
            <div className="flex">
              <input
                type="checkbox"
                className=" border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                id="hs-furnished-checkbox"
                {...register("isFurnished", { value: true })}
              />
              <label
                htmlFor="hs-furnished-checkbox"
                className="text-sm text-gray-500 ms-3"
              >
                Funrished
              </label>
            </div>
            {/* <div className="flex">
              <input
                type="checkbox"
                className=" border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none "
                id="hs-offer-checkbox"
                {...register("isoffer")}
              />
              <label
                htmlFor="hs-offer-checkbox"
                className="text-sm text-gray-500 ms-3"
              >
                Offer
              </label>
            </div> */}
          </div>

          <div className="flex justify-start items-center gap-10">
            <div>
              <label
                htmlFor="hs-title-hire-us-2"
                className="block mb-2 text-sm text-gray-700 font-medium "
              >
                Beds
              </label>
              <input
                type="text"
                defaultValue={currentUser?.beds}
                name="hs-beds-hire-us-2"
                id="hs-beds-hire-us-2"
                className="py-3 px-4 block w-14 border-[1px] border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none"
                {...register("beds", {
                  required: "beds is required",
                })}
              />

              <p className="text-xs text-red-600 mt-2" role="alert">
                {errors.beds?.message}
              </p>
            </div>
            <div>
              <label
                htmlFor="hs-title-hire-us-2"
                className="block mb-2 text-sm text-gray-700 font-medium "
              >
                Baths
              </label>
              <input
                type="text"
                defaultValue={currentUser?.baths}
                name="hs-baths-hire-us-2"
                id="hs-baths-hire-us-2"
                className="py-3 px-4 block w-14 border-[1px] border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none"
                {...register("baths", {
                  required: "baths is required",
                })}
              />

              <p className="text-xs text-red-600 mt-2" role="alert">
                {errors.baths?.message}
              </p>
            </div>
            <div>
              <label
                htmlFor="hs-title-hire-us-2"
                className="block mb-2 text-sm text-gray-700 font-medium "
              >
                Regular Price ($/month)
              </label>
              <input
                type="text"
                defaultValue={currentUser?.regularPrice}
                name="hs-regularPrice-hire-us-2"
                id="hs-regularPrice-hire-us-2"
                className="py-3 px-4 block w-fit border-[1px] border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none"
                {...register("regularPrice", {
                  required: "Regular Price is required",
                })}
              />

              <p className="text-xs text-red-600 mt-2" role="alert">
                {errors.regularPrice?.message}
              </p>
            </div>
            <div>
              <label
                htmlFor="hs-title-hire-us-2"
                className="block mb-2 text-sm text-gray-700 font-medium "
              >
                Dsicounted Price ($/month)
              </label>
              <input
                type="text"
                defaultValue={currentUser?.discountedPrice}
                name="hs-discountedPrice-hire-us-2"
                id="hs-discountedPrice-hire-us-2"
                className="py-3 px-4 block w-fit border-[1px] border-gray-200 rounded-lg text-sm focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none"
                {...register("discountedPrice", {
                  required: false,
                })}
              />

              <p className="text-xs text-red-600 mt-2" role="alert">
                {errors.discountedPrice?.message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <label
            htmlFor="hs-title-hire-us-2"
            className="block mb-2 text-sm text-gray-700 font-medium "
          >
            Images: The first image will bne the cover (max 6)
          </label>
          <div className="sm:col-span-9 border-[1px] p-5 rounded-md">
            <div className="flex items-center gap-5">
              <div className="flex gap-x-2">
                <label className="block">
                  {/* <input
                    type="file"
                    accept=".jpg, .png"
                    className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibol file:bg-primary file:text-white hover:file:bg-primary file:disabled:opacity-50 file:disabled:pointer-events-none dark:file:bg-primary dark:hover:file:bg-primary"
                  /> */}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 grid">
        <button
          type="submit"
          className={`w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-normal rounded-lg border border-transparent bg-primary text-white hover:bg-primary disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ${
            isLoading ? "bg-primary/50  cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Publishing ..." : "Publish Lisitng"}
        </button>
      </div>
    </form>
  );
}

export default CreateListingForm;
