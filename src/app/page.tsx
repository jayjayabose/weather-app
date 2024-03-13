'use client';

import { useState } from 'react';
import Container from '@mui/material/Container';
import Search from './_components/search';
import Current from './_components/current';
import Daily from './_components/daily';
import { CurrentWeather, DailyWeather } from './_types/weather';
import { fetchWeather } from './_utils/services';

import { currentData, dailyData } from 'utils/dummyData'; // note: tmp
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

const DEFAULT_LOCATION = 'New York, NY, US';

// note: no type is needed for fetchResult??
// type Repo = {
//   name: string
//   stargazers_count: number
// }

/*
type FetchResult {
  current: CurrentWeather;
  daily: DailyWeather;

}
 
export const getServerSideProps = (async () => {
  // Fetch data from external API
  // const res = await fetch('https://api.github.com/repos/vercel/next.js')
  // const repo: Repo = await res.json()
  const fetchResult = await fetchWeather(DEFAULT_LOCATION);
  
  // Pass data to the page via props
  // return { props: { repo } }
  return { props: { fetchResult } }
// }) satisfies GetServerSideProps<{ repo: Repo }>
}) satisfies GetServerSideProps<{ fetchResult: FetchResult }>

*/
export default function App() {
  console.log('app appId render');
  let [currentWeather, setCurrentWeather] =
    useState<CurrentWeather>(currentData);
  let [dailyWeather, setDailyWeather] = useState<DailyWeather>(dailyData);
  let [tempUnits, setTempUnits] = useState<'imperial' | 'metric'>('imperial');

  const handleSearch = async (event: Event) => {
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
      <Current currentWeather={currentWeather} tempUnits={tempUnits}/>
      <Daily dailyWeather={dailyWeather} tempUnits={tempUnits}/>
      {/* note: type warning above */}
    </Container>
  );
}
