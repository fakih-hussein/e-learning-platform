import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/InstructorsTable.css";

const InstructorsTable = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/elearning-platform/server/getInstructorsApi.php")
      .then((response) => setInstructors(response.data))
      .catch((error) => console.error("Error fetching instructors:", error));
  }, []);

  return (
    <div>
      <h2>Instructors</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((instructor) => (
            <tr key={instructor.id}>
              <td>{instructor.id}</td>
              <td>{instructor.username}</td>
              <td>{instructor.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InstructorsTable;
