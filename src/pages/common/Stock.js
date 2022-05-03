import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import * as config from '../../config';


const Stock = () => {

  const stocks = ["KOSPI", "Nikkei", "S&P 500", "NASDAQ"];

  const [ selectedStock, setselectedStock ] = useState(stocks[0]);

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Box sx={{ my: 3, mx: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4" component="div">{ selectedStock }</Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div">2687.45</Typography>
            <Typography variant="body2" component="div" color={ config.NEGATIVE_INT }>-7.60 -0.28%</Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider variant="middle" />

      <Box sx={{ m: 2, mt: 4 }}>
        <Stack direction="row" spacing={1}>
          { 
            stocks.map( stock => (
                <Chip key={ stock } label={ stock } color={ stock === selectedStock ? "primary" : "default" } onClick={ () => setselectedStock(stock) } />
            ))
          }
        </Stack>
      </Box>
    </Box>
  );
}

export default React.memo(Stock);
