import { Link as RouterLink } from "react-router-dom";

// Material-UI
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


const MainList = ({ title, path, data }) => {
  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="span">{ title ?? "News" }</Typography>
          <Link to={ path ?? "#" } component={ RouterLink } variant="body2">More</Link>
        </Box>
        <List>
          {
            data?.map((data, index, row) => (
              <Box key={ data.id }>
                <ListItem disablePadding>
                  <ListItemButton>
                    <Link to={ `${path}/${data.id}` } component={ RouterLink } underline="hover" color="inherit">{ data.title }</Link>
                  </ListItemButton>
                </ListItem>
                {
                  index + 1 !== row.length
                  ? <Divider />
                  : null
                }
              </Box>
            ))
          }
        </List>
      </Box>
    </Paper>
  );
}

export default MainList;
