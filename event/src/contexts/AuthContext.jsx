import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import useAxiosSecure, { axiosSecure } from "../hooks/useAxios";

// 1️⃣ Create Context
const AuthContext = createContext();



// 2️⃣ Custom Hook to Use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// 3️⃣ AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const user = { email, password };

      const response = await axiosSecure.post("/users/login", user, { withCredentials: true });
      console.log(response.data);
      const userData = response.data;

      setUser(userData);

      localStorage.setItem('user', JSON.stringify(userData));

      // console.log('User login:', userData);
      return true;

    } catch (error) {
      console.error('Failed to login:', error.response?.data || error.message);
      return false;
    }
  };

  // Register function
  const register = async (name, email, password, photoURL) => {
    try {
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        photoURL,
      };


      const response = await axiosSecure.post('users/register', newUser, { withCredentials: true });
      console.log(response.data); // will have token & user!
      // console.log('User created:', response.data);

      return true;

    } catch (error) {
      console.error('Failed to create user:', error.response?.data || error.message);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Context value
  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
