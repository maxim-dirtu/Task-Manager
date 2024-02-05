import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <div className="navbar">
      {(localStorage.getItem("role") === "MANAGER" ||
        localStorage.getItem("role") === "ADMIN") && (
        <Link to="/app/addUser">
          <button> Add project collaborator </button>
        </Link>
      )}
      {(localStorage.getItem("role") === "MANAGER" ||
        localStorage.getItem("role") === "ADMIN") && (
        <Link to="/app/addTask">
          <button> Add Task </button>
        </Link>
      )}
      <Link to="/app/taskHistory">
        <button> Task History</button>
      </Link>
    </div>
  );
};

export default NavigationBar;
