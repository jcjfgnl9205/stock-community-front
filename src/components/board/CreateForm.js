import React from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Ckeditor5 from '../common/Ckeditor5';


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

  const { title } = props;

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose} sx={{ minWidth: 800 }}>
          { title }
        </BootstrapDialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="subject"
            label="SUBJECT"
            type="text"
            fullWidth
            variant="standard"
          />
          <Ckeditor5  />
        </DialogContent>

        <DialogActions>
          <Button onClick={props.handleClose} color="error">CANCEL</Button>
          <Button onClick={props.onSubmit} >CREATE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default React.memo(CreateForm);
