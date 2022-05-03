import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/Navbar';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

import Main from './pages/common/Main';
import NotFound from './pages/common/NotFound';

function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={ <Main /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />

        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </Router>
  );
}

export default App;
