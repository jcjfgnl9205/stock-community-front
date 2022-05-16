import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

import { UserContext } from '../../context/UserContext';
import * as config from '../../config';

const Main = ({ notice }) => {

  const renderContent = () => { return {__html: notice.content} };

  // Loginしていない場合、Login Modalを開く
  const { loginModalOpen } = useContext(UserContext);

  return (
    <Grid item xs={12} md={8} >
      <Paper sx={{ p: 4, }}>
        <Typography variant="h5" gutterBottom>
          {notice.title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {notice.writer}　・　
          {config.formatDate(notice.created_at)}　・　
          Views:{notice.views}　・　
          Likes:{notice.like_cnt}　・　
          Comments:{notice.like_cnt}
        </Typography>

        <Divider />

        <Box sx={{ width: '100%', minHeight: 460, mt: 4 }}>
          <span dangerouslySetInnerHTML={renderContent()}></span>
        </Box>

        <Stack direction="row" spacing={2} sx={{ mb: 6, justifyContent: 'center' }}>
          <Button variant="outlined" size="large" color="error" startIcon={<ThumbUpIcon />} onClick={ loginModalOpen } >{ notice.like_cnt }</Button>
          <Button variant="outlined" size="large" color="info" startIcon={<ThumbDownAltIcon />} onClick={ loginModalOpen } >{ notice.hate_cnt }</Button>
        </Stack>
      </Paper>
    </Grid>
  );
}

export default React.memo(Main);