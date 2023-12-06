import React, { useEffect, useState } from 'react'
import MainLayout from '../layout/MainLayout'
import Hero from '../components/Hero';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListingCard from "../components/ListingCard";

function Home() {
    const [listings, setListings] = useState([]);
    const getAllListings = async () => {
      try {
        const result = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/listing/all`
        );
        const response = await result.json();
        setListings(response);
        console.log(response);
      } catch (error) {
        toast.error("An unexpected error occurred", error.message);
      }
    };

    useEffect(() => {
      getAllListings();
      console.log("listings", listings);
    }, []);
  return (
    <MainLayout>
      <Hero />
      <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="pt-2 py-10">
          <h1 className="block text-3xl md:text-5xl text-center font-bold text-primary">
            View All Properties
          </h1>
          <hr className="mt-10" />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {listings?.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default Home