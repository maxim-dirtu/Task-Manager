import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddTask.css";


const AddTask = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    managerId: 1, // Set default managerId, you can change it based on your authentication or user management logic
    workerId: null,
    status: "OPEN",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Send the formData to the backend
  //       const response = await axios.post("/api/tasks", formData);

  //     // Handle the response as needed
  //     console.log("Task added successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error adding task:", error);
  //     alert(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ 
      title: formData.title,
      description: formData.description,
      managerId: formData.managerId
  }));
    const url = new URL('http://localhost:8080/task');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({ 
        title: formData.title,
        description: formData.description,
        managerId: formData.managerId
      })
    })
    if (response.ok) {
      console.log('Task added: ', formData.title);
      navigate("/app");
    } else {
      const errorData = await response.json();
      console.log(errorData);
      console.error(errorData.message + errorData.status);
  }
};

  return (
    <div className="add-task-container">
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <input type="submit" value="Submit" />
      </form>
      <div className="go-back-container">
        <Link to="/app">
          <button>Go back</button>
        </Link>
      </div>
    </div>
  );
};

export default AddTask;