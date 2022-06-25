import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

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



import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';


import { UserContext } from '../../context/UserContext';
import * as Common from '../../lib/Common';


const PcNavBar = ({ navLinks }) => {
  const { token, loginModalOpen } = useContext(UserContext);
  const { user, logout } = useContext(UserContext);
  const { myinfoModalToggle } = useContext(UserContext);
  const [ stockMenu, setStockMenu ] = useState(null);
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
            {navLinks.map(({ name, path, sub }) => (
              sub?.length > 0
              ? <Box key={ name } sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <Link to="#" component={ RouterLink } underline="none" color="inherit"  onClick={ (e) => setStockMenu(e.currentTarget) } sx={{ mx: 2, display: 'block' }}>{ name }</Link>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={ stockMenu }
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={ Boolean(stockMenu) }
                    onClose={ () => setStockMenu(null) }
                  >
                    { 
                      sub.map(({ name, path }) => {
                        return (
                          <MenuItem key={ name } onClick={ () => setStockMenu(null) }>
                            <Link to={ path } component={ RouterLink }  underline="none" color="inherit" onClick={ name === 'Logout' && logout } >{ name }</Link>
                          </MenuItem>
                        )
                      })
                    }
                  </Menu>
                </Box>
              : <Link key={ name } to={ path } component={ RouterLink } underline="none" color="inherit" sx={{ mx: 2, display: 'block' }}>{ name }</Link>
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
                  <MenuItem onClick={ () => setAnchorElUser(null) } >
                    <Link to={ `${user.username}/MyInfo` } component={ RouterLink } onClick={ myinfoModalToggle } underline="none" color="inherit">PROFILE</Link>
                  </MenuItem>
                  <MenuItem onClick={ () => setAnchorElUser(null) } >
                    <Link to="#" component={ RouterLink } onClick={ logout } underline="none" color="inherit" >LOGOUT</Link>
                  </MenuItem>
                </Menu>
              </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  )
}


const MobileNavBar = (props) => {

  const { window } = props;
  const navigate = useNavigate();
  const { token, loginModalOpen } = useContext(UserContext);
  const { user, logout } = useContext(UserContext);
  const [ mobileOpen, setMobileOpen] = useState(false);
  const [ open, setOpen ] = useState(false);
  const [ openUser, setOpenUser ] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleUserClick = () => {
    setOpenUser(!openUser);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setOpen(false);
    setOpenUser(false);
  };

  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={ window !== undefined ? () => window().document.body : undefined }
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          <Box>
            <List>
              {
                props.navLinks.map(({ name, path, sub }) => (
                  sub.length > 0
                  ? <React.Fragment key={ name } >
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => { handleClick(); }}>
                          <ListItemText primary={ name } />
                          { open ? <ExpandLess /> : <ExpandMore /> }
                        </ListItemButton>
                      </ListItem>
                      <Collapse in={ open } timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {
                            sub.map(({ name, path }) => {
                              return (
                                <ListItemButton key={ name } sx={{ pl: 4 }}>
                                  <Link to={ path } component={ RouterLink }  underline="none" color="inherit" onClick={ handleDrawerToggle } >{ name }</Link>
                                </ListItemButton>
                              )
                            })
                          }
                        </List>
                      </Collapse>
                    </React.Fragment>
                  : <ListItem key={name} disablePadding>
                      <ListItemButton onClick={() => { handleDrawerToggle(); navigate(path); }}>
                        <ListItemText primary={ name } />
                      </ListItemButton>
                    </ListItem>
                ))
              }
            </List>
          </Box>
          <Divider/>
          <Box>
            <List>
                {
                !token
                ? <React.Fragment>
                    <ListItem  disablePadding>
                      <ListItemButton onClick={() => { handleDrawerToggle(); loginModalOpen(); }}>
                        <ListItemText primary="LOGIN" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem  disablePadding>
                      <ListItemButton onClick={() => { handleDrawerToggle(); navigate("/signup"); }}>
                        <ListItemText primary="SIGN UP" />
                      </ListItemButton>
                    </ListItem>
                  </React.Fragment>
                : <React.Fragment>
                    <ListItem  disablePadding>
                      <ListItemButton onClick={() => { handleUserClick(); }}>
                        <ListItemText primary={ user.username } />
                        { openUser ? <ExpandLess /> : <ExpandMore /> }
                      </ListItemButton>
                    </ListItem>
                    <Collapse in={ openUser } timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                          <Link to={ `${user.username}/MyInfo` } component={ RouterLink }  underline="none" color="inherit" onClick={ handleDrawerToggle } >MyInfo</Link>
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}>
                          <Link to={ `${user.username}/PasswordUpdate` } component={ RouterLink }  underline="none" color="inherit" onClick={ handleDrawerToggle } >PasswordUpdate</Link>
                        </ListItemButton>
                      </List>
                    </Collapse>
                    <ListItem  disablePadding>
                      <ListItemButton onClick={() => { handleDrawerToggle(); logout(); }}>
                        <ListItemText primary="LOGOUT" />
                      </ListItemButton>
                    </ListItem>
                  </React.Fragment>
                }
            </List>
          </Box>
        </Drawer>
        
      </Box>
      
    </>
  )
}


const Navbar = () => {
  const [ navLinks, setNavLinks ] = useState([]);

  useEffect(() => {
    const get_menus = async () => {
      const response = await Common.get_menus();
      const data = await response.json();
      if (response.status === 200) {
        setNavLinks(data);
      }
    }
    get_menus();
  }, [setNavLinks]);

  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <PcNavBar navLinks={ navLinks } />
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <MobileNavBar navLinks={ navLinks } />
      </Box>
    </>
  );
}

export default React.memo(Navbar);
