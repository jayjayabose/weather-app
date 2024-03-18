'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';

import { FetchWeatherResult } from '../_types/weather';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

interface GoogleAutocompleteService {
  getPlacePredictions: (
    request: { input: string; types?: string[] },
    callback: (results?: readonly PlaceType[]) => void
  ) => void;
}

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', ''); // note: still getting a warning: JavaScript API has been loaded directly without loading=async.
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}

interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}

interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

type SearchBarProps = {
  fetchWeatherResult: FetchWeatherResult | null;
};

// note: pull this out to config
const fetchResponseCodeMsg = {
  200: 'Enter name or lattitude and longitude in decimal degrees (e.g 41.403, 2.174)',
  404: 'No matches found for your search.',
  500: 'We had a problem. Try again, please.',
};

export default function SearchBar({ fetchWeatherResult }: SearchBarProps) {
  const [value, setValue] = useState<PlaceType | null | ''>(null);
  const [inputValue, setInputValue] = useState('');
  const [helperText, sethelperText] = useState(fetchResponseCodeMsg[200]);
  const [helperTextProps, sethelperTextProps] = useState({});
  const [options, setOptions] = useState<readonly PlaceType[]>([]);
  const loaded = useRef(false);
  const autocompleteService = useRef<GoogleAutocompleteService | null>(null); 

  useEffect(() => {
    const getHelperText = () => {
      if (fetchWeatherResult === null) {
        return fetchResponseCodeMsg[200];
      } else {
        return fetchResponseCodeMsg[fetchWeatherResult.status as keyof typeof fetchResponseCodeMsg];
      }
    };

    // reset text field after successful fetch 
    if (fetchWeatherResult?.status === 200) {
      setValue(() => '');
      setInputValue(() => '');
    }

    const newHelperText = getHelperText();
    const newHelperTextProps = (!fetchWeatherResult || fetchWeatherResult.status === 200) ? {} : { color: 'red' };
    
    sethelperText(newHelperText);
    sethelperTextProps(newHelperTextProps);
  }, [fetchWeatherResult]);


  useEffect(() => {
    if (typeof window !== 'undefined' && !loaded.current) {
      console.log('loading google maps');
      if (!document.querySelector('#google-maps')) {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
          document.querySelector('head'),
          'google-maps'
        );
      }
      loaded.current = true;
    }
  }, [GOOGLE_MAPS_API_KEY])

  // rate limit calls to autocomplete service
  const fetch = useMemo(
    () =>
      debounce(
        (
          request: { input: string; types: string[] },
          callback: (results?: readonly PlaceType[]) => void
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            { ...request, types: ['(cities)'] },
            callback
          );
        },
        400
      ),
    []
  );

  useEffect(() => {
    let active = true;

    // load autocomplete service
    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }

    if (!autocompleteService.current) {
      return undefined;
    }

    // if nothing is typed in text box, dondo not query for options
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    // get autocomplete results
    fetch(
      {
        input: inputValue,
        types: [],
      },
      (results?: readonly PlaceType[]) => {
        if (active) {
          let newOptions: readonly PlaceType[] = [];

          if (value) {
            newOptions = [value];
          }

          if (results) {
            newOptions = [...newOptions, ...results];
          }

          setOptions(newOptions);
        }
      }
    );
    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);
  
  return (
    <Autocomplete
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      // autoHighlight
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No locations"
      popupIcon={null}
      freeSolo

      //@ts-ignore
      // invoked when user selects an option
      onChange={(event: any, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}

      // invoked when user types in the input
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          FormHelperTextProps={{ 
            sx: helperTextProps
          }}
          name="search-term"
          label="Search for a place..."
          helperText={helperText}
          fullWidth
        />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ])
        );

        
        const { key, ...rest } = props as { key: string };

        return (
          <li key={key} {...rest}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid
                item
                sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
              >
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
