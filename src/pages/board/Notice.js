
import React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import Main from './Main';
import Sidebar from './Sidebar';
import Comments from './Comments';


const Notice = () => {

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
        <Grid container spacing={5} sx={{ mt: 4, pb:4 }}>

          <Main post={ post } />

          <Sidebar/>

          <Comments post={ post } />
          
        </Grid>
      </main>
    </Container>
  );
}

export default React.memo(Notice);
