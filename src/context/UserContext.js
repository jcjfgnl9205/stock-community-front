import React, { createContext, useState } from "react";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [ user, setUser ] = useState({ name: '', auth: true });
  const [ loginModal, setLoginModal ] = useState(false);
  
  const loginModalOpen = () => { setLoginModal(true); }
  const loginModalClose = () => { setLoginModal(false); }

  // Login updates the user data with a name parameter
  const login = (name) => {
    setUser((user) => ({
      name: name,
      auth: true,
    }));
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      name: '',
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loginModal, loginModalOpen, loginModalClose }}>
      {children}
    </UserContext.Provider>
  );
};
