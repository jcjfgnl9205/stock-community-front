import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

// Material-UI
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
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import SignupForm1 from './SignupForm1';
import SignupForm2 from './SignupForm2';
import SignupForm3 from './SignupForm3';
import SignupFormConfirm from './SignupFormConfirm';

import * as AuthAPI from '../../lib/AuthAPI';
import * as config from '../../config';
import * as Validation from '../../lib/Validation';


const steps = ['Personal information', 'User Info 1', 'User Info 2', 'User Info Confirm'];

const register = {
  username: "",
  email: "",
  password: "",
  passwordCheck: "",
  zipcode: "",
  address1: "",
  address2: "",
  first_name: "",
  last_name: "",
  is_active: false,
  is_staff: false,
}

const getStepContent = (step, agree, handleChange, onChange, user, setUser) => {
  switch (step) {
    case 0:
      return <SignupForm1 
                onChange={ handleChange } 
                checked={ agree }
              />;
    case 1:
      return <SignupForm2 
                user={ user }
                onChange={ onChange }
              />;
    case 2:
      return <SignupForm3 
                user={ user }
                onChange={ onChange }
                setUser={ setUser }
              />;
    case 3:
      return <SignupFormConfirm 
                user={ user }
              />;
    default:
      throw new Error('Unknown step');
  }
}

const errorMessage = errMsg => {
  return (
    errMsg !== ''
    ? <Stack sx={{ width: '100%', mt: 2 }} >
        <Alert severity="error">{ errMsg }</Alert>
      </Stack>
    : null
  )
}
const theme = createTheme();

const Signup = () => {
  const path = useLocation(); // 現在path

  const [ agree, setAgree ] = useState(false);
  const [ user, setUser ] = useState(register);

  const [ activeStep, setActiveStep ] = useState(0);
  const [ errorMsg, setErrorMsg ] = useState('');

  const onChange = e => {
    const { value, name } = e.target;
    setUser({
      ...user, //Inputをコビーする
      [name]: value
    });
  };

  const handleChange = e => {
    setAgree(e.target.checked);
  };

  const onClickNextBtn = async (e) => {
    if (activeStep === 0) {         //SignupForm1, checkbox確認する
      if (!agree) {
        setErrorMsg(config.MSG971);
        return;
      }

      setErrorMsg('');
      setActiveStep(activeStep + 1);
    } else if (activeStep === 1) {  //SignupForm2, 必須情報を登録する
      if (!Validation.isUsername(user.username)) {
        setErrorMsg(config.MSG901);
        return;
      }
      if (!Validation.isEmail(user.email)) {
        setErrorMsg(config.MSG903);
        return;
      }
      if (!Validation.isPassword(user.password) || !Validation.isPassword(user.passwordCheck)) {
        setErrorMsg(config.MSG902);
        return;
      }
      if (user.password !== user.passwordCheck) {
        setErrorMsg(config.MSG905);
        return;
      }

      // username重複チェック
      {
        const response = await AuthAPI.duplicate_id_check(path.pathname, user.username);
        const data = await response.json();
        if (response.status !== 200) {
          setErrorMsg(data.detail);
          return;
        }
      }

      // email重複チェック
      {
        const response = await AuthAPI.duplicate_email_check(path.pathname, user.email);
        const data = await response.json();
        if (response.status !== 200) {
          setErrorMsg(data.detail);
          return;
        }
      }

      setErrorMsg('');
      setActiveStep(activeStep + 1);
    } else if (activeStep === 2) {  //SignupForm3, 
      setErrorMsg('');
      setActiveStep(activeStep + 1);
    } else if (activeStep === 3) {  //SignupFormConfirm, 
      // 会員登録
      const response = await AuthAPI.signup(path.pathname, user);
      const data = await response.json();
      if (response.status !== 200) {
        setErrorMsg(data.detail);
        return;
      }

      setErrorMsg('');
      setActiveStep(activeStep + 1);
    }
  }


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
                  <Link href="/" variant="body2">トップページに戻る</Link>
                </Typography>
              </React.Fragment>
            : <React.Fragment>
                { getStepContent(activeStep, agree, handleChange, onChange, user, setUser) }
                { errorMessage(errorMsg) }

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={ () => setActiveStep(activeStep - 1) } sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button variant="contained" onClick={ onClickNextBtn } sx={{ mt: 3, ml: 1 }} >
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
