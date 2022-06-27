// Material-UI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


const ConfirmModal = ({ title, content, open, handleClose, btn }) => {
  return (
    <Dialog
      open={ open }
      onClose={ handleClose }
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ minWidth: 440 }}>
        { title }
      </DialogTitle>

      {
        content
        ? <DialogContent>
            <DialogContentText id="alert-dialog-description">
              { content }
            </DialogContentText>
          </DialogContent>
        : null
      }

      <DialogActions>
        <Button onClick={ handleClose } color="error">CANCEL</Button>
        <Button onClick={ btn.onSubmit } color={ btn.color ?? "primary" }>{ btn.name ?? "OK" }</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmModal;
