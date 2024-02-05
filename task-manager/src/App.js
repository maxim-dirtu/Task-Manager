import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";

import TaskContainer from "./components/TaskContainer";
import Header from "./components/UI/Header";
import NavigationBar from "./components/UI/NavigationBar";
import AddTask from "./components/NavBarButtons/AddTask";
import AddUser from "./components/NavBarButtons/AddUser";
import TaskHistory from "./components/NavBarButtons/TaskHistory";
import Login from "./components/Login/Login";
import { useEffect, useState } from "react"; // Import useEffect and useState

function App() {
  const [tasks, setTasks] = useState([]);
  const [workers, setworkers] = useState([]);
  // Function to fetch tasks from the backend
  const fetchTasks = async () => {
    const url = new URL("http://localhost:8080/task");
    const token = sessionStorage.getItem("token");
    console.log(token);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setTasks(data);
      console.log("Tasks: ",data);
    } else {
      const errorData = await response.json();
      console.error("Login failed:", errorData.message);
    }
  };

  //function to fetch workers from the backend
  const fetchworkers = async () => {
    const url = new URL("http://localhost:8080/user/workers");
    const token = sessionStorage.getItem("token");
    console.log(token);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    if (response.ok) {
      const workers = await response.json();
      setworkers(workers);
      console.log("workers: ", workers);
    } else {
      const errorData = await response.json();
      console.error("Login failed:", errorData.message);
    }
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks when the component mounts
    fetchworkers();
  }, []);

  const Layout = () => (
    <>
      <Header />
      <NavigationBar />
      <Outlet />
    </>
  );

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/app"
            element={
              sessionStorage.getItem("token") ? <Layout /> : <Navigate to="/" />
            }
          >
            <Route
              index
              element={
                <>
                  <div className="containers">
                    <TaskContainer tasks={tasks} workers={workers} status="OPEN" />
                    <TaskContainer tasks={tasks} status="PENDING" />
                    <TaskContainer tasks={tasks} status="COMPLETED" />
                  </div>
                </>
              }
            />
            <Route
              exact
              path="addTask"
              element={
                <>
                  <div className="addTaskComponent">
                    <AddTask />
                  </div>
                </>
              }
            />

            <Route
              exact
              path="addUser"
              element={
                <>
                  <div className="addUserComponent">
                    <AddUser />
                  </div>
                </>
              }
            />
            <Route
              exact
              path="taskHistory"
              element={
                <>
                  <div className="containers">
                    <TaskHistory tasks={tasks} userId="1" />
                  </div>
                </>
              }
            />
          </Route>
        </Routes>
      </Router>
    </div>

  );
}

export default App;

/* Future references:
Un task trebuie sa fie un obiect cu atributele: 
id int, 
title string,
description string, 
deadline date, 
assignedTo string, 
status string
 
La accesare, userul o sa fie nevoit sa se logheze, iar in urma logarii aplicatia va primi 
un token/response de la backend cu tipul utilizatorului (admin, manager, user)

In functie de tipul de utilizator unele butoane/features vor fi ascunse/limitate
pentru fiecare categorie de utilizatori in parte 
(admin - full functionality, user - doar accesare istoric si mark task as completed).


 */
