import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Signup from './auth/signup.js';
import Login from './auth/signin.js';
import Home from "./Home.js";
import { AuthProvider, useAuth } from './auth/AuthProvider.js';

const AppRoutes = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <div>Loading...</div>; // or spinner

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Home /> : <Login />}
      />
      <Route
        path="/signup"
        element={!user ? <Signup /> : <Home />}
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Home />}
      />
    </Routes>
  );
};


function App() {
  return (
    <Router> {/* ✅ Must wrap everything using router hooks */}
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
