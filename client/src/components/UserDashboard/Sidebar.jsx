import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "../../redux/user/userSlice";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {currentUser} = useSelector((state)=> state.user)

  const isActiveTab = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      const result = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/auth/signout`,
        {
          credentials: "include",
        }
      );
      const response = await result.json();

      if (!result.ok) {
        const errorResponse = await result.json();
        toast.error(errorResponse.message);
      } else {
        toast.success("You are logged out!");
        dispatch(LogOut());
        navigate("/login");
      }
    } catch (error) {
      toast.error("An unexpected error occurred", error.message);
    }
  };
  return (
    <div
      id="application-sidebar-brand"
      className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-[7.7rem] left-0 bottom-0 z-[60] w-64 bg-white pt-7 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 "
    >
      <div className="px-6">
        <span className="flex-none text-xl font-semibold text-black">
          Howdy, {currentUser?.firstName}
        </span>
      </div>

      <nav
        className="hs-accordion-group p-6 w-full flex flex-col flex-wrap"
        data-hs-accordion-always-open
      >
        <ul className="space-y-1.5">
          <li>
            <Link to="/dashboard">
              <span
                className={`flex items-center gap-x-3 py-2 px-2.5 ${
                  isActiveTab("/dashboard") ? "bg-gray-100" : ""
                } text-sm rounded-md`}
              >
                <svg
                  className="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                  />
                </svg>
                Dashboard
              </span>
            </Link>
          </li>

          <li className="hs-accordion" id="account-accordion">
            <a
              className={`hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 ${
                isActiveTab("/dashboard/account") ? "bg-gray-100" : ""
              } text-sm text-blackhover:text-black rounded-md hover:bg-gray-100`}
            >
              <svg
                className="w-3.5 h-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
              Account
              <svg
                className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-black group-hover:text-black"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
              </svg>
              <svg
                className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-black group-hover:text-black"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></path>
              </svg>
            </a>

            <div
              id="account-accordion-child"
              className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
            >
              <ul className="pt-2 pl-2">
                <li>
                  <Link to="/dashboard/account">
                    <span className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-blackhover:text-black rounded-md hover:bg-gray-100">
                      Manage
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className="hs-accordion" id="account-accordion">
              <span
                className={`hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 ${
                  isActiveTab("/dashboard/listing") ? "bg-gray-100" : ""
                } text-sm text-blackhover:text-black rounded-md hover:bg-gray-100`}
              >
                <svg
                  className="w-3.5 h-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                  />
                </svg>
                Listings
                <svg
                  className="hs-accordion-active:block ml-auto hidden w-3 h-3 text-black group-hover:text-black"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                </svg>
                <svg
                  className="hs-accordion-active:hidden ml-auto block w-3 h-3 text-black group-hover:text-black"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </span>

            <div
              id="account-accordion-child"
              className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden"
            >
              <ul className="pt-2 pl-2">
                <li>
                  <Link to="/dashboard/listings">
                    <span className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-blackhover:text-black rounded-md hover:bg-gray-100">
                      All Listing
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/listings/add">
                    <span className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-blackhover:text-black rounded-md hover:bg-gray-100">
                      Add a New Listing
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <span
              onClick={handleLogout}
              className="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-blackhover:text-black rounded-md hover:bg-gray-100 cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
              </svg>
              Logout?
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
