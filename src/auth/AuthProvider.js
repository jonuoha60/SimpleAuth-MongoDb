import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import this

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [email, setEmailForm] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const loadStoredData = () => {
      const savedEmail = localStorage.getItem('email');
      const savedUserId = localStorage.getItem('userId');
      const savedUsername = localStorage.getItem('username');

      if (savedEmail && savedUserId) {
        setEmailForm(savedEmail);
        setUserId(savedUserId);
        setUsername(savedUsername);
        setUser({ email: savedEmail, userId: savedUserId, username: savedUsername });
      }

      setAuthLoading(false);
    };

    loadStoredData();
  }, []);

  const login = async (email, userId, username) => {
    localStorage.setItem('email', email);
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);

    setEmailForm(email);
    setUserId(userId);
    setUsername(username);
    setUser({ email, userId, username });
  };

 const logout = async () => {
    try {

      navigate('/signup'); 

      localStorage.removeItem('email');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');

      setUser(null);
      setUserId(null);
      setEmailForm('');
      setUsername('');

    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        email,
        username,
        authLoading,
        setUserId,
        setUser,
        setEmailForm,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Exportable hook
export const useAuth = () => useContext(AuthContext);
