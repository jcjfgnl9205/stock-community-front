import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

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

import Ckeditor5 from '../common/Ckeditor5';

import * as NoticeAPI from '../../lib/NoticeAPI';
import * as Validation from '../../lib/Validation';
import * as config from '../../config';


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

const CreateForm = (props) => {
  const path = useLocation().pathname; // 現在path
  const { create_notice } = NoticeAPI;

  const [ notice, setNotice ] = useState({"title": "", "content": ""})

  const onChange = e => {
      const { value, name } = e.target;
      setNotice({
        ...notice,
        [name]: value
      });
  }
  
  const ckeditorOnChange = e => {
    const name = "content";
    setNotice({...notice, [name]: e.getData() });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (Validation.isNull(notice.title)) {
      props.setErrorMsg(config.MSG501);
      return;
    }
    if (Validation.isNull(notice.content)) {
      props.setErrorMsg(config.MSG502);
      return;
    }
    
    // errormessage初期化
    props.setErrorMsg('');
    
    // 掲示板登録
    const response = await create_notice(path, props.token, notice);
    if (response.status === 200) {
      props.handleClose();
    } else {
      const data = await response.json();
      props.setErrorMsg(data.detail);
    }
    
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose} sx={{ minWidth: 800 }}>
          { props.title }
        </BootstrapDialogTitle>

        <Box component="form" onSubmit={ onSubmit }>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              name="title"
              label="TITLE"
              type="text"
              fullWidth
              variant="standard"
              onChange={ onChange }
            />
            <Ckeditor5 onChange={ ckeditorOnChange } data={ props.data } />
          </DialogContent>

          {/* Notice Create Failed */}
          <DialogContent>
          {
            props.errorMsg !== ''
            ? <Stack sx={{ width: '100%' }} >
                <Alert severity="error">{ props.errorMsg }</Alert>
              </Stack>
            : null
          }
          </DialogContent>

          <DialogActions>
            <Button type="button" onClick={props.handleClose} color="error">CANCEL</Button>
            <Button type="submit" >CREATE</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default React.memo(CreateForm);
