import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = new URL("http://localhost:8080/user/login");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      console.log("Received token:", token);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("id", data.id);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
      // You can now store the token for later use in your application
      // For example, in localStorage, sessionStorage, or in memory
      navigate("/app");
    } else {
      const errorData = await response.json();
      console.error("Login failed:", errorData.message);
    }
  };
  //   };
  return (
    <div>
      <p>Welcome Back</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <br />
        <input
          type="password"
          name="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
export default Login;
