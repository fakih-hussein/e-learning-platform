import React, { useState } from "react";
import "./../styles/InstructorForum.css";

const InstructorForum = () => {
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost/elearning-platform/server/assignmentApi.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          assignmentTitle,
          dueDate,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setAssignmentTitle("");
        setDueDate("");
      } else {
        setMessage(data.message || "Error posting assignment");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="instructor-forum">
      <h1>Post an Assignment</h1>
      <form onSubmit={handleSubmit} className="assignment-form">
        <label>
          Assignment Title:
          <input
            type="text"
            value={assignmentTitle}
            onChange={(e) => setAssignmentTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Due Date:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Post Assignment</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default InstructorForum;
