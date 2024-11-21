import React, { useState } from "react";
import StudentsTable from "./../components/studentsTable.jsx";
import InstructorsTable from "./../components/instructorsTable";
import CoursesTable from "./../components/coursesTable";
import CreateInstructor from "./../components/createInstructorForm.jsx";
import "../styles/AdminPanel.css";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <div className="container">
      <h1 className="header">Admin Panel</h1>
      <div className="navbar">
        <button className="button" onClick={() => setActiveTab("students")}>
          Students
        </button>
        <button className="button" onClick={() => setActiveTab("instructors")}>
          Instructors
        </button>
        <button className="button" onClick={() => setActiveTab("courses")}>
          Courses
        </button>
        <button className="button" onClick={() => setActiveTab("createInstructor")}>
          Create Instructor
        </button>
      </div>
      <div className="content">
        {activeTab === "students" && <StudentsTable />}
        {activeTab === "instructors" && <InstructorsTable />}
        {activeTab === "courses" && <CoursesTable />}
        {activeTab === "createInstructor" && <CreateInstructor />}
      </div>
    </div>
  );
};

export default AdminPanel;
