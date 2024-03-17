import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import SearchBar from './SearchBar';
import PreferencesButton from './preferencesButton';
import { FetchWeatherResult } from '../_types/weather';

type SearchProps = {
  onSearch: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  onToggleTempUnits: () => void;
  tempUnits: string;
  fetchWeatherResult: FetchWeatherResult | null;
};

function Search({
  onSearch,
  onToggleTempUnits,
  tempUnits,
  fetchWeatherResult,
}: SearchProps) {

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
          <PreferencesButton onToggleTempUnits={onToggleTempUnits} tempUnits={tempUnits}/>
        </Box>
      </Stack>
    </Box>
  );
}

export default Search;