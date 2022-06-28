// Material-UI
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import * as config from '../../config';

const DashBoardA = ({ datas, onClick }) => {

  // 表示する１つのデータ
  const viewData = datas?.filter(data => data.flg)[0];

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 240,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <Box sx={{ my: 3, mx: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4" component="div">{ viewData?.name ?? "準備中" }</Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h6" component="div">{ viewData?.price ?? "" }</Typography>
              <Typography variant="body2" component="div" color={ parseFloat(viewData?.daysRange) < 0 ? config.NEGATIVE_INT : config.POSITIVE_INT }>{ viewData?.daysRange ?? "" } { viewData?.daysRangePer ?? "" }</Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider variant="middle" />

        <Box sx={{ m: 2, mt: 4 }}>
          <Stack direction="row" spacing={1}>
            { 
              datas?.map( data => (
                <Chip key={ data.key } label={ data.name } color={ data.flg ? "primary" : "default" } onClick={ () => onClick(data.key) } />
              ))
            }
          </Stack>
        </Box>
      </Box>
    </Paper>
  );
}

export default DashBoardA;
