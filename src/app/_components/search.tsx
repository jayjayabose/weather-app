import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <TextField
        id="search-term"
        variant="outlined"
        label="Search for a place..."
        helperText="Enter name or by lattitude longitude coordinates."
        margin="dense"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="search">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
