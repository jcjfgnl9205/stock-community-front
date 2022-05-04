import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

import Navbar from './components/Navbar';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

import Main from './pages/common/Main';
import Notices from './pages/board/Notices';
import Notice from './pages/board/Notice';
import Contact from './pages/common/Contact';
import Faq from './pages/common/Faq';

import NotFound from './pages/common/NotFound';

function App() {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.grey[100],
        minHeight: '100vh',
      }}
    >
      <Router>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={ <Main /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/signup" element={ <Signup /> } />


          <Route path="/notices" element={ <Notices /> } />
          <Route path="/notices/:id" element={<Notice />} />

          <Route path="/contact" element={ <Contact /> } />
          <Route path="/faq" element={ <Faq /> } />

          <Route path="*" element={ <NotFound /> } />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
