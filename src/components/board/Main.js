import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import * as config from '../../config';

const Main = ({ notice }) => {

  const renderContent = () => { return {__html: notice.content} };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        {notice.title}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {notice.writer}　・　
        {config.formatDate(notice.created_at)}　・　
        Views:{notice.views}　・　
        Likes:{notice.like_cnt}　・　
        Comments:{notice.notice_comment_cnt}
      </Typography>

      <Divider />

      <Box sx={{ width: '100%', minHeight: 460, mt: 4 }}>
        <span dangerouslySetInnerHTML={renderContent()}></span>
      </Box>
    </Paper>
  );
}

export default React.memo(Main);