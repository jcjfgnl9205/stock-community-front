import React, { useState, useEffect, useContext } from 'react';

// Material-UI
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';


import { UserContext } from '../../context/UserContext';

const MeUserInfo = () => {

  const { user } = useContext(UserContext);

  const [ updateFlg, setUpdateFlg ] = useState(false);

  const onSubmit = e => {
    e.preventDefault();
    console.log("onsubmit");
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Public profile
      </Typography>
      <Divider />

      <Box component="form" onSubmit={ onSubmit }>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <TextField 
              autoFocus
              id="username"
              label="username"
              name="username"
              fullWidth
              variant="standard"
              InputProps={{ readOnly: updateFlg ? false : true }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField 
              type="email"
              id="email"
              label="email"
              name="email"
              fullWidth
              variant="standard"
              InputProps={{ readOnly: updateFlg ? false : true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              label="Last Name"
              name="last_name"
              fullWidth
              variant="standard"
              InputProps={{ readOnly: updateFlg ? false : true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              label="First Name"
              name="first_name"
              fullWidth
              variant="standard"
              InputProps={{ readOnly: updateFlg ? false : true }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              type="text"
              label="zipcode"
              name="zipcode"
              variant="standard"
              InputProps={{ readOnly: updateFlg ? false : true }}
            />
            { updateFlg ? <Button variant="outlined" color="secondary" >検索</Button> : null}
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              type="text"
              label="Address"
              name="address1"
              fullWidth
              variant="standard"
              InputProps={{ readOnly: updateFlg ? false : true }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              type="text"
              label="Address detail"
              name="address2"
              fullWidth
              variant="standard"
              InputProps={{ readOnly: updateFlg ? false : true }}
            />
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
          {
            updateFlg
            ? <React.Fragment>
                <Button type="submit" variant="outlined" color="primary" size="small" >UPDATE</Button>
                <Button type="button" variant="outlined" color="error" size="small" onClick={ () => setUpdateFlg(prev => !prev) } >CANCEL</Button>
              </React.Fragment>
            : <Button type="button" variant="outlined" color="secondary" size="small" onClick={ () => setUpdateFlg(prev => !prev) } >UPDATE</Button>
          }
        </Stack>
      </Box>
    </Container>
  );
}
  
export default React.memo(MeUserInfo);
