import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { deepPurple, grey } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import TextField from '@mui/material/TextField';

import { UserContext } from '../../context/UserContext';

const Comments = () => {

  const { loginModalOpen } = useContext(UserContext);

  return (
    <Grid
      item
      xs={12}
      md={8}
    >
      <Paper sx={{ p: 4, }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          <Typography variant="h5" gutterBottom>Comments</Typography>
          <Typography variant="body2" color={deepPurple[600]}>total 55</Typography>
        </Box>

        <Divider />

        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                      fontWeight: 'bold'
                    }}
                  >
                    <Typography variant="body" color={grey[900]}>admin1234</Typography>
                    <Typography variant="body2" color={grey[900]}>2020.03.04</Typography>
                  </Box>
                </React.Fragment>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Ali Connors— I'll be in your neighborhood doing errands this…
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Summer BBQ"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    to Scott, Alex, Jennifer
                  </Typography>
                  {" — Wish I could come, but I'm out of town this…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />

          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Sandra Adams
                  </Typography>
                  {' — Do you have Paris recommendations? Have you ever…'}
                </React.Fragment>
              }
            />
          </ListItem>
        </List>

        <Divider />
        
        <Box component="form">
          <TextField
            id="outlined-multiline-static"
            label="comment"
            multiline
            fullWidth
            rows={4}
            sx={{ mt: 2 }}
          />
          <Button type="submit" variant="contained" sx={{ mt:1 }} >submit</Button>
        </Box>
        <Box onClick={ loginModalOpen }>
          <Typography variant="h6" align="center" gutterBottom>Write comments</Typography>
          <Typography variant="body2" align="center" gutterBottom>Login required</Typography>
        </Box>
      </Paper>
    </Grid>
  );
}

export default React.memo(Comments);