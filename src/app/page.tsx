'use client';

import { useState } from 'react';
import Container from '@mui/material/Container';
import Search from './_components/search';
import Current from './_components/current';
import Daily from './_components/daily';
import { CurrentWeather, DailyWeather } from './_types/weather';
import { fetchWeather } from './_utils/services';

export default function App() {
  console.log('app appId render');
  let [currentWeather, setCurrentWeather] = useState<CurrentWeather>(null);
  let [dailyWeather, setDailyWeather] = useState<DailyWeather>(null);
  let [tempUnits, setTempUnits] = useState<'imperial' | 'metric'>('imperial');
  let weatherDataLoaded = currentWeather && dailyWeather;

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let searchTerm = event.target?.elements['search-term'].value;
    console.log('app handlSearch', event.target?.elements['search-term'].value);

    let fetchResult = await fetchWeather(searchTerm);
    if (fetchResult?.status === 200) {
      fetchResult.current && setCurrentWeather(fetchResult.current);
      fetchResult.daily && setDailyWeather(fetchResult.daily);
    } else {
      // note: handle error. give the user an indication that the fetch faield
      alert(fetchResult.message)
      console.log('app handleSearch - show message to user', fetchResult.status, fetchResult.message)
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
      <Search onSearch={handleSearch} onToggleTempUnits={handleToggleTempUnits}/>
      
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
