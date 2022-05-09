import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';

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

import { UserContext } from '../../context/UserContext';

import LoginModal from '../auth/LoginModal';

const navLinks = [
  { title: `NOTICE`, path: `/notices` },
  { title: `CONTACT`, path: `/contact` },
  { title: `FAQ`, path: `/faq` },
];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const Navbar = () => {

  const { token, loginModal, loginModalOpen, loginModalClose } = useContext(UserContext);
  const { user, logout } = useContext(UserContext);
  
  const [ anchorElUser, setAnchorElUser ] = useState(null);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} >
            <Link to="/" component={ RouterLink } underline="none" color="inherit" sx={{ mx: 2, display: 'block' }}>LOGO</Link>
          </Typography>

          {/* Navbar Link */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map(({ title, path }) => (
              <Link key={ title } to={ path } component={ RouterLink } underline="none" color="inherit" sx={{ mx: 2, display: 'block' }}>{ title }</Link>
            ))}
          </Box>

          {/* Login, Signup Link */}
          {
            !token
            ? <Box sx={{ display: { md: 'flex' } }}>
                <Link to="#" component={ RouterLink } onClick={ loginModalOpen } underline="none" color="inherit" sx={{ mx: 2, display: 'block' }}>LOGIN</Link>
                <Link to="/signup" component={ RouterLink } underline="none" color="inherit">SIGN UP</Link>
              </Box>
            : <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={ (e) => setAnchorElUser(e.currentTarget) } sx={{ p: 0 }}>
                    <Avatar alt={ user.username } src="/static/images/avatar/2.jpg" />
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
                  onClose={ () => setAnchorElUser(null) }
                >
                  {settings.map(setting => (
                    <MenuItem key={ setting } onClick={ () => setAnchorElUser(null) } >
                      {
                        setting === 'Logout'
                        ? <Link to="#" component={ RouterLink } onClick={ logout } underline="none" color="inherit" sx={{ mx: 2, display: 'block' }} >{ setting }</Link>
                        : <Typography textAlign="center">{ setting }</Typography>
                      }
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
          }


          
        </Toolbar>
      </Container>
      
      <LoginModal open={ loginModal } handleClose={ loginModalClose }/>
    </AppBar>
  );
}

export default React.memo(Navbar);
