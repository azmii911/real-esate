import React from 'react'
import UserDashboard from '../../layout/UserDashboard';
import CreateListingForm from '../../components/Forms/listings/CreateListingForm';

function Creartelistings() {
  return (
    <UserDashboard>
      <div className="max-w-6xl mx-auto bg-white px-5 py-10 rounded-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl ">
            Create A New Listing
          </h1>
        </div>

        <div className="mt-12">
          {/* <UserAccountForm /> */}
          <CreateListingForm />
        </div>
      </div>
    </UserDashboard>
  );
}

export default Creartelistings