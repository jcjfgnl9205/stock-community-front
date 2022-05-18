import React, { useContext } from 'react';
import { useLocation } from "react-router-dom";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

import { UserContext } from '../../context/UserContext';
import * as NoticeAPI from '../../lib/NoticeAPI';

const LikeHate = ( props ) => {
  const path = useLocation(); // 現在path

  // Loginしていない場合、Login Modalを開く
  const { token, user, loginModalOpen } = useContext(UserContext);

  const onSubmit = async cmd => {
    let vote = {};
    vote[cmd] = !props.voteState[cmd]
    const response = await NoticeAPI.update_vote(path.pathname, token, vote);
    if (response.status === 200) {
      const data = await response.json();
      // LoginしているユーザーのLike, Hate　Button State
      const userVoteState = data?.filter( vote => vote.user_id === user?.id);
      props.setVoteState({ "like": userVoteState[0]?.["like"], "hate": userVoteState[0]?.["hate"] });

      // Like, Hate Button count
      const likeCnt = data?.filter( vote => vote.like ).length;
      const hateCnt = data?.filter( vote => vote.hate ).length;
      props.setVoteCnt({ "like": likeCnt, "hate": hateCnt });
    } else {
      console.log("error")
    }
  }

  return (
    <Paper sx={{ p: 4, mb: 4 }}>
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
        <Button type="button" variant={ token && props.voteState.like ? "contained" : "outlined" } size="large" color="error" startIcon={<ThumbUpIcon />} onClick={ token ? () => onSubmit("like") : loginModalOpen } >{ props.voteCnt.like }</Button>
        <Button type="button" variant={ token && props.voteState.hate ? "contained" : "outlined" } size="large" color="info" startIcon={<ThumbDownAltIcon />} onClick={ token ? () => onSubmit("hate") : loginModalOpen } >{ props.voteCnt.hate }</Button>
      </Stack>
    </Paper>
  );
}

export default React.memo(LikeHate);