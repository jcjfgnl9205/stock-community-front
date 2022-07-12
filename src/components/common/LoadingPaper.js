// Material-UI
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';


const LoadingPaper = () => {

  return (
    <Paper sx={{ p: 4 }}>
      <Stack sx={{ color: 'grey.500', display: 'flex', justifyContent: 'center' }} spacing={2} direction="row">
        <CircularProgress color="primary" />
      </Stack>
    </Paper>
  );
}

export default LoadingPaper;
