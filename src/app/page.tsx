'use client';

// import * as React from 'react';
import { useState } from 'react';

import Container from '@mui/material/Container';


import Search from './_components/search';
import Current from './_components/current';
import Daily from './_components/daily';

import { currentData, dailyData } from 'utils/dummyData';
import { CurrentWeather, DailyWeather } from './_types/weather';

export default function App() {
  let [currentWeather, setCurrentWeather] = useState<CurrentWeather>(currentData);
  let [dailyWeather, setDailyWeather] = useState<DailyWeather>(dailyData);

  return (
    <Container maxWidth="md">
      <Search />
      <Current currentWeather={currentWeather}/>
      <Daily dailyWeather={dailyWeather}/>
    </Container>
  );
}
