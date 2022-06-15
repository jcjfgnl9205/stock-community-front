import React, { useState, useContext } from 'react';
import { useLocation } from "react-router-dom";

// Material-UI
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

import { UserContext } from '../../context/UserContext';
import { update_password_api } from '../../lib/AuthAPI';
import * as Validation from '../../lib/Validation';
import * as config from '../../config';

const PasswordUpdate = () => {

  const path = useLocation(); // 現在path
  const { token, logout } = useContext(UserContext);
  const [ password, setPassword ] = useState({ oldPassword: "", password: "", passwordCheck: "" });
  const [ errorMsg, setErrorMsg ] = useState('');

  const onChange = e => {
    const { value, name } = e.target;
    setPassword({
      ...password, //Inputをコビーする
      [name]: value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!Validation.isPassword(password.oldPassword) || !Validation.isPassword(password.password) || !Validation.isPassword(password.passwordCheck)) {
      setErrorMsg(config.MSG902);
      return;
    }
    if (password.password !== password.passwordCheck) {
      setErrorMsg(config.MSG905);
      return;
    }
    const response = await update_password_api(path.pathname, token, password);
    const data = await response.json();
    if (response.status !== 200 ) {
      setErrorMsg(data.detail);
      return;
    }
    setErrorMsg('');
    setPassword({ oldPassword: "", password: "", passwordCheck: "" });
    alert("PASSWORDが変更されました。再ログインしてください。");
    logout();
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Password Update
      </Typography>
      <Divider />
      <Box component="form" onSubmit={ onSubmit }>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Typography variant="subtitle2">Old Password</Typography>
            <TextField 
              autoFocus
              type="password"
              id="oldPassword"
              name="oldPassword"
              fullWidth
              variant="standard"
              onChange={ onChange }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="subtitle2">New Password</Typography>
            <TextField 
              type="password"
              id="password"
              name="password"
              fullWidth
              variant="standard"
              onChange={ onChange }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="subtitle2">New Password Check</Typography>
            <TextField 
              type="password"
              id="passwordCheck"
              name="passwordCheck"
              fullWidth
              variant="standard"
              onChange={ onChange }
            />
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
          <Button type="submit" variant="outlined" color="primary" size="small" >UPDATE</Button>
        </Stack>
      </Box>
      {
        errorMsg !== ''
        ? <Stack sx={{ width: '100%', mt: 2 }} >
            <Alert severity="error">{ errorMsg }</Alert>
          </Stack>
        : null
      }
    </Container>
  );
}
  
export default React.memo(PasswordUpdate);