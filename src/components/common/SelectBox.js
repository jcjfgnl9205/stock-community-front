// Material-UI
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const SelectBox = ({ label, value, handleChange, item }) => {
  return (
    <Box sx={{ maxWidth: 200 }}>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="demo-simple-select-label">{ label }</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={ value }
          label="Age"
          onChange={ handleChange }
          size="small"
        >
          {
            item.map(v => {
              return <MenuItem key={ v } value={ v }>{v}</MenuItem>
            })
          }
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectBox;
