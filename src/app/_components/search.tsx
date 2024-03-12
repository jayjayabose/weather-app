import { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchBar from './SearchBar';

type SearchProps = {
  onSearch: (event: Event) => Promise<void>;
  onToggleTempUnits: () => void;
};

export default function Search({ onSearch, onToggleTempUnits }: SearchProps) {
  let [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <Box component="div" sx={{ display: 'flex', alignItems: 'center' }}>
        <form onSubmit={onSearch} style={{ flex: 1 }}>
          <SearchBar/>
          <IconButton aria-label="search" type="submit">
            <SearchIcon />
          </IconButton>
        </form>
        <IconButton onClick={onToggleTempUnits}>
          <MoreVertIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
