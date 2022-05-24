import React from 'react';

// Material-UI
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const AddressForm3 = (props) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>User Form Confirm</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField 
            type="text"
            label="username"
            fullWidth
            variant="standard"
            InputProps={{ readOnly: true }}
            value={ props.user.username }
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField 
            type="email"
            label="email"
            fullWidth
            variant="standard"
            InputProps={{ readOnly: true }}
            value={ props.user.email }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            label="Last Name"
            fullWidth
            variant="standard"
            InputProps={{ readOnly: true }}
            value={ props.user.last_name }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            label="First Name"
            fullWidth
            variant="standard"
            InputProps={{ readOnly: true }}
            value={ props.user.first_name }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            label="zipcode"
            variant="standard"
            InputProps={{ readOnly: true }}
            value={ props.user.zipcode }
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            type="text"
            label="Address"
            fullWidth
            variant="standard"
            InputProps={{ readOnly: true }}
            value={ props.user.address1 }
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            type="text"
            label="Address detail"
            fullWidth
            variant="standard"
            InputProps={{ readOnly: true }}
            value={ props.user.address2 }
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default React.memo(AddressForm3);
