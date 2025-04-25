import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is user
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register form

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
        role
      });
      alert('Registration successful!');
      setUsername('');
      setPassword('');
      setRole('user');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password
      });
      localStorage.setItem("token", response.data.token);
      window.location.href = '/admin'; // Redirect to admin dashboard after login
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h1>{isLogin ? "Login" : "Register"}</h1>

      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      
      {/* Only show this input for registration form */}
      {!isLogin && (
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      )}

      <button onClick={isLogin ? handleLogin : handleRegister}>
        {isLogin ? "Login" : "Register"}
      </button>

      <p style={{ color: 'red' }}>{errorMessage}</p>
      
      {/* Toggle between login and register form */}
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default Home;