import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddUser.css"; 

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "worker", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ 
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role
  }));
    const url = new URL('http://localhost:8080/user/create');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({ 
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      })
    })
    if (response.ok) {
      console.log('User added: ', formData.name);
      navigate("/app");
    } else {
      const errorData = await response.json();
      console.log(errorData);
      console.error(errorData.message + errorData.status);
  }
  };

  return (
    <div className="add-user-container">
      <form onSubmit={handleSubmit}>
      <label>
          Name:
          <input
            type="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          User Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="WORKER">Worker</option>
            <option value="MANAGER">Manager</option>
          </select>
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

export default AddUser;
