import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/CoursesTable.css";

const CoursesTable = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/elearning-platform/server/getCoursesApi.php")
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  return (
    <div>
      <h2>Courses</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Title</th>
            <th>Instructor ID</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.course_title}</td>
              <td>{course.instructor_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesTable;
