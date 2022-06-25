import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { UserContext } from '../../context/UserContext';
import * as NoticeAPI from '../../lib/NoticeAPI';
import * as config from '../../config';

import CreateForm from '../../components/board/CreateForm';
import BoardTable from '../../components/common/BoardTable';
import Pagination from '../../components/common/Pagination';
import SelectBox from '../../components/common/SelectBox';

//仮タイトル作成
const title = {
  '/stock/jp': '日本',
  '/stock/kr': '韓国',
  '/notices': 'お知らせ',
}

const rowPerPageSelect = [10, 20, 50];

const createData = (no, title, writer, like, _date, views, comment_cnt) => {
  const date = config.formatDate(_date);
  const _title = `${title} [${comment_cnt ?? 0}]`;
  return { no: no, title: _title, writer: writer, like: like, date: date, views: views };
}

const Notices = () => {
  const path = useLocation(); // 現在path
  const { token, loginModalOpen } = useContext(UserContext);
  const { create_notice } = NoticeAPI;

  const [ notices, setNotices ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ rowsPerPage, setRowsPerPage ] = useState(10);
  const [ createFormModal, setCreateFormModal ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState('');

  useEffect(() => {
    // Notice List取得
    const notices = async () => {
      const response = await NoticeAPI.get_notices(path.pathname);
      if (response.status === 200) {
        const data = await response.json();
        const newData = data.items?.map(notice => {
          return createData(notice.id, notice.title, notice.writer, notice.like_cnt, notice.created_at, notice.views, notice.notice_comment_cnt)
        });
        setNotices(newData)
      } else {
        console.log("error")
      }
    }
    notices();
    setPage(1);
  }, [path, createFormModal, setPage])

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);
  };

  // 掲示板投稿Modalを閉じる
  const createFormModalClose = () => {
    setCreateFormModal(false);
    setErrorMsg('');
  };

  // 掲示板投稿する
  const onSubmitCreate = async notice => {
    // 掲示板登録
    const response = await create_notice(path.pathname, token, notice);
    if (response.status === 200) {
      setErrorMsg('');
      createFormModalClose();
    } else {
      const data = await response.json();
      setErrorMsg(data.detail);
    }
  }

  return (
    <Container component="main">

      <Typography component="h1" gutterBottom variant="h4" sx={{ marginTop: 10 }}>{ title[path.pathname] }</Typography>

      <Button 
        type="button"
        variant="outlined"
        sx={{ mb: 1 }}
        size="small"
        onClick={ () => ( token ? setCreateFormModal(prev => !prev) : loginModalOpen() ) }
      >
        CREATE
      </Button>

      <SelectBox
        label={ 'rowPerPage' }
        value={ rowsPerPage }
        handleChange={ handleChangeRowsPerPage }
        item={ rowPerPageSelect }
      />

      <BoardTable
        data={ notices }
        page={ page }
        rowsPerPage={ rowsPerPage }
      />
      <Pagination
        total={ notices.length }
        page={ page }
        setPage={ setPage }
        rowsPerPage={ rowsPerPage }
      />

      <CreateForm
        label="NOTICE CREATE"
        open={ createFormModal }
        handleClose={ createFormModalClose }
        onSubmit={{
          btnName: "CREATE",
          color: "primary",
          onSubmit: onSubmitCreate
        }}
        errorMsg={ errorMsg }
        setErrorMsg={ setErrorMsg }
        token={ token }
      />

    </Container>
  );
}

export default React.memo(Notices);
