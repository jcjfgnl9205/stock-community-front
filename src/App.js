import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  } from "react-router-dom";

// Material-UI
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { UserContext } from './context/UserContext';

import Navbar from './components/common/Navbar';
import Signup from './pages/auth/Signup';
import Me from './pages/auth/Me';
import FindPassword from './pages/auth/FindPassword';

import Main from './pages/common/Main';
import Notices from './pages/board/Notices';
import Notice from './pages/board/Notice';
import Contact from './pages/common/Contact';
import Faq from './pages/common/Faq';

import LoginModal from './components/auth/LoginModal';
import NotFound from './pages/common/NotFound';

function App() {
  const { user, token } = useContext(UserContext);
  const { loginModal, loginModalClose } = useContext(UserContext);

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.grey[100],
        minHeight: '100vh',
        display: 'flex',
        pt:8
      }}
    >
      <Router>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={ <Main /> } />
          <Route path="/signup" element={ token ? <Navigate to="/" replace /> : <Signup /> } />
          <Route path={`/${user.username}/:str`} element={ !token ? <Navigate to="/" replace /> : <Me /> } />
          <Route path="forgot-password" element={ token ? <Navigate to="/" replace /> : <FindPassword /> } />

          <Route path="/stock/:stockname" element={ <Notices /> } />
          <Route path="/stock/:stockname/:id" element={<Notice />} />

          <Route path="/notices" element={ <Notices /> } />
          <Route path="/notices/:id" element={<Notice />} />

          <Route path="/contact" element={ <Contact /> } />
          <Route path="/faq" element={ <Faq /> } />

          <Route path="*" element={ <NotFound /> } />
        </Routes>
      </Router>
      <LoginModal open={ loginModal } handleClose={ loginModalClose }/>
    </Box>
  );
}

export default App;
