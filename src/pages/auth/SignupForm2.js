import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const AddressForm2 = () => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        User Info 1
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField 
            id="username"
            label="username"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField 
            type="email"
            id="email"
            label="email"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="password"
            id="password"
            label="password"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="password"
            id="passwordCheck"
            label="passwordCheck"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default React.memo(AddressForm2);
