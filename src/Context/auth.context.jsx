import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import authService from "../services/auth.service";
<<<<<<< HEAD


const API_URL = "http://localhost:5005";

=======
const API_URL = "https://devhub.adaptable.app/";
>>>>>>> 733407f414a4be5bb4293211ead4cad62793da5f
export const AuthContext = React.createContext();
export function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  /* Store the token in the local storage */
  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  };
  /* Authenticate the User via JWT */
  const authenticateUser = () => {
    // Get the stored token from the local storage
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      authService
        .verify()
        .then((response) => {
          const userData = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(userData);
          console.log("Logged in as:", userData.username)
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      console.log("Failed to log")
    }
  };
  const removeToken = () => {
    localStorage.removeItem('authToken');
  };
  const logOut = () => {
    removeToken();
    setIsLoggedIn(false);
    setUser(null);
  };
  useEffect(() => {
    authenticateUser();
  }, []);
  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      isLoading,
      user,
      storeToken,
      authenticateUser,
      logOut
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}