import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { UserContext } from './context/UserContext';

import Navbar from './components/common/Navbar';
import Signup from './pages/auth/Signup';

import Main from './pages/common/Main';
import Notices from './pages/board/Notices';
import Notice from './pages/board/Notice';
import Contact from './pages/common/Contact';
import Faq from './pages/common/Faq';

import NotFound from './pages/common/NotFound';

function App() {
  const { token } = useContext(UserContext);

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
          <Route path="/signup" element={ token ? <Navigate to="/" replace /> : <Signup /> } />


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
