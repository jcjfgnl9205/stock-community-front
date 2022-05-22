import React, { useState } from 'react';

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

const UpdateModal = (props) => {
  const [ comment, setComment ] = useState({"comment": ""});

  const onChange = e => {
      const { value, name } = e.target;
      setComment({
        ...comment,
        [name]: value
      });
  }
  
  const onSubmit = e => {
    e.preventDefault();
    if (Validation.isNull(comment.comment)) {
      props.setErrorMsg(config.MSG503);
      return;
    }
    props.onSubmit.onSubmit(comment);
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose} sx={{ minWidth: 600 }}>
          { props.label }
        </BootstrapDialogTitle>
        <Box component="form" onSubmit={ onSubmit }>
          <DialogContent>
            <TextField
              autoFocus
              id="outlined-multiline-static"
              name={props.textfield.name}
              label={props.textfield.label}
              fullWidth
              multiline
              rows={4}
              defaultValue={ props.comment }
              onChange={ onChange }
            />
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
            <Button type="submit" color={props.onSubmit.color}>{props.onSubmit.btnName}</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default React.memo(UpdateModal);
