import React from 'react';

// Material-UI
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const PaginationComponent = (props) => {

  const onChange = (e, page) => {
    props.setCommentCurrentPage(page);
  }

  return (
    <Stack direction="row" spacing={2} sx={{ pt:2, justifyContent: 'center' }}>
      <Pagination page={props.commentCurrentPage} count={props.total} showFirstButton showLastButton color="primary" onChange={ onChange } />
    </Stack>
  );
}

export default React.memo(PaginationComponent);
