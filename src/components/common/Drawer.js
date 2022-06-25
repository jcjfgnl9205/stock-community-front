import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";

// Material-UI
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

import { UserContext } from '../../context/UserContext';

const drawerWidth = 240;

const DrawerPage = ({ list, view, setCurrentPage }) => {
  const navigate = useNavigate();

  const { user, myinfoModal, myinfoModalToggle } = useContext(UserContext);

  const drawer = (list) => {
    return (
    <div>
      <Toolbar />
      <List>
        {list?.map(({title, icon}) => (
          <ListItem key={title} disablePadding>
            <ListItemButton onClick={ () => { setCurrentPage(title); navigate(`/${user.username}/${title}`); myinfoModalToggle(); } }>
              <ListItemIcon>
                { icon }
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
    );
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open={myinfoModal}
          onClose={myinfoModalToggle}
        >
          {drawer(list)}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        { view }
      </Box>
    </Box>
  );
}

export default React.memo(DrawerPage);
