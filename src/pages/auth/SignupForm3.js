import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const AddressForm3 = () => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        User Info 2
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            id="lastName"
            label="Last Name"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            id="firstName"
            label="First Name"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            id="zipcode"
            label="zipcode"
            variant="standard"
          />
          <Button variant="outlined" color="secondary" onClick={ () => console.log("zipcode") } >検索</Button>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            type="text"
            id="address1"
            label="Address"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            type="text"
            id="address1"
            label="Address detail"
            fullWidth
            variant="standard"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default React.memo(AddressForm3);
