import React from 'react';

// Material-UI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';


const AddressForm1 = (props) => {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>Personal information</Typography>
      <Typography variant="subtitle1" gutterBottom>
        １. The standard Lorem Ipsum passage, used since the 1500s
      </Typography>
      <Paper variant="outlined" style={{maxHeight: 100, overflow: 'auto', }} sx={{ mb: 2 }} >
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      </Paper>

      <Typography variant="subtitle1" gutterBottom>
        2. 1914 translation by H. Rackham
      </Typography>
      <Paper variant="outlined" style={{maxHeight: 100, overflow: 'auto'}} sx={{ mb: 2 }}>
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
      </Paper>

      <Typography variant="subtitle1" gutterBottom>
        3. 1914 translation by H. Rackham
      </Typography>
      <Paper variant="outlined" style={{maxHeight: 100, overflow: 'auto'}} sx={{ mb: 2 }}>
      "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."
      </Paper>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox color="primary" name="agree" checked={ props.checked } onChange={ props.handleChange } inputProps={{ 'aria-label': 'controlled' }}/>}
          label="Consent for Use of Personal Information. Please read the terms below and click the I Agree button if you agree to them."
          onChange={ props.onChange }
        />
      </Grid>
    </React.Fragment>
  );
}

export default React.memo(AddressForm1);
