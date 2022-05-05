import React, { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import Link from '@mui/material/Link';
import LoginModal from '../auth/LoginModal';

const navLinks = [
  { title: `NOTICE`, path: `/notices` },
  { title: `CONTACT`, path: `/contact` },
  { title: `FAQ`, path: `/faq` },
];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const Navbar = () => {

  const [ anchorElUser, setAnchorElUser ] = useState(null);
  const [ loginModalOpen, setLoginModalOpen ] = useState(false);
  
  const loginClickOpen = () => {
    setLoginModalOpen(true);
  };
  const loginClickClose = () => {
    setLoginModalOpen(false);
  };

  
  const handleOpenUserMenu = e => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} >
            <Link href="/" underline="none" sx={{ mx: 2, color: 'white', display: 'block' }}>LOGO</Link>
          </Typography>

          {/* Navbar Link */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map(({ title, path }) => (
              <Link href={ path } key={ title } color="inherit" underline="none" sx={{ mx: 2, color: 'white', display: 'block' }}>{ title }</Link>
            ))}
          </Box>

          {/* Login, Signup Link */}
          <Box sx={{ display: { md: 'flex' } }}>
            <Link href="#" color="inherit" underline="none" sx={{ mx: 2, color: 'white', display: 'block' }} onClick={ loginClickOpen } >LOGIN</Link>
            <Link href="/signup" color="inherit" underline="none" sx={{ mx: 2, color: 'white', display: 'block' }} >SIGN UP</Link>
          </Box>
          {/* user menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={ handleOpenUserMenu } sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={ anchorElUser }
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={ Boolean(anchorElUser) }
              onClose={ handleCloseUserMenu }
            >
              {settings.map(setting => (
                <MenuItem key={ setting } onClick={ handleCloseUserMenu } >
                  <Typography textAlign="center">{ setting }</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      
      <LoginModal open={loginModalOpen} loginClickOpen={loginClickOpen} loginClickClose={loginClickClose}/>
    </AppBar>
  );
}

export default React.memo(Navbar);