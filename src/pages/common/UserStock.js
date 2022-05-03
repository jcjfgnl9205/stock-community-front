import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import * as config from '../../config';


const UserStock = () => {

  const userStocks = ["APPL", "TSLA", "MSFT"];

  const [ selectedUserStock, setSelectedUserStock ] = useState(userStocks[0]);

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Box sx={{ my: 3, mx: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4" component="div">{ selectedUserStock }</Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div">157.96</Typography>
            <Typography variant="body2" component="div" color={ config.POSITIVE_INT }>+0.31 +0.20%</Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider variant="middle" />

      <Box sx={{ m: 2, mt: 4 }}>
      <Stack direction="row" spacing={1}>
          { 
            userStocks.map( userStock => (
              <Chip key={ userStock } label={ userStock } color={ userStock === selectedUserStock ? "primary" : "default" } onClick={ () => setSelectedUserStock(userStock) } />
            ))
          }
        </Stack>
      </Box>
    </Box>
  );
}

export default React.memo(UserStock);
