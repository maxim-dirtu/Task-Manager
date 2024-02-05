import React, { useEffect, useState } from "react";
import TaskItem from "../TaskItem";
import { Link } from "react-router-dom";

import "./TaskHistory.css";

const TaskHistory = () => {
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const url = new URL(`http://localhost:8080/task`);
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
        }
      });

      if (response.ok) {
        let data = await response.json();
        const tasksArray = data.tasks || [];
        console.log(tasksArray);
        const closedTasks = tasksArray.filter((task) => task.status === "CLOSED");
        setFilteredTasks(closedTasks);  
      } else {
        const errorData = await response.json();
        console.log(errorData);
        console.error(errorData.message + errorData.status);
      }
    };

    fetchTasks();
  }, []);  


  return (
    <div className="task-history-component">
      <div className="task-history-container">
        {/* <h2> {userName.toUpperCase()} </h2> */}
        {/* Map over the filtered tasks and create a Task component for each one */}
        {/* {filteredTasks.map((task) => (
          <div>
            <TaskItem key={task.id} task={task} />
            <p>Status task: {task.status} </p>
          </div>
        ))} */}
        {filteredTasks.map((task) => (
        <TaskItem
          taskId={task.id}
          title={task.title}
          description={task.description}
          status = {task.status}
          workerId = {task.workerId}
        />
      ))}
      </div>
      <div className="go-back-container">
        <Link to="/app">
          <button>Go back</button>
        </Link>
      </div>
    </div>
  );
};



export default TaskHistory;
