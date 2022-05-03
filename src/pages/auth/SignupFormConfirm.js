import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const AddressForm3 = () => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>User Form Confirm</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField 
            id="username"
            label="username"
            fullWidth
            variant="standard"
            value="admin1234"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField 
            type="email"
            id="email"
            label="email"
            fullWidth
            variant="standard"
            value="admin1234@admin1234.com"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            id="lastName"
            label="Last Name"
            fullWidth
            variant="standard"
            value="Park"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            id="firstName"
            label="First Name"
            fullWidth
            variant="standard"
            value="Cheol Hwi"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            id="zipcode"
            label="zipcode"
            variant="standard"
            value="1234567"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            type="text"
            id="address1"
            label="Address"
            fullWidth
            variant="standard"
            value="横浜市　南区　浦舟町　１丁目ー１６−３"
            InputProps={{ readOnly: true }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            type="text"
            id="address1"
            label="Address detail"
            fullWidth
            variant="standard"
            value="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            InputProps={{ readOnly: true }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default React.memo(AddressForm3);
