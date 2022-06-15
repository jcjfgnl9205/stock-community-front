import React, { useState, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';

// Material-UI
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import { UserContext } from '../../context/UserContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const LoginModal = (props) => {

  const { login } = useContext(UserContext);
  const [ cookies, setCookie, removeCookie ] = useCookies(["rememberUsername"]);

  const [ user, setUser ] = useState({username: "", password: ""});
  const [ isRemember, setIsRemember ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState('');

  // cookieにusernameがある場合表示する
  useEffect(() => {
    if(cookies.rememberUsername !== undefined) {
      
      setUser(prev => { return { ...prev, username: cookies.rememberUsername } });
      setIsRemember(true);
    }
  }, [cookies]);

  const onChangeIsRemember = (e) => {
    setIsRemember(e.target.checked);
    if(e.target.checked){
      setCookie('rememberUsername', user.username, { maxAge: 60 * 60 * 24 * 7 });
    } else {
      removeCookie('rememberUsername');
    }
  }

  const onChange = e => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  const loginSubmit = async e => {
    e.preventDefault();
    const data = await login(user);
    if (!data.access_token) {
      setErrorMsg(data)
    }
  };


  return (
    <div>
      <BootstrapDialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Login
        </BootstrapDialogTitle>

        <DialogContent dividers sx={{ maxWidth: 440 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box component="form" onSubmit={ loginSubmit } noValidate>
              <TextField
                margin="normal"
                required
                fullWidth
                id="text"
                label="username"
                name="username"
                autoFocus
                value={ user.username }
                inputProps={{ minLength: 8, maxLength : 20 }}
                onChange={ onChange }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                inputProps={{ minLength: 8, maxLength : 20 }}
                onChange={ onChange }
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" checked={ isRemember } onChange={ onChangeIsRemember } />}
                label="Remember me"
              />

              {/* Login Failed */}
              {
                errorMsg
                ? <Stack sx={{ width: '100%' }} >
                    <Alert severity="error">{ errorMsg }</Alert>
                  </Stack>
                : null
              }

              {/* Login Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              {/* Find Password, Sign Up Link */}
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">Don't have an account? Sign Up</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </DialogContent>

      </BootstrapDialog>
    </div>
  );
}

export default React.memo(LoginModal);
