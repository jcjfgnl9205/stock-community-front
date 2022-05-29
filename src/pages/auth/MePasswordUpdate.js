import React from 'react';

// Material-UI
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';


const MePasswordUpdate = () => {

  const onSubmit = e => {
    e.preventDefault();
    console.log("onsubmit");
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Password Update
      </Typography>
      <Divider />
      <Box component="form" onSubmit={ onSubmit }>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Typography variant="subtitle2">Old Password</Typography>
            <TextField 
              autoFocus
              type="password"
              id="oldPassword"
              name="oldPassword"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="subtitle2">New Password</Typography>
            <TextField 
              type="password"
              id="password"
              name="password"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="subtitle2">New Password Check</Typography>
            <TextField 
              type="password"
              id="passwordCheck"
              name="passwordCheck"
              fullWidth
              variant="standard"
            />
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
          <Button type="submit" variant="outlined" color="primary" size="small" >UPDATE</Button>
        </Stack>
      </Box>
    </Container>
  );
}
  
export default React.memo(MePasswordUpdate);