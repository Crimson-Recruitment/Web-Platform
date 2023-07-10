import React from "react";
import { Route, Routes } from "react-router-dom";
import Skills from "../pages/Platform/Users/Skills";
import Jobs from "../pages/Platform/Users/Jobs";
import ForYou from "../pages/Platform/Users/ForYou";
import Profile from "../pages/Platform/Users/Profile";
import { Settings } from "@mui/icons-material";
import Applications from "../pages/Platform/Users/Applications";

function User() {
  return (
    <Routes>
      <Route path="/skills" element={<Skills />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/for-you" element={<ForYou />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/applications" element={<Applications />} />
    </Routes>
  );
}

export default User;
