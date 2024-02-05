import React from "react";
import TaskItem from "./TaskItem";
import "./TaskContainer.css";

const TaskContainer = ({ tasks, status, workers }) => {
 
  const tasksArray = tasks.tasks || [];

  // Filter tasks based on the specified status
  const filteredTasks = tasksArray.filter((task) => task.status === status);
console.log("Workers prop in TaskContainer:", workers);

  console.log(filteredTasks);
  return (
    <div className="task-container">
      <h2> {status.toUpperCase()} </h2>
      {/* Map over the filtered tasks and create a Task component for each one */}
      {filteredTasks.map((task) => (
        <TaskItem
          taskId={task.id}
          title={task.title}
          description={task.description}
          status = {task.status}
          workerId = {task.workerId}
          workers= {workers}
        />
      ))}
    </div>
  );
};

export default TaskContainer;
