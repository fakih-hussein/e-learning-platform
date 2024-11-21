import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import AdminPanel from "./pages/adminPanel";
import InstructorForum from "./pages/instructorForum";
// import StudentProfile from "./pages/studentprofile";

import ProtectedRoute from "./components/protectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedUserType={1}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor"
          element={
            <ProtectedRoute allowedUserType={2}>
              <InstructorForum />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/student"
          element={
            <ProtectedRoute allowedUserType={3}>
              <StudentProfile />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
