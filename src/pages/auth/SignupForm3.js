import React, { useState } from 'react';

// Material-UI
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import AddressAlertModal from '../../components/modal/ConfirmModal';
import AddressListModal from '../../components/common/ListModal';

import * as Validation from '../../lib/Validation';
import * as AuthAPI from '../../lib/AuthAPI';
import * as config from '../../config';


const createAddressList = (address) => {
  return `${address.prefecture} ${address.city} ${address.town}`;
}

const AddressForm3 = (props) => {

  const [ errorMsg, setErrorMsg ] = useState('');
  const [ addressList, setAddressList ] = useState([]);
  const [ addressListModal, setAddressListModal ] = useState(false);
  const [ addressAlertModal, setAddressAlertModal ] = useState(false);

  // ListModalを閉じる
  const addressListModalClose = () => {
    setAddressListModal(false);
    setErrorMsg('');
  }

  // ErrorModalを閉じる
  const addressAlertModalClose = () => {
    setAddressAlertModal(false);
    setErrorMsg('');
  }

  //郵便番号で住所リストを取得、Modalを開く
  const getAddress = async () => {
    if (Validation.isZipcode(props.user.zipcode)) {
      setErrorMsg('');
      const address = await AuthAPI.addressApi(props.user.zipcode);
      if (address.response.error) {
        setAddressAlertModal(true);
        return;
      }

      const newAddressList = address.response.location?.map(address => {
        return createAddressList(address)
      })
      setAddressList(newAddressList);
      setAddressListModal(true);
    } else {
      setErrorMsg("7桁の数字を入力してください。");
      return;
    }
  }
  
  //住所を選択するとModalを閉じてinputタグに入れる
  const addressOnClick = e => {
    console.log(e.target.textContent)
    props.setUser({
      ...props.user,
      "address1": e.target.textContent
    })
    
    addressListModalClose();
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        User Info 2
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            label="Last Name"
            name="last_name"
            fullWidth
            variant="standard"
            value={ props.user.last_name }
            onChange={ props.onChange }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            type="text"
            label="First Name"
            name="first_name"
            fullWidth
            variant="standard"
            value={ props.user.first_name }
            onChange={ props.onChange }
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            type="text"
            label="zipcode"
            name="zipcode"
            variant="standard"
            value={ props.user.zipcode }
            onChange={ props.onChange }
            error={ errorMsg === "" ? false : true }
            helperText={ errorMsg }
          />
          <Button variant="outlined" color="secondary" onClick={ getAddress } >検索</Button>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            type="text"
            label="Address"
            name="address1"
            fullWidth
            variant="standard"
            value={ props.user.address1 }
            onChange={ props.onChange }
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            type="text"
            label="Address detail"
            name="address2"
            fullWidth
            variant="standard"
            value={ props.user.address2 }
            onChange={ props.onChange }
          />
        </Grid>
      </Grid>

      <AddressListModal 
        title="Address"
        open={ addressListModal }
        handleClose={ addressListModalClose }
        content={ addressList }
        addressOnClick={ addressOnClick }
      />

      <AddressAlertModal
        title={ config.MSG951 }
        open={ addressAlertModal }
        handleClose={ addressAlertModalClose }
      />
    </React.Fragment>
  );
}

export default React.memo(AddressForm3);
