import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';


const Main = ({ post }) => {

  return (
    <Grid
      item
      xs={12}
      md={8}
    >
      <Paper sx={{ p: 4, }}>
        <Typography variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {post.writer}　・　
          {post.created_at}　・　
          Views:{post.views}　・　
          Likes:{post.likes}　・　
          Comments:{post.comments}
        </Typography>

        <Divider />

        <Box sx={{ width: '100%', minHeight: 460, mt: 4 }}>
          {post.content}
        </Box>

        <Stack direction="row" spacing={2} sx={{ mb: 6, justifyContent: 'center' }}>
          <Button variant="outlined" size="large" color="error" startIcon={<ThumbUpIcon />}>0</Button>
          <Button variant="outlined" size="large" color="info" startIcon={<ThumbDownAltIcon />}>0</Button>
        </Stack>
      </Paper>
    </Grid>
  );
}

export default React.memo(Main);