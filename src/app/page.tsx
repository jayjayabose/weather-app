'use client';

import { useState, useEffect, useRef } from 'react';
import { CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import Search from './_components/search';
import Current from './_components/current';
import Daily from './_components/daily';
import {
  CurrentWeather,
  DailyWeather,
  FetchWeatherResult,
} from './_types/weather';
import { fetchWeather } from './_utils/services';

const DEFAULT_LOCATION = 'New York, NY, USA';

export default function App() {
  const [intialLoadSucceeded, setintialLoadSucceeded] = useState<
    boolean | null
  >(null);
  const [fetchWeatherResult, setFetchWeatherResult] =
    useState<FetchWeatherResult | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>(null);
  const [dailyWeather, setDailyWeather] = useState<DailyWeather[] | null>(null);
  const [tempUnits, setTempUnits] = useState<'imperial' | 'metric'>('imperial');
  const [location, setLocation] = useState<string | null>(null);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.target as HTMLFormElement;
    const searchTerm = (elements[0] as HTMLInputElement).value;

    const result = await fetchWeather(searchTerm);

    setFetchWeatherResult(result);
    if (result?.status === 200) {
      result.current && setCurrentWeather(result.current);
      result.daily && setDailyWeather(result.daily);
      setLocation(result.placeName);
    }
  };

  const handleToggleTempUnits = () => {
    if (tempUnits === 'imperial') {
      setTempUnits('metric');
    } else {
      setTempUnits('imperial');
    }
  };

  useEffect(() => {
    (async () => {
      const result = await fetchWeather(DEFAULT_LOCATION);

      if (result?.status === 200) {
        result.current && setCurrentWeather(result.current);
        result.daily && setDailyWeather(result.daily);
        setLocation(DEFAULT_LOCATION);
        setintialLoadSucceeded(true);
      } else {
        setintialLoadSucceeded(false);
      }
    })();
  }, []);

  return (
    <>
      <Search
        onSearch={handleSearch}
        onToggleTempUnits={handleToggleTempUnits}
        tempUnits={tempUnits}
        fetchWeatherResult={fetchWeatherResult}
      ></Search>
      {intialLoadSucceeded === null ? (
        <Box
          component="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={800}
        >
          <Box component="div" textAlign="center">
            <CircularProgress color="primary" variant="indeterminate" />
            <p>Just a minute...</p>
          </Box>
        </Box>
      ) : intialLoadSucceeded === true ? (
        <>
          <Current
            currentWeather={currentWeather}
            tempUnits={tempUnits}
            location={location}
          />
          <Daily dailyWeather={dailyWeather} tempUnits={tempUnits} />
        </>
      ) : (
        <Box
          component="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={800}
        >
          <Box component="div" textAlign="center">
            <p>We're having a problem getting weather data. </p>
            <p>Try again in a few moments, please.</p>
          </Box>
        </Box>        
      )}
    </>
  );
  //

  // if (intialLoadSucceeded === null) {
  //   return (
  //     <>
  // <Search
  //   onSearch={handleSearch}
  //   onToggleTempUnits={handleToggleTempUnits}
  //   tempUnits={tempUnits}
  //   fetchWeatherResult={fetchWeatherResult}
  // />
  // <Box
  //   component="div"
  //   display="flex"
  //   justifyContent="center"
  //   alignItems="center"
  //   height={800}
  // >
  //   <Box component="div" textAlign="center">
  //   <CircularProgress color="primary" variant="indeterminate" />
  //   <p>Just a minute...</p>
  //   </Box>
  // </Box>
  //     </>
  //   );
  // }

  // return (
  //   <>
  //     <Search
  //       onSearch={handleSearch}
  //       onToggleTempUnits={handleToggleTempUnits}
  //       tempUnits={tempUnits}
  //       fetchWeatherResult={fetchWeatherResult}
  //     />

  //     {intialLoadSucceeded === true ? ( // note: change this?
  // <>
  //   <Current
  //     currentWeather={currentWeather}
  //     tempUnits={tempUnits}
  //     location={location}
  //   />
  //   <Daily dailyWeather={dailyWeather} tempUnits={tempUnits} />
  // </>
  //     ) : (
  // <p>
  //   We had a problem retrieving weather data. Try your search in a few
  //   moments, please.
  // </p>
  //     )}
  //   </>
  // );
}
