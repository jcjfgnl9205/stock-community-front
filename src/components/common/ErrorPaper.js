// Material-UI
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


const ErrorPaper = () => {

  return (
    <Paper sx={{ p: 4, display: 'flex', justifyContent: 'center'}}>
      <Typography variant="h5">ERROR</Typography>
    </Paper>
  );
}

export default ErrorPaper;
