import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchBar from './SearchBar';
import { FetchWeatherResult } from '../_types/weather';

type SearchProps = {
  onSearch: (event: Event) => Promise<void>;
  onToggleTempUnits: () => void;
  fetchWeatherResult: FetchWeatherResult;
};

export default function Search({ onSearch, onToggleTempUnits, fetchWeatherResult }: SearchProps) {
  let [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <Box component="section">
      <Box component="div" id="search-form" sx={{ display: 'flex', alignItems: 'center' }}>
        <form onSubmit={onSearch} style={{ flex: 1, display: 'flex'}}>
          <SearchBar fetchWeatherResult={fetchWeatherResult}/>
          <IconButton aria-label="search" type="submit" >
            <SearchIcon />
          </IconButton>
        </form>
        <IconButton onClick={onToggleTempUnits} >
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
