import React, { createContext, useState, useEffect } from "react";
import * as Validation from '../lib/Validation';
import * as config from '../config';
import jwt_decode from "jwt-decode";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [ token, setToken ] = useState('');
  const [ user, setUser ] = useState({ id: '', username: '', is_active: false, if_staff: false });
  const [ loginModal, setLoginModal ] = useState(false);
  const [ myinfoModal, setMyinfoModal ] = useState(false);
  
  const loginModalOpen = () => { setLoginModal(true); }
  const loginModalClose = () => { setLoginModal(false); }
  const myinfoModalToggle = () => { setMyinfoModal(myinfoModal => !myinfoModal); };

  useEffect(() => {
    const get_refresh_token = async () => {
      if (localStorage.getItem("token")) {
        const access_token = await refresh_token(localStorage.getItem("token"));
        setToken(access_token);
        decodedetUser(access_token);
      }
    }
    get_refresh_token();
  }, []);

  // Login updates the user data with a name parameter
  const login = async (user) => {
    if (!Validation.isUsername(user.username)) {
      return config.MSG901;
    }
    if (!Validation.isPassword(user.password)) {
      return config.MSG902;
    }
    
    const param = { method: "POST",
                    headers: { "Content-Type": "application/json;" },
                    body: JSON.stringify({ username: user.username, password: user.password })
                    };
    const response = await fetch("http://localhost:8000/auth/login", param);
    const data = await response.json();
    if (response.status === 200) {
      setToken(data.access_token);
      localStorage.setItem("token", data.refresh_token);
      decodedetUser(data.access_token);
      loginModalClose();
      return data;
    } else {
      return config.MSG941;
    }
  };

  // Logout updates the user data to default
  const logout = () => {
    localStorage.removeItem("token");
    setToken('');
  };

  const refresh_token = async (token) => { 
    const param = { method: "POST",
                    headers: { "Content-Type": "application/json;",
                                Authorization: "Bearer " + token}
                    };
    const response = await fetch("http://localhost:8000/auth/refresh_token", param);
    const data = await response.json();
    if (response.status === 200) {
      return data.access_token;
    } else {
      return '';
    }
  }

  const decodedetUser = token => {
    const decoded = jwt_decode(token);
    setUser(() => ({
      username: decoded.sub,
      id: decoded.user_id
    }));
  }

  return (
    <UserContext.Provider value={{ token, user, login, logout, loginModal, loginModalOpen, loginModalClose, myinfoModal, myinfoModalToggle }}>
      {children}
    </UserContext.Provider>
  );
};
