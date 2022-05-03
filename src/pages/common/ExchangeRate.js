import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import * as config from '../../config';


const ExchangeRate = () => {

  const exchangeRates = ["USD JYP", "USD KRW"];

  const [ selectedExchangeRate, setSelectedExchangeRate ] = useState(exchangeRates[0]);

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <Box sx={{ my: 3, mx: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4" component="div">{ selectedExchangeRate }</Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div">1254.11</Typography>
            <Typography variant="body2" component="div" color={ config.NEGATIVE_INT }>-1.72 -0.13%</Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider variant="middle" />

      <Box sx={{ m: 2, mt: 4 }}>
      <Stack direction="row" spacing={1}>
          { 
            exchangeRates.map( exchangeRate => (
              <Chip key={ exchangeRate } label={ exchangeRate } color={ exchangeRate === selectedExchangeRate ? "primary" : "default" } onClick={ () => setSelectedExchangeRate(exchangeRate) } />
            ))
          }
        </Stack>
      </Box>
    </Box>
  );
}

export default React.memo(ExchangeRate);
