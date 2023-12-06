import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import NoPage from "./pages/NoPage.js";
import Dashboard from "./pages/userDashboard/Dashboard.js";
import { ToastContainer } from "react-toastify";
import Account from "./pages/userDashboard/Account.js";
import Creartelistings from "./pages/userDashboard/Creartelistings.js";
import Listings from "./pages/userDashboard/Listings.js";
import ViewListing from "./pages/userDashboard/ViewListing.js";
import EditListing from "./pages/userDashboard/EditListing.js";
import ViewListings from "./pages/ViewListings.js";
import SingleListing from "./pages/SingleListing.js";
function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route index element={<Home />} /> */}
        <Route exact path="login" element={<Login />} />
        <Route exact path="signup" element={<Signup />} />
        <Route exact path="listings" element={<ViewListings />} />
        <Route exact path="listings/:id" element={<SingleListing />} />
        <Route exact path="*" element={<NoPage />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/dashboard/listings" element={<Listings />} />
        <Route
          exact
          path="/dashboard/listings/add"
          element={<Creartelistings />}
        />
        <Route
          exact
          path="/dashboard/listings/:listingId"
          element={<ViewListing />}
        />
        <Route
          exact
          path="/dashboard/listings/edit/:listingId"
          element={<EditListing />}
        />
        <Route exact path="/dashboard/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
