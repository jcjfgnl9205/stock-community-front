import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import SignupForm1 from './SignupForm1';
import SignupForm2 from './SignupForm2';
import SignupForm3 from './SignupForm3';
import SignupFormConfirm from './SignupFormConfirm';

const steps = ['Personal information', 'User Info 1', 'User Info 2', 'User Info Confirm'];

const getStepContent = step => {
  switch (step) {
    case 0:
      return <SignupForm1 />;
    case 1:
      return <SignupForm2 />;
    case 2:
      return <SignupForm3 />;
    case 3:
      return <SignupFormConfirm />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

const Signup = () => {

  const [ activeStep, setActiveStep ] = useState(0);

  return (
    <ThemeProvider theme={ theme }>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">Sign Up</Typography>

          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }} alternativeLabel>
            {steps.map(label => (
              <Step key={label} >
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Sign Up */}
          <React.Fragment>
            {
            activeStep === steps.length 
            ? <React.Fragment>
                <Typography variant="h5" gutterBottom align="center">
                  新規登録ありがとうございます。
                </Typography>
                <Typography align="center">
                  <Link href="/login" variant="body2">トップページに戻る</Link>
                </Typography>
              </React.Fragment>
            : <React.Fragment>
                { getStepContent(activeStep) }
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={ () => setActiveStep(activeStep - 1) } sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button variant="contained" onClick={ () => setActiveStep(activeStep + 1) } sx={{ mt: 3, ml: 1 }} >
                    { activeStep === steps.length - 1 ? 'Place order' : 'Next' }
                  </Button>
                </Box>
              </React.Fragment>
            }
          </React.Fragment>
        </Paper>
      </Container>

    </ThemeProvider>
  );
}

export default React.memo(Signup);
