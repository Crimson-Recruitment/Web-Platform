import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Cookies from "universal-cookie";
import Footer from "./components/Footer";
import NavigationBar from "./components/Navigationbar";
import AboutUs from "./pages/AboutUs";
import CompanyLogin from "./pages/Authentication/CompanyLogin";
import CompanyRegister from "./pages/Authentication/CompanyRegister";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import ContactUs from "./pages/ContactUs";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import CompanyHome from "./pages/Platform/Companies/CompanyHome";
import CompanyView from "./pages/Platform/Companies/CompanyView";
import JobView from "./pages/Platform/Users/JobView";
import UserHome from "./pages/Platform/Users/UserHome";
import UserView from "./pages/Platform/Users/UserView";
import Pricing from "./pages/Pricing";
import ShowJobs from "./pages/ShowJobs";

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
        <Route path="/view-jobs" element={<ShowJobs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/company-register" element={<CompanyRegister />} />
        <Route path="/user-view/:id" element={<UserView />} />
        <Route path="/company-view/:id" element={<CompanyView />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/jobs/:id" element={<JobView />} />
        {!cookie.get("user-login") ? (
          <>
            <Route path="/user-home" element={<UserHome />} />
          </>
        ) : null}
        {!cookie.get("company-login") ? (
          <>
            <Route path="/company-home" element={<CompanyHome />} />
          </>
        ) : null}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
