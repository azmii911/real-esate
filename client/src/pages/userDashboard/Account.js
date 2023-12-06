import UserAccountForm from "../../components/Forms/user/UserAccountForm";
import UserDashboard from "../../layout/UserDashboard";

function Account() {
  return (
    <UserDashboard>
      <div className="max-w-3xl mx-auto bg-white px-5 py-10 rounded-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl ">
            Update Your Account
          </h1>
          <p className="mt-1 text-gray-600 ">You can alter your details here</p>
        </div>

        <div className="mt-12">
          <UserAccountForm />
        </div>
      </div>
    </UserDashboard>
  );
}

export default Account;
