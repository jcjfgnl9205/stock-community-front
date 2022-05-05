import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Sidebar = () => {

  return (
    <Grid
      item
      xs={12}
      md={4}
    >
      <Paper sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h6">Title</Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <Typography variant="subtitle1" component="span">News1</Typography>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <Typography variant="subtitle1" component="span">News2</Typography>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <Typography variant="subtitle1" component="span">News3</Typography>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <Typography variant="subtitle1" component="span">News4</Typography>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <Typography variant="subtitle1" component="span">Title5</Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Paper>
    </Grid>
  );
}

export default React.memo(Sidebar);
