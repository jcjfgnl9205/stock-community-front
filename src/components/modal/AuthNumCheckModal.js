import React, { useState } from 'react';

// Material-UI
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import * as AuthAPI from '../../lib/AuthAPI';
import CountdownTimer from '../common/CountdownTimer';


const CustomDialogTitle = (props) => {
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

const AuthNumCheckModal = (props) => {
  const [ authNum, setAuthNum ] = useState('');
  const [ expriedFlg, setExpriedFlg ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    // 時間が過ぎた場合
    if (expriedFlg) {
      setErrorMsg("時間が過ぎてますので、再度メール認証を行なってください。");
      return;
    }
    // Nullの場合
    if (authNum === "") {
      setErrorMsg("認証番号を入力してください。");
      return;
    }
    // DBに保存しているAuthNumberと比較する
    const response = await AuthAPI.forgot_password_authnum_check(props.email, authNum);
    if (response.status !== 200) {
      const data = await response.json();
      setErrorMsg(data.detail);
      return;
    }

    setErrorMsg('');
    props.onSubmit.onSubmit(e);
  }

  const onClose = () => {
    setExpriedFlg(prev => !prev);
    setErrorMsg('');
    props.handleClose();
  }

  return (
    <div>
      <Dialog open={props.open} onClose={onClose}>
        <CustomDialogTitle id="customized-dialog-title" onClose={onClose} sx={{ minWidth: 400 }}>
          { props?.title }
        </CustomDialogTitle>
        <Box component="form" onSubmit={ onSubmit }>
          <DialogContent>
            <TextField
              autoFocus={ true }
              id="authNum"
              name="authNum"
              label="Auth Number"
              variant="standard"
              value={ authNum }
              inputProps={{ maxLength: 8 }}
              onChange={ (e) => setAuthNum(e.target.value) }
            />
            <Typography variant="caption" display="block">
              <CountdownTimer targetDate={props.dateTimeAfterFiveMinutes} setExpriedFlg={ setExpriedFlg }/>
            </Typography>

          </DialogContent>

          {/* Notice Create Failed */}
          {
            errorMsg !== ''
            ? <DialogContent sx={{ py: 0 }}>
                <Stack sx={{ width: '100%' }} >
                  <Alert severity="error">{ errorMsg }</Alert>
                </Stack>
              </DialogContent>
            : null
          }

          <DialogActions>
            <Button type="button" onClick={onClose} color="error">CANCEL</Button>
            <Button type="submit" color={props.onSubmit.color}>{ props.onSubmit.btnName }</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default React.memo(AuthNumCheckModal);
