'use client';

import { useState } from 'react';
import Container from '@mui/material/Container';
import Search from './_components/search';
import Current from './_components/current';
import Daily from './_components/daily';
import { CurrentWeather, DailyWeather } from './_types/weather';
import { fetchWeather } from './_utils/services';

import { currentData, dailyData } from 'utils/dummyData'; // note: tmp

export default function App() {
  console.log('app appId render');
  let [currentWeather, setCurrentWeather] =
    useState<CurrentWeather>(currentData);
  let [dailyWeather, setDailyWeather] = useState<DailyWeather>(dailyData);

  const handleSearch = async (event: Event) => {
    event.preventDefault();
    let searchTerm = event.target?.elements['search-term'].value;
    console.log('app handlSearch', event.target?.elements['search-term'].value);

    let fetchResult = await fetchWeather(searchTerm);
    if (fetchResult?.ok) {
      setCurrentWeather(fetchResult.current);
      setDailyWeather(fetchResult.daily);
    } else {
      // note: handle error. give the user an indication that the fetch faield
    }
  };

  return (
    <Container maxWidth="md">
      <Search onSearch={handleSearch} />
      <Current currentWeather={currentWeather} />
      <Daily dailyWeather={dailyWeather} />
      {/* note: type warning above */}
    </Container>
  );
}
