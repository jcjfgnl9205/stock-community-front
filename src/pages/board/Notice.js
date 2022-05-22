
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import Main from '../../components/board/Main';
import Sidebar from '../../components/board/Sidebar';
import LikeHate from '../../components/board/LikeHate';
import Comments from '../../components/board/Comments';
import UpdateForm from '../../components/board/CreateForm';
import DeleteConfirm from '../../components/common/ConfirmModal';

import { UserContext } from '../../context/UserContext';
import * as NoticeAPI from '../../lib/NoticeAPI';
import * as config from '../../config';

const createCommentData = (id, comment, writer, _date) => {
  const date = config.formatDate(_date);
  return { id, comment, writer, date };
}

const Notice = () => {
  const path = useLocation(); // 現在path
  const navigate = useNavigate();
  const { token, user, loginModalOpen } = useContext(UserContext);
  const { update_notice, delete_notice } = NoticeAPI;

  const [ notice, setNotice ] = useState({});
  const [ voteState, setVoteState ] = useState({ "like": false, "hate": false })
  const [ voteCnt, setVoteCnt ] = useState({"like": 0, "hate": 0});

  const [ comments, setComments ] = useState([]);
  const [ commentCnt, setCommentCnt ] = useState(0);
  const [ paginationPage ] = useState(5);//一つのページに表示するcomment数

  const [ deleteModal, setDeleteModal ] = useState(false);
  const [ updateFormModal, setUpdateFormModal ] = useState(false);
  const [ errorMsg, setErrorMsg ] = useState('');


  // commentをsetする
  const setCommentData = useCallback((data) => {
    setCommentCnt(data.total);
    const newData = data.items?.map(comment => {
      return createCommentData(comment.id, comment.comment, comment.writer, comment.created_at);
    });
    setComments(config.division(newData, paginationPage));
  }, [paginationPage])

  useEffect(() => {
    // Notice Detail取得
    const get_notice = async () => {
      const response = await NoticeAPI.get_notice(path.pathname);
      if (response.status === 200) {
        const data = await response.json();
        setNotice(data);
      } else {
        navigate("/notices");
        console.log("error")
      }
    }
    get_notice();

    // Notice Like, Hate count取得
    const get_votes_function = async () => {
      const response = await NoticeAPI.get_votes(path.pathname);
      if (response.status === 200) {
        const data = await response.json();
        // LoginしているユーザーのLike, Hate　Button State
        const userVoteState = data?.filter( vote => vote.user_id === user?.id);
        setVoteState({ "like": userVoteState[0]?.["like"], "hate": userVoteState[0]?.["hate"] });

        // Like, Hate Button count
        const likeCnt = data?.filter( vote => vote.like ).length;
        const hateCnt = data?.filter( vote => vote.hate ).length;
        setVoteCnt({ "like": likeCnt, "hate": hateCnt });
      } else {
        console.log("error")
      }
    }
    get_votes_function();
  }, [path, navigate, user])

  useEffect(() => {
    // Notice Comments
    const get_notice_comments = async () => {
      const response = await NoticeAPI.get_notice_comments(path.pathname);
      if (response.status === 200) {
        const data = await response.json();
        setCommentData(data);
      } else {
        console.log("error");
      }
    }
    get_notice_comments();
  }, [path, setCommentData])

  // 掲示板更新Modalを閉じる
  const updateFormModalClose = () => {
    setUpdateFormModal(false);
    setErrorMsg('');
  };

  // 掲示板削除Modalを閉じる
  const deleteFormModalClose = () => {
    setDeleteModal(false);
    setErrorMsg('');
  }

  // 掲示板作成者とログインユーザーが一致するか
  const writerIsLoginUser = () => {
    return token && user.id === notice.writer_id ? true : false;
  }

  // Notice Update処理
  const onSubmitUpdate = async notice => {
    // 掲示板更新
    const response = await update_notice(path.pathname, token, notice);
    const data = await response.json();
    if (response.status === 200) {
      updateFormModalClose();
      setNotice(data);
    } else {
      setErrorMsg(data.detail);
    }
  }

  // Notice Delete処理
  const onSubmitDelete = async () => {
    // 掲示板削除
    const response = await delete_notice(path.pathname, token);
    const data = await response.json();
    if (response.status === 200) {
      deleteFormModalClose();
      navigate("/notices");
    } else {
      setErrorMsg(data.detail);
    }
  }

  // 掲示板のコメントを登録する
  const onSubmitCreateComment = async comment => {
    const response = await NoticeAPI.create_notice_comment(path.pathname, token, comment);
    const data = await response.json();
    if (response.status === 200) {
      setCommentData(data);
    } else {
      setErrorMsg(data.detail);
    }
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
          <Grid container item xs={12} md={8} direction="column">

            <Main notice={ notice } />
            <LikeHate
              voteCnt={ voteCnt }
              setVoteCnt={ setVoteCnt }
              voteState={ voteState }
              setVoteState={ setVoteState }
            />
            <Comments
              token={ token }
              user={ user }
              pathname={ path.pathname }
              comments={ comments } 
              commentCnt={ commentCnt }
              onSubmit={ onSubmitCreateComment }
              setCommentData={ setCommentData }
            />
          </Grid>

          <Sidebar/>
        </Grid>
      </main>

      <DeleteConfirm
        title="Are you sure you want to delete this post?"
        open={ deleteModal }
        handleClose={ deleteFormModalClose }
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
        onSubmit={{
          btnName: "UPDATE",
          color: "primary",
          onSubmit: onSubmitUpdate
        }}
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
