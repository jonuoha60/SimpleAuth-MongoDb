import React, { useState } from 'react';
import axios from "axios";
import "../css/Signup.css";
import { Link } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [successMessage, setSuccess] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
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
  setPasswordMatchError('');
  setEmailError('');
  setUsernameError('');
  setFormError('');
  setSuccess('');

  // Check for empty fields
  if (
    form.username.trim() === '' ||
    form.email.trim() === '' ||
    form.password.trim() === '' ||
    form.confirmPassword.trim() === ''
  ) {
    setFormError("Please fill in all fields.");
    return;
  }

  // Confirm password match check
  if (form.password !== form.confirmPassword) {
    setPasswordMatchError("Passwords do not match.");
    return;
  }

  try {
    const response = await axios.post("http://192.168.2.48:5000/signup", form);

    if (response && response.status === 200) {
      setSuccess("You successfully created an account. Log in.");
      setForm({ username: "", email: "", password: "", confirmPassword: "" });
    }
  } catch (err) {
    if (err.response) {
      const { status, data } = err.response;
      if (status === 400 || status === 401) {
        if (data.message.includes('Email')) {
          setEmailError(data.message);
        } else if (data.message.includes('Username')) {
          setUsernameError(data.message);
        }
      }
    }
  }
};


  return (
    <div className="signup-container">
      <h1 className="signup-title">Signup</h1>
      {formError && <p className="error-message">{formError}</p>}


      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          className="form-input"
          onChange={handleChange}
          value={form.username}
        />
        {usernameError && <p className="error-message">{usernameError}</p>}

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

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          className="form-input"
          onChange={handleChange}
          value={form.confirmPassword}
        />
<p>
  Already have an account?{" "}
  <Link to="/login" className="login-link">Login</Link>
</p>
        {passwordMatchError && <p className="error-message">{passwordMatchError}</p>}

        <button type="submit" className="submit-button">
          Sign Up
        </button>
      </form>

      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}
    </div>
  );
};

export default Signup;
