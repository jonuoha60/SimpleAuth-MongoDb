import React from 'react';
import "./css/App.css";
import { useAuth } from './auth/AuthProvider.js';

export default function Home() {
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");
  const { logout } = useAuth(); // <-- call the hook!

  return (
    <div className="container">
      <h1>Welcome, {username || "Guest"}!</h1>
      <div className="user-info">
        <p><strong>User ID:</strong> {userId || "Not available"}</p>
        <p><strong>Email:</strong> {email || "Not available"}</p>
        <p><strong>Username:</strong> {username || "Not available"}</p>
      </div>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
