import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const MainNotice = () => {
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="span">Main Notice</Typography>
        <Link href="#" variant="body2">More</Link>
      </Box>
      <nav aria-label="main mailbox folders">
        <List>
        <ListItem disablePadding>
            <ListItemButton>
              <Typography variant="subtitle1" component="span">Title1</Typography>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <Typography variant="subtitle1" component="span">Title2</Typography>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <Typography variant="subtitle1" component="span">Title3</Typography>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <Typography variant="subtitle1" component="span">Title4</Typography>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <Typography variant="subtitle1" component="span">Title5</Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}

export default React.memo(MainNotice);
