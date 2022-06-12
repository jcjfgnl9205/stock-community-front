import React, { useState, useEffect } from 'react';

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

import * as Validation from '../../lib/Validation';
import * as config from '../../config';


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

const CustomDialogContent = ({ fields, onChange, data }) => {
  return (
    fields?.map((field, index) => {
      return (
        <TextField
          key={ index }
          autoFocus={ index === 0 ? true : false }
          name={ field.name }
          label={ field.label }
          fullWidth
          multiline={ field.rows === undefined ? true : true }
          value={ data[field.name] }
          rows={ field?.rows }
          sx={{ marginBottom: 2 }}
          onChange={ onChange }
        />
      )
    })
  )
}

const UpdateModal = (props) => {
  const [ data, setData ] = useState(props?.defaultData);
  const [ errorMsg, setErrorMsg ] = useState('');
  
  useEffect(() => {
    setData(props?.defaultData);
    setErrorMsg('');
  }, [props.defaultData])

  const onChange = e => {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value
    });
    setErrorMsg('');
  }
  
  const onSubmit = e => {
    e.preventDefault();
    for (const [ key, value ] of Object.entries(data)) {
      if (Validation.isNull(value)) {
        setErrorMsg(config.MSG801(key));
        return;
      }
    }
    setErrorMsg('');
    setData('')
    props.onSubmit.onSubmit(data);
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <CustomDialogTitle id="customized-dialog-title" onClose={props.handleClose} sx={{ minWidth: 600 }}>
          { props?.modalTitle }
        </CustomDialogTitle>
        <Box component="form" onSubmit={ onSubmit }>
          <DialogContent>
            <CustomDialogContent fields={ props.modalTextField } onChange={ onChange } data={ data }/>
          </DialogContent>

          {/* Notice Create Failed */}
          {
            errorMsg !== ''
            ? <DialogContent>
                <Stack sx={{ width: '100%' }} >
                  <Alert severity="error">{ errorMsg }</Alert>
                </Stack>
              </DialogContent>
            : null
          }

          <DialogActions>
            <Button type="button" onClick={props.handleClose} color="error">CANCEL</Button>
            <Button type="submit" color={props.onSubmit?.color}>{props.onSubmit?.btnName}</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default React.memo(UpdateModal);
