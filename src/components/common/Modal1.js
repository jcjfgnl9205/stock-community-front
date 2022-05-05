import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Modal1 = (props) => {

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ minWidth: 440 }}>
        { props.title }
      </DialogTitle>
      {
        props.content
        ? <DialogContent>
            <DialogContentText id="alert-dialog-description">
              { props.content }
            </DialogContentText>
          </DialogContent>
        : null
      }
      <DialogActions>
        <Button onClick={props.handleClose}>CANCEL</Button>
        {
          props.onSubmit
          ? <Button onClick={props.onSubmit.onSubmit} color={props.onSubmit.color}>{props.onSubmit.btnName}</Button>
          : null
        }
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(Modal1);
