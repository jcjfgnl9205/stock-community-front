import React from 'react';

// Material-UI
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


const AddressForm2 = (props) => {

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        User Info 1
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField 
            autoFocus
            id="username"
            label="username"
            name="username"
            fullWidth
            variant="standard"
            value={ props.user.username }
            onChange={ props.onChange }
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
            value={ props.user.email }
            onChange={ props.onChange }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="password"
            id="password"
            label="password"
            name="password"
            fullWidth
            variant="standard"
            value={ props.user.password }
            onChange={ props.onChange }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="password"
            id="passwordCheck"
            label="passwordCheck"
            name="passwordCheck"
            fullWidth
            variant="standard"
            value={ props.user.passwordCheck }
            onChange={ props.onChange }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default React.memo(AddressForm2);
