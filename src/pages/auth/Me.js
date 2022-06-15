import React, { useState } from 'react';

// Material-UI
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import Drawer from '../../components/common/Drawer';

import PasswordUpdate from '../../components/auth/PasswordUpdate';
import UserInfo from './MeUserInfo';

const menuList = [
  {'title': 'MyInfo', 'icon': <PersonIcon />},
  {'title': 'PasswordUpdate', 'icon': <LockOpenIcon />}
];


const getViewPage = (title) => {
  switch (title) {
    case 'MyInfo':
      return <UserInfo />;
    case 'PasswordUpdate':
      return <PasswordUpdate />;
    default:
      throw new Error('Unknown step');
  }
}

const Me = () => {

  const [ currentPage, setCurrentPage ] = useState(menuList[0].title)

  return (
    <React.Fragment>
      <Drawer list={ menuList } view={ getViewPage(currentPage) } setCurrentPage={ setCurrentPage } />
    </React.Fragment>
  );
}

export default React.memo(Me);
