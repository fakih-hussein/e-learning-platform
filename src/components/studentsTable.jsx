import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/StudentsTable.css";

const StudentsTable = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/elearning-platform/server/getStudentsApi.php")
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);
// const getStudents = async () => {
//     try {
//       const result = await axios.get(
//         "http://localhost/elearning-platform/server/getStudentsApi.php",
//         {
//           headers: {
//             Authorization: localStorage.token,
//           },
//         }
//       );

//       console.log(result.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getStudents();

//     console.log("Here");
//   }, []);

  return (
    <div>
      <h2>Students</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.username}</td>
              <td>{student.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;