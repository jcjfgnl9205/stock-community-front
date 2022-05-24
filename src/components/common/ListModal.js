import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const ContentList = ({data, onClick}) => {
  return (
    <List>
      {
        data?.map((data, index) => {
          return (
            <React.Fragment key={ index }>
              <ListItem disablePadding >
                <ListItemButton onClick={ onClick }>
                  <Typography variant="subtitle1" component="span">{ data }</Typography>
                </ListItemButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          )
        })
      }
    </List>
  )
}

const ListModal = (props) => {
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
              <ContentList data={ props.content } onClick={ props.addressOnClick }/>
            </DialogContentText>
          </DialogContent>
        : null
      }
      <DialogActions>
        <Button onClick={props.handleClose} color="inherit">CANCEL</Button>
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(ListModal);
