import React, { useState, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Material-UI
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


const navLinks = [
  { title: `NOTICE`, path: `/notices` },
  { title: `CONTACT`, path: `/contact` },
  { title: `FAQ`, path: `/faq` },
];



const loginMenu = (username) => {
  const settings = [
    {title: 'Profile', path: `/${username}`},
    {title: 'Logout', path: '#'}
  ];
  return settings;
}

const Navbar = () => {

  const { token, loginModalOpen } = useContext(UserContext);
  const { user, logout } = useContext(UserContext);
  const { myinfoModalToggle } = useContext(UserContext);

  const [ anchorElUser, setAnchorElUser ] = useState(null);

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
                  {loginMenu(user.username)?.map(({ title, path }) => (
                    <MenuItem key={ title } onClick={ () => setAnchorElUser(null) } >
                      {
                        title === 'Logout'
                        ? <Link to={ path } component={ RouterLink } onClick={ logout } underline="none" color="inherit" >{ title }</Link>
                        : <Link to={ path } component={ RouterLink } onClick={ myinfoModalToggle } underline="none" color="inherit">{ title }</Link>
                      }
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default React.memo(Navbar);
