import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';


const Faq = () => {

  return (
    <Container component="main">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
        }}
      >
        <Typography component="h1" variant="h4">CONTACT US</Typography>
        <Typography gutterBottom variant="body2">
          Let us know what you think! In order to provide better service, please do not hesitate to give us your feedback. Thank you.
        </Typography>

        <Divider />

        <Paper sx={{ mt: 2 , p: { xs: 2, md: 3 } }}>
          <Box component="form" >
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <TextField
                  type="text"
                  id="username"
                  label="username"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="email"
                  id="email"
                  label="email"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField 
                  type="text"
                  id="subject"
                  label="Subject"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="standard-multiline-static"
                  label="Message"
                  multiline
                  fullWidth
                  rows={6}
                  variant="standard"
                />
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>Submit</Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default React.memo(Faq);
