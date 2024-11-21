import React, { useState } from "react";
import "../styles/Forms.css";

const CreateInstructorForm = ({ onFeedback }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost/elearning-platform/server/addInstructorApi.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        onFeedback(`Instructor '${username}' created successfully.`);
        setName("");
        setPassword("");
      } else {
        onFeedback(`Failed to create instructor: ${data.message}`);
      }
    } catch (error) {
      onFeedback("Error creating instructor. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Instructor</h2>
      <label htmlFor="name">UserName</label>
      <input
        type="text"
        id="name"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter instructor's name"
        required
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter a password"
        required
      />

      <button type="submit">Create</button>
    </form>
  );
};

export default CreateInstructorForm;
