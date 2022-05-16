
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import Main from '../../components/board/Main';
import Sidebar from '../../components/board/Sidebar';
import Comments from '../../components/board/Comments';
import UpdateForm from '../../components/board/CreateForm';
import DeleteConfirm from '../../components/common/Modal1';

import { UserContext } from '../../context/UserContext';
import * as NoticeAPI from '../../lib/NoticeAPI';


const Notice = () => {
  const path = useLocation(); // 現在path
  const { token, user, loginModalOpen } = useContext(UserContext);
  const { update_notice } = NoticeAPI;

  const [ notice, setNotice ] = useState({});
  const [ deleteModal, setDeleteModal ] = useState(false);
  const [ updateFormModal, setUpdateFormModal ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState('');

  useEffect(() => {
    // Notice Detail取得
    const get_notice = async () => {
      const response = await NoticeAPI.get_notice(path.pathname);
      if (response.status === 200) {
        const data = await response.json();
        setNotice(data);
      } else {
        console.log("error")
      }
    }
    get_notice();
  }, [path])

  // 掲示板更新Modalを閉じる
  const updateFormModalClose = () => {
    setUpdateFormModal(false);
    setErrorMsg('');
  };

  // 掲示板作成者とログインユーザーが一致するか
  const writerIsLoginUser = () => {
    return token && user && user.id === notice.writer_id ? true : false;
  }

  // Notice Update処理
  const onSubmitUpdate = async notice => {
    // 掲示板更新
    const response = await update_notice(path.pathname, token, notice, user.id);
    const data = await response.json();
    if (response.status === 200) {
      setErrorMsg('');
      updateFormModalClose();
      setNotice(data);
    } else {
      setErrorMsg(data.detail);
    }
  }

  const onSubmitDelete = () => {
    console.log("delete")
  }
  const post = { 
    title : "Title1",
    content : "Content",
    writer: "admin1234",
    created_at: "2020-01-02 08:88",
    views: "22",
    likes: "33",
    comments: "3"
  }

  return (
    <Container maxWidth="lg" >

      <main>
      {
        writerIsLoginUser()
        ? <>
            <Button type="button" variant="outlined" sx={{ mb: -10, mr: 1}} size="small" onClick={ () => { writerIsLoginUser() ? setUpdateFormModal(true) : loginModalOpen() } }>UPDATE</Button>
            <Button type="button" variant="outlined" sx={{ mb: -10}} color="error" size="small" onClick={ () => { writerIsLoginUser() ? setDeleteModal(true) : loginModalOpen() } }>DELETE</Button>
          </>
        : null
      }
      
        <Grid container spacing={5} sx={{ mt: 1, pb: 4 }}>
        
          <Main notice={ notice } />

          <Sidebar/>

          <Comments post={ post } />
          
        </Grid>
      </main>

      <DeleteConfirm
        title="Are you sure you want to delete this post?"
        open={ deleteModal }
        handleClose={ () => setDeleteModal(false) }
        onSubmit={{
          btnName: "DELETE",
          color: "error",
          onSubmit: onSubmitDelete
        }}
      />

      <UpdateForm 
        label="NOTICE UPDATE"
        open={ updateFormModal }
        handleClose={ updateFormModalClose }
        onSubmit={ onSubmitUpdate }
        errorMsg={ errorMsg }
        setErrorMsg={ setErrorMsg }
        token={ token }
        data={ notice }
        btnName="UPDATE"
      />
    </Container>
  );
}

export default React.memo(Notice);
