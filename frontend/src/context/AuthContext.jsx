import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwttoken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          logout(); // Log out if token is expired
        } else {
          fetchUser(decodedToken.id);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to decode token or fetch user:", error);
        logout(); // Logout if there's an error decoding the token
      }
    }
  }, []);

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      setUser({
        ...response.data,
        profileImage: response.data.profileImage || null,
        height: response.data.height || "",
        weight: response.data.weight || "",
        gender: response.data.gender || "",
        age: response.data.age || "",
      });
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  const login = async (token) => {
    try {
      localStorage.setItem("jwttoken", token);
      const decodedToken = jwtDecode(token);
      await fetchUser(decodedToken.id);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Failed to log in:", error);
      toast.error("Login failed. Please try again.");
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("jwttoken");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
