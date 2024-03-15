'use client';

import { useState } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

import Search from './_components/search';
import Current from './_components/current';
import Daily from './_components/daily';
import {
  CurrentWeather,
  DailyWeather,
  FetchWeatherResult,
} from './_types/weather';
import { fetchWeather } from './_utils/services';

export default function App() {
  console.log('app appId render');
  let [fetchWeatherResult, setFetchWeatherResult] =
    useState<FetchWeatherResult | null>(null);
  let [currentWeather, setCurrentWeather] = useState<CurrentWeather>(null);
  let [dailyWeather, setDailyWeather] = useState<DailyWeather[] | null>(null);
  let [tempUnits, setTempUnits] = useState<'imperial' | 'metric'>('imperial');
  let weatherDataLoaded = currentWeather && dailyWeather;

const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = (event.target as HTMLFormElement);
    const searchTerm = (elements[0] as HTMLInputElement).value;

    let result = await fetchWeather(searchTerm);
    setFetchWeatherResult(result);
    if (result?.status === 200) {
      result.current && setCurrentWeather(result.current);
      result.daily && setDailyWeather(result.daily);
    } else {
      // note: handle error. give the user an indication that the fetch faield
      console.log(
        'app handleSearch - show message to user',
        result.status,
        result.message
      );
    }
  };

  const handleToggleTempUnits = () => {
    console.log('app handleToggleTempUnits', tempUnits);
    if (tempUnits === 'imperial') {
      setTempUnits('metric');
    } else {
      setTempUnits('imperial');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={15} sx={{ p: 1 }}>
        <Stack>
          <Search
            onSearch={handleSearch}
            onToggleTempUnits={handleToggleTempUnits}
            fetchWeatherResult={fetchWeatherResult}
          />

          {weatherDataLoaded ? (
            <>
              <Current currentWeather={currentWeather} tempUnits={tempUnits} />
              <Daily dailyWeather={dailyWeather} tempUnits={tempUnits} />
            </>
          ) : (
            <div>Initial State: going to load a default location.</div>
          )}
          {/* note: type warning above */}
        </Stack>
      </Paper>
    </Container>
  );
}
