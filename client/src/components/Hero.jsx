import React from "react";

const Hero = () => {
  return (
    <div class="w-full pt-20 px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
        <div class="lg:col-span-3">
          <h1 class="mb-10 block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl lg:text-6xl">
            Designed for you to get more
            <span class="text-primary"> simple</span>
          </h1>

          <p class="mt-3 text-lg text-gray-800 ">
            Introducing a new way for your brand to reach the creative
            community. Introducing a new way for your brand to reach the
            creative community.
          </p>

          <div class="mt-5 lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
            <a
              class="w-full sm:w-auto py-4 px-8 inline-flex justify-center items-center gap-x-2 text-md font-normal rounded-lg border border-transparent bg-primary text-white hover:primary"
              href="#"
            >
              Search Properties
            </a>
          </div>
        </div>

        <div class="lg:col-span-4 mt-10 lg:mt-0">
          <img
            class="w-full rounded-xl h-[600px]"
            src="https://source.unsplash.com/random/?property"
            alt="Image Description"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
