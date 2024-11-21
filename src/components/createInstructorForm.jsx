import React, { useState } from "react";
import "../styles/Forms.css";

const CreateInstructor = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // Prevent submitting if already submitting

    setLoading(true); // Set loading to true when submission starts

    try {
      const response = await fetch("http://localhost/elearning-platform/server/addInstructorApi.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setMessage("Instructor created successfully!");
        setUsername("");
        setPassword("");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage("Error: Unable to create instructor.");
    } finally {
      setLoading(false); // Set loading to false when the request finishes
    }
  };

  return (
    <div className="create-instructor-container">
      <h2>Create Instructor</h2>
      <form className="create-instructor-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Creating..." : "Create Instructor"} {/* Show loading state */}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreateInstructor;
