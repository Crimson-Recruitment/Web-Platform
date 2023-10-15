import React from "react";
import NavigationBar from "./components/Navigationbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Cookies from "universal-cookie";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Authentication/Login";
import CompanyLogin from "./pages/Authentication/CompanyLogin";
import Register from "./pages/Authentication/Register";
import CompanyRegister from "./pages/Authentication/CompanyRegister";
import CompanyJobs from "./pages/Platform/Companies/CompanyJobs";
import CompanyProfile from "./pages/Platform/Companies/CompanyProfile";
import CompanyApplications from "./pages/Platform/Companies/CompanyApplications";
import CompanySettings from "./pages/Platform/Companies/CompanySettings";
import Jobs from "./pages/Platform/Users/Jobs";
import ForYou from "./pages/Platform/Users/ForYou";
import Profile from "./pages/Platform/Users/Profile";
import Settings from "./pages/Platform/Users/Settings";
import Applications from "./pages/Platform/Users/Applications";
import UserView from "./pages/Platform/Users/UserView";
import CompanyView from "./pages/Platform/Companies/CompanyView";
import JobView from "./pages/Platform/Users/JobView";
import UserPricing from "./pages/Platform/Users/UserPricing";
import CompanyPricing from "./pages/Platform/Companies/CompanyPricing";
import Pricing from "./pages/Pricing";

function App() {
  const cookie = new Cookies();
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/company-login" element={<CompanyLogin />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/company-register" element={<CompanyRegister />} />
        <Route path="/user-view/:id" element={<UserView />} />
        <Route path="/company-view/:id" element={<CompanyView />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/jobs/:id" element={<JobView />} />
        {cookie.get("user-login") ? (
          <>
            <Route path="/user-pricing" element={<UserPricing />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/for-you" element={<ForYou />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/applications" element={<Applications />} />
          </>
        ) : null}
        {cookie.get("company-login") ? (
          <>
            <Route path="/company-jobs" element={<CompanyJobs />} />
            <Route path="/company-profile" element={<CompanyProfile />} />
            <Route path="/company-pricing" element={<CompanyPricing />} />
            <Route
              path="/company-applications"
              element={<CompanyApplications />}
            />
            <Route
              path="/company-settings"
              element={<CompanySettings />}
            />
          </>
        ) : null}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
