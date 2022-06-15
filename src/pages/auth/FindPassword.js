import React, { useState } from 'react';

// Material-UI
import Container from '@mui/material/Container';

import PasswordForgot from '../../components/auth/PasswordForgot';
import PasswordUpdate from '../../components/auth/PasswordUpdate';


const getViewPage = (flg, setFlg) => {
  return flg ? <PasswordUpdate /> : <PasswordForgot setFlg={ setFlg }/>;
}

const FindPassword = (props) => {
  const [ flg, setFlg ] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      { getViewPage(flg, setFlg) }
    </Container>
  );
}

export default React.memo(FindPassword);
