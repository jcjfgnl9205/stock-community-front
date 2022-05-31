import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";

// Material-UI
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import AddressErrorModal from '../../components/common/ConfirmModal';
import AddressListModal from '../../components/common/ListModal';

import { UserContext } from '../../context/UserContext';
import { get_user_api, update_user_api, addressApi } from '../../lib/AuthAPI';
import * as Validation from '../../lib/Validation';
import * as config from '../../config';


const userinfo = {
  username: "",
  email: "",
  zipcode: "",
  address1: "",
  address2: "",
  first_name: "",
  last_name: "",
  is_active: false,
  is_staff: false,
}

const createAddressList = (address) => {
  return `${address.prefecture} ${address.city} ${address.town}`;
}

const MeUserInfo = () => {

  const path = useLocation(); // 現在path
  const { token } = useContext(UserContext);

  const [ updateFlg, setUpdateFlg ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState('');

  const [ user, setUser ] = useState(userinfo);
  const [ updateUser, setUpdateUser ] = useState(userinfo);
  const [ addressList, setAddressList ] = useState([]);
  const [ addressListModal, setAddressListModal ] = useState(false);
  const [ addressErrorModal, setAddressErrorModal ] = useState(false);

  // ListModalを閉じる
  const addressListModalClose = () => {
    setAddressListModal(false);
    setErrorMsg('');
  }

  // ErrorModalを閉じる
  const addressErrorModalClose = () => {
    setAddressErrorModal(false);
    setErrorMsg('');
  }
  
  useEffect(() => {
    const get_user = async () => {
      const response = await get_user_api(path.pathname, token);
      if (response.status === 200) {
        const data = await response.json();
        setUser(data);
        setUpdateUser(data);
      }
    }
    get_user();
  }, [path, token]);

  const onChange = e => {
    const { value, name } = e.target;
    setUpdateUser({
      ...updateUser, //Inputをコビーする
      [name]: value
    });
  };

  //郵便番号で住所リストを取得、Modalを開く
  const getAddress = async () => {
    if (Validation.isZipcode(updateUser.zipcode)) {
      setErrorMsg('');
      const address = await addressApi(updateUser.zipcode);
      if (address.response.error) {
        setAddressErrorModal(true);
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
    setUpdateUser({
      ...updateUser,
      "address1": e.target.textContent
    })
    
    addressListModalClose();
  }

  const onSubmit = async e => {
    e.preventDefault();
    // 会員情報修正
    const response = await update_user_api(path.pathname, token, updateUser);
    const data = await response.json();
    if (response.status !== 200) {
      setErrorMsg(data.detail);
      return;
    }
    setUser(data);
    setUpdateUser(data);
    setErrorMsg('');
    setUpdateFlg(prev => !prev);
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Public profile
      </Typography>
      <Divider />

      <Box component="form" onSubmit={ onSubmit }>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <TextField 
              id="username"
              label="username"
              name="username"
              fullWidth
              variant="standard"
              value={ user.username }
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField 
              type="email"
              id="email"
              label="email"
              name="email"
              fullWidth
              variant="standard"
              value={ user.email }
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              label="Last Name"
              name="last_name"
              fullWidth
              variant="standard"
              value={ updateFlg ? updateUser.last_name : user.last_name }
              InputProps={{ readOnly: updateFlg ? false : true }}
              onChange={ onChange }
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              label="First Name"
              name="first_name"
              fullWidth
              variant="standard"
              value={ updateFlg ? updateUser.first_name : user.first_name }
              InputProps={{ readOnly: updateFlg ? false : true }}
              onChange={ onChange }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              type="text"
              label="zipcode"
              name="zipcode"
              variant="standard"
              value={ updateFlg ? updateUser.zipcode : user.zipcode }
              InputProps={{ readOnly: updateFlg ? false : true }}
              onChange={ onChange }
              error={ errorMsg === "" ? false : true }
              helperText={ errorMsg }
            />
            { updateFlg ? <Button type="button" variant="outlined" color="secondary" onClick={ getAddress } >検索</Button> : null}
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              type="text"
              label="Address"
              name="address1"
              fullWidth
              variant="standard"
              value={ updateFlg ? updateUser.address1 : user.address1 }
              InputProps={{ readOnly: updateFlg ? false : true }}
              onChange={ onChange }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              type="text"
              label="Address detail"
              name="address2"
              fullWidth
              variant="standard"
              value={ updateFlg ? updateUser.address2 : user.address2 }
              InputProps={{ readOnly: updateFlg ? false : true }}
              onChange={ onChange }
            />
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
          {
            updateFlg
            ? <React.Fragment>
                <Button type="button" variant="outlined" color="error" size="small" onClick={ () => { setUpdateFlg(prev => !prev); setUpdateUser(user); } } >CANCEL</Button>
                <Button type="submit" variant="outlined" color="primary" size="small" >U2PDATE</Button>
              </React.Fragment>
            : <Button type="button" variant="outlined" color="secondary" size="small" onClick={ () => setUpdateFlg(prev => !prev) } >UPDATE</Button>
          }
        </Stack>
      </Box>

      <AddressListModal 
        title="Address"
        open={ addressListModal }
        handleClose={ addressListModalClose }
        content={ addressList }
        addressOnClick={ addressOnClick }
      />

      <AddressErrorModal
        title={ config.MSG951 }
        open={ addressErrorModal }
        handleClose={ addressErrorModalClose }
      />
    </Container>
  );
}
  
export default React.memo(MeUserInfo);
