import React, { useState, useContext } from 'react';

// Material-UI
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { deepPurple, blue, grey, red } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

// usercontext
import { UserContext } from '../../context/UserContext';

// components
import CommentDeleteConfirm from '../modal/ConfirmModal';
import CommentUpdateConfirm from '../common/UpdateModal';
import Pagination from '../common/Paginationc';

// config, lib
import * as Validation from '../../lib/Validation';
import * as NoticeAPI from '../../lib/NoticeAPI';
import * as config from '../../config';


const Comments = (props) => {

  const { loginModalOpen } = useContext(UserContext);
  const [ deleteModal, setDeleteModal ] = useState(false); // comment削除するmodal state
  const [ editModal, setEditModal ] = useState(false); // comment更新するmodal state

  const [ comment, setComment ] = useState({"comment": ""});
  const [ currentCommentId, setCurrentCommentId ] = useState(0);
  const [ commentCurrentPage, setCommentCurrentPage ] = useState(1);
  const [ errorMsg, setErrorMsg ] = useState('');

  const onChange = e => {
    const { value, name } = e.target;
    setComment({
      ...comment,
      [name]: value
    });
  }

  // コメント作成
  const onSubmit = e => { 
    e.preventDefault();
    if (Validation.isNull(comment.comment)) {
      setErrorMsg(config.MSG503);
      return;
    }
    e.target.comment.value = '';
    setComment({"comment": ""});
    setCommentCurrentPage(1);
    props.onSubmit(comment);
  }

  // 掲示板更新Modalを閉じる
  const closeEditButtonClick = () => {
    setEditModal(prev => !prev);
    setErrorMsg('');
  };

  // コメント修正ボタン（コメント修正フォームを表示する）
  const onEditButtonClick = (comment_id, data) => { 
    setCurrentCommentId(comment_id);
    setComment(data)
    setEditModal(prev => !prev);
  }

  // コメントを修正する
  const onSubmitCommentEdit = async (comment) => {
    const response = await NoticeAPI.update_notice_comment(props.pathname, props.token, currentCommentId, comment);
    const data = await response.json();
    if (response.status === 200) {
      props.setCommentData(data);
      setEditModal(prev => !prev);
    } else {
      setErrorMsg(data.detail);
    }
  }

  // コメント削除ボタン（コメント削除Modalを開く）
  const onDeletebuttonClick = (comment_id) => {
    setCurrentCommentId(comment_id);
    setDeleteModal(prev => !prev);
  }

  // コメントを削除する
  const onSubmitCommentDelete = async () => {
    const response = await NoticeAPI.delete_notice_comment(props.pathname, props.token, currentCommentId);
    const data = await response.json();
    if (response.status === 200) {
      props.setCommentData(data);
      setDeleteModal(prev => !prev);
    } else {
      setErrorMsg(data.detail);
    }
  }

  return (
    <Paper sx={{ p: 4, }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Typography variant="h5" gutterBottom>Comments</Typography>
        <Typography variant="body2" color={deepPurple[600]}>total { props.commentCnt }</Typography>
      </Box>

      <Divider />

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

        { props.comments?.length === 0
          ? <Box>
              <Typography variant="h6" align="center">No comments</Typography>
            </Box>
          : props.comments[commentCurrentPage - 1]?.map((comment, i) => {
              return (
                <div key={ comment.id }>
                <ListItem alignItems="flex-start" >
                  <ListItemAvatar>
                    <Avatar alt={ comment.writer } src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            bgcolor: 'background.paper',
                            borderRadius: 1,
                            fontWeight: 'bold'
                          }}
                        >
                          <Typography variant="body" color={grey[900]}>{ comment.writer }</Typography>
                          {/* loginユーザーとコメント作成者が一致する場合、update, delete buttonを表示する */}
                          {
                            props.token && props.user?.username === comment.writer
                            ?
                            <Box sx={{ display: 'flex' }}>
                              <ModeEditOutlineOutlinedIcon sx={{ "&:hover": { color: blue[600] } }} onClick={ () => onEditButtonClick(comment.id, comment.comment) } />
                              <DeleteForeverOutlinedIcon type="submit" sx={{ "&:hover": { color: red[600] } }} onClick={ () => onDeletebuttonClick(comment.id) } />
                              <Typography variant="body2" color={grey[900]}>{ comment.date }</Typography>
                            </Box>
                            :null
                          }
                        </Box>
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {
                            comment.comment?.split("\n").map((data, key) => {
                              return <span key={ key }>{ data }<br/></span>
                            })
                          }
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                </div>
              );
          })
        }
      </List>

      <Divider />

      {/* <Pagination setCommentCurrentPage={ setCommentCurrentPage } total={ props.comments?.length }/> */}
      {
        props.comments?.length === 0
        ? null
        : <Pagination total={ props.comments?.length } setCommentCurrentPage={ setCommentCurrentPage } commentCurrentPage={ commentCurrentPage }/>
      }
      
      {/* 
        Loginしている場合：テキストエリアを表示する
        Loginしていない場合：Loginしてくださいの文言を表示、クリックするとログインmodalを表示する
      */}
      {
        props.token
        ? <Box component="form" onSubmit={ onSubmit }>
            <TextField
              id="outlined-multiline-static"
              label="comment"
              name="comment"
              multiline
              fullWidth
              rows={4}
              sx={{ mt: 2 }}
              onChange={ onChange }
            />
            <Button type="submit" variant="contained" sx={{ mt:1 }} >submit</Button>
          </Box>
        : <Box onClick={ loginModalOpen }>
            <Typography variant="h6" align="center" gutterBottom>Write comments</Typography>
            <Typography variant="body2" align="center" gutterBottom>Login required</Typography>
          </Box>
      }
      
      {/* エラーメッセージを表示する */}
      {
        errorMsg !== ''
        ? <Stack sx={{ width: '100%' }} >
            <Alert severity="error">{ errorMsg }</Alert>
          </Stack>
        : null
      }

      <CommentDeleteConfirm
        title="掲示板のコメントを削除します。"
        open={ deleteModal }
        handleClose={ () => setDeleteModal(false) }
        btn={{
          name: "DELETE",
          color: "primary",
          onSubmit: onSubmitCommentDelete
        }}
      />
      <CommentUpdateConfirm
        label="UPDATE"
        open={ editModal }
        handleClose={ closeEditButtonClick }
        textfield={{
          name: "comment",
          label: "COMMENT"
        }}
        onSubmit={{
          btnName: "UPDATE",
          color: "primary",
          onSubmit: onSubmitCommentEdit
        }}
        comment={ comment }
        errorMsg={ errorMsg }
        setErrorMsg={ setErrorMsg }
      />
    </Paper>
  );
}

export default React.memo(Comments);