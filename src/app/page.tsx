/*

current weather condistions
  date time
  high / low
  temperature
  humidity
  
  brief description (e.g., “Clear sky,” “Rainy”).
  wind speed
 
5-day forecast 
each day
minimum temp
maximum temp
weather description
*/

// import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import ProTip from '@/components/ProTip';
import Copyright from '@/components/Copyright';

// my imports
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { InputAdornment } from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


import Image from 'next/image';

export default function Experiment() {
  return (
    <Container maxWidth="md">
      {/* Search Bar */}
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


    </Container>
  );
}