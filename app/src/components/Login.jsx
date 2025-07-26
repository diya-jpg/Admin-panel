import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3001/login', { email, password });
      console.log("Login response:", res.data); // Debug

      alert(res.data.message);

      if (res.data.token && res.data.user) {
        // ✅ Store token and user (including role) in localStorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user)); // Store full user object
      }

      if (res.data.message === "Login successful") {
        navigate('/Dashboard'); // Redirect to dashboard
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      alert(errorMessage);
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        <h5>Don't have an account? <Link to="/register">Register</Link></h5>
      </form>
    </div>
  );
};

export default Login;
