import React, { createContext,useState } from "react";
import NavigationBar from "./components/Navigationbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import User from "./routes/User";
import Cookies from "universal-cookie";
import Company from "./routes/Company";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Authentication/Login";
import CompanyLogin from "./pages/Authentication/CompanyLogin";
import Register from "./pages/Authentication/Register";
import CompanyRegister from "./pages/Authentication/CompanyRegister";

export const DataContext = createContext(null);

function App() {
  const cookie = new Cookies();
  const [user, setUser] = useState({});
  const updateUser = (value) => {
    setUser(value);
  };
  return (
    <Router>
      <DataContext.Provider value={{ user, updateUser }}>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/company-login" element={<CompanyLogin />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/company-register" element={<CompanyRegister />} />
        </Routes>
        {cookie.get("user-login") ? <User /> : null}
        {cookie.get("company-login") ? <Company /> : null}
        <Footer />
      </DataContext.Provider>
    </Router>
  );
}

export default App;
