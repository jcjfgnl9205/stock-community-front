
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import Main from './Main';
import Sidebar from './Sidebar';
import Comments from './Comments';
import Modal1 from '../../components/common/Modal1';

const Notice = () => {

  const [ deleteModal, setDeleteModal ] = useState(false);
  
  const deleteModalOpen = () => {
    setDeleteModal(true);
  };
  const deleteModalClose = () => {
    setDeleteModal(false);
  };

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
      <Button type="button" variant="outlined" sx={{ mb: -10, mr: 1}} size="small" >UPDATE</Button>
      <Button type="button" variant="outlined" sx={{ mb: -10}} color="error" size="small" onClick={ deleteModalOpen }>DELETE</Button>
        <Grid container spacing={5} sx={{ mt: 1, pb: 4 }}>
        
          <Main post={ post } />

          <Sidebar/>

          <Comments post={ post } />
          
        </Grid>
      </main>

      <Modal1
        title="Are you sure you want to delete this post?"
        open={ deleteModal }
        handleClose={ deleteModalClose }
        onSubmit={{
          btnName: "DELETE",
          color: "error",
          onSubmit: onSubmitDelete
        }}
      />
    </Container>
  );
}

export default React.memo(Notice);
