import React, { useState } from 'react';
import axios from "axios";
import "../css/Signup.css";
import { Link, useNavigate } from 'react-router-dom';
import  {useAuth}  from './AuthProvider.js';


const Signin = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { user, login, setUser, logout, email, setEmailForm, username, setUsername, authLoading, setUserId } = useAuth()
  const navigate = useNavigate()
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Clear all previous errors
  setEmailError('');
  setPasswordError('');
  setFormError('');

  // Check for empty fields
  if (
    form.email.trim() === '' ||
    form.password.trim() === '' 
  ) {
    setFormError("Please fill in all fields.");
    return;
  }

  // Confirm password match check


  try {
    const response = await axios.post("http://192.168.2.48:5000/signin", form);
    

    if (response && response.status === 200) {
      const { email, username, userId } = response.data;
      login(email, username, userId)
     localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);



     setUsername(email)
     setUserId(userId)
     setEmailForm(username)
             navigate('/'); // Redirect to login if not


      setForm({ username: "", email: "" });
    }
  } catch (err) {
    if (err.response) {
      const { status, data } = err.response;
      if (status === 400 || status === 401) {
        if (data.message.includes('Email')) {
          setEmailError(data.message);
        } else if (data.message.includes('Password')) {
          setPasswordError(data.message);
        }
      }
    }
  }
};


  return (
    <div className="signup-container">
      <h1 className="signup-title">Log In</h1>
      {formError && <p className="error-message">{formError}</p>}


      <form onSubmit={handleSubmit} className="signup-form">
      

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="form-input"
          onChange={handleChange}
          value={form.email}
        />
        {emailError && <p className="error-message">{emailError}</p>}

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="form-input"
          onChange={handleChange}
          value={form.password}
        />

             {passwordError && <p className="error-message">{passwordError}</p>}

<p>
  Don't have an account?{" "}
  <Link to="/signup" className="login-link">Signup</Link>
</p>

        <button type="submit" className="submit-button">
          Login
        </button>
      </form>

     
    </div>
  );
};

export default Signin;
