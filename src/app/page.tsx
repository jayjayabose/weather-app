'use client';

import { useState } from 'react';
import Container from '@mui/material/Container';
import Search from './_components/search';
import Current from './_components/current';
import Daily from './_components/daily';
import { CurrentWeather, DailyWeather, FetchWeatherResult } from './_types/weather';
import { fetchWeather } from './_utils/services';

export default function App() {
  console.log('app appId render');
  let [fetchWeatherResult, setFetchWeatherResult] = useState<FetchWeatherResult | null>(null);
  let [currentWeather, setCurrentWeather] = useState<CurrentWeather>(null);
  let [dailyWeather, setDailyWeather] = useState<DailyWeather>(null);
  let [tempUnits, setTempUnits] = useState<'imperial' | 'metric'>('imperial');
  let weatherDataLoaded = currentWeather && dailyWeather;

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let searchTerm = event.target?.elements['search-term'].value;
    console.log('app handlSearch', event.target?.elements['search-term'].value);

    let result = await fetchWeather(searchTerm);
    setFetchWeatherResult(result);
    if (result?.status === 200) {
      result.current && setCurrentWeather(result.current);
      result.daily && setDailyWeather(result.daily);
    } else {
      // note: handle error. give the user an indication that the fetch faield
      console.log('app handleSearch - show message to user', result.status, result.message)
    }
  };

  const handleToggleTempUnits = () => {
    console.log('app handleToggleTempUnits', tempUnits)
    if (tempUnits === 'imperial') {
      setTempUnits('metric');
    } else {
      setTempUnits('imperial');
    }
  }

  return (
    <Container maxWidth="md">
      <Search onSearch={handleSearch} onToggleTempUnits={handleToggleTempUnits} fetchWeatherResult={fetchWeatherResult
      } />
      
      {weatherDataLoaded ? <>
        <Current currentWeather={currentWeather} tempUnits={tempUnits}/>
        <Daily dailyWeather={dailyWeather} tempUnits={tempUnits}/>
      </>
        :
        <div>Welcome...</div>
      }
      {/* note: type warning above */}
    </Container>
  );
}
