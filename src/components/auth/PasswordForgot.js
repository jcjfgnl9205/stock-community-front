import React, { useState } from 'react';

// Material-UI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// Modal
import AuthNumCheckModal from '../modal/AuthNumCheckModal';

import * as AuthAPI from '../../lib/AuthAPI';
import * as Validation from '../../lib/Validation';
import * as config from '../../config';


const errorMessage = errMsg => {
  return (
    errMsg !== ''
    ? <Stack sx={{ width: '100%', mt: 2 }} >
        <Alert severity="error">{ errMsg }</Alert>
      </Stack>
    : null
  )
}

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;

const PasswordForgot = (props) => {

  const [ email, setEmail ] = useState("");
  const [ errorMsg, setErrorMsg ] = useState("");
  const [ time, setTime ] = useState();

  const [ showConfirmModal, setShowConfirmModal ] = useState(false);


  const showConfirmModalClose = () => {
    setShowConfirmModal(false);
    setErrorMsg('');
  }

  const forgotPasswordSubmit = async e => {
    e.preventDefault();
    // メール形式チェックする
    if (!Validation.isEmail(email)) {
      setErrorMsg(config.MSG903);
      return;
    }

    // 登録されているメールか確認する
    const response = await AuthAPI.forgot_password_email_check(email);
    if (response.status !== 200) {
      const data = await response.json();
      setErrorMsg(data.detail);
      return;
    }

    setTime(new Date().getTime() + FIVE_MINUTES_IN_MS);
    setShowConfirmModal(prev => !prev);
    setErrorMsg('');
  };

  const authNumCheck = async e => {
    e.preventDefault();
    setShowConfirmModal(prev => !prev);
    props.setFlg(prev => !prev);
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">Forgot Password</Typography>

        <Box component="form" onSubmit={ forgotPasswordSubmit } noValidate sx={{ mt: 1 }}>
          <TextField 
            type="email"
            id="email"
            label="Email Address"
            name="email"
            fullWidth
            variant="standard"
            value={ props.email }
            onChange={ (e) => setEmail(e.target.value) }
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Forgot Password
          </Button>
          { errorMessage(errorMsg) }
        </Box>
      </Box>

      <AuthNumCheckModal
        title="メールより認証番号をご確認ください。"
        open={ showConfirmModal }
        handleClose={ showConfirmModalClose }
        onSubmit={{
          btnName: "CONFIRM",
          color: "primary",
          onSubmit: authNumCheck
        }}

        email={ email }
        dateTimeAfterFiveMinutes={ time }
      />
    </React.Fragment>
  );
}

export default React.memo(PasswordForgot);
