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

export default function Search({
  onSearch,
  onToggleTempUnits,
  fetchWeatherResult,
}: SearchProps) {
  let [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <Box component="section">
      <Stack spacing={1} direction="row" alignItems="flex-start">
        <form onSubmit={onSearch} style={{ flex: 1, display: 'flex' }}>
          <Box flex={24}>
            <SearchBar fetchWeatherResult={fetchWeatherResult} />
          </Box>
          <Box>
            <IconButton aria-label="search" type="submit">
              <SearchIcon fontSize="large" />
            </IconButton>
          </Box>
        </form>
        <Box>
          <IconButton onClick={onToggleTempUnits}>
            <MoreVertIcon fontSize="large" />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
}
