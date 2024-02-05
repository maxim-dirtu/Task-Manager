import React, { useState } from "react";
import "./TaskItem.css";

const TaskItem = ({
  taskId,
  title,
  description,
  status,
  workerId,
  workers,
}) => {
  const [userEmail, setUserEmail] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserEmail(value);
  };
  // fetch la toti userii
  //const userEmail = user.email, unde user.id=workerId
  // let workerEmail = "test";
  // console.log("WORKERS ARRAY:");
  // function setWorkerEmail() {
  //   const workersArray = workers.workers || [];
  //   workerEmail = workersArray.find((worker) => worker.id === workerId);
  //   console.log("set workers email functions");
  //   console.log(workerEmail);
  //   return workerEmail;
  // }
  //   const email = setWorkerEmail();

  // console.log(workersArray);
  // if(workerId){
  // workerEmail = (workersArray.find((worker) => worker.id === workerId));
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //gaseste workerId al userului
      const workersArray = workers.workers || [];

      const userWorkerId = workersArray.find(
        (worker) => worker.email === userEmail
      ).id;

      //asigneaza task-ul unui user
      try {
        const response = await fetch(
          `http://localhost:8080/task/${taskId}/set-task`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              workerId: userWorkerId,
            }),
          }
        );

        if (response.ok) {
          console.log("Task assigned successfully");
          window.location.reload();
        } else {
          console.error("Error assigning task:", response.statusText);
          alert("Error assigning task");
        }
      } catch (error) {
        console.error("Error assigning task:", error);
        alert("Error assigning task");
      }
      //schimba statusul task-ului din open in pending
    } catch (error) {
      console.error("Error adding user:", error);
      alert(error);
    }
  };

  const moveToCompleted = async (e) => {
    e.preventDefault();
    try {
      //schimba statusul task-ului din pending in completed
      const response = await fetch(
        `http://localhost:8080/task/solve/${taskId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Task moved to completed successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert(error);
    }
  };

  const moveToClosed = async (e) => {
    e.preventDefault();
    try {
      //schimba statusul task-ului din completed in closed
      const response = await fetch(
        `http://localhost:8080/task/close/${taskId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Task moved to closed successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert(error);
    }
  };

  return (
    <div className="task-item">
      {/*Aici o sa se primeasca props de la componentul parinte si o sa se afiseze taskItem-ul cu ajutorul lor */}
      <h2>Title: {title}</h2>
      <h3>Description: {description}</h3>
      {status === "OPEN" &&(
        localStorage.getItem("role") === "MANAGER" ||
        localStorage.getItem("role") === "ADMIN") && (
        <div className="assign-task-to-user">
          <label>
            Assign to user:
            <input
              type="email"
              name="email"
              value={userEmail}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSubmit}>OK</button>
        </div>
      )}
      {status === "PENDING" && (
        <div>
          <p>Assigned to: *email*</p>
        </div>
      )}
      {status === "PENDING" && (
        <div className="markCompleted">
          <button onClick={moveToCompleted}>Mark as completed</button>
        </div>
      )}
      {status === "COMPLETED" &&(
        localStorage.getItem("role") === "MANAGER" ||
        localStorage.getItem("role") === "ADMIN") && (
        <div className="markClosed">
          <button onClick={moveToClosed}>Mark as closed</button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
