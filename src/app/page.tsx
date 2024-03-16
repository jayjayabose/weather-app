'use client';

import { useState, useEffect } from 'react';
// import Container from '@mui/material/Container';
// import Stack from '@mui/material/Stack';
// import Paper from '@mui/material/Paper';

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
  console.log('App render');
  const [intialLoadSucceeded, setintialLoadSucceeded] = useState<
    boolean | null
  >(null);
  let [fetchWeatherResult, setFetchWeatherResult] =
    useState<FetchWeatherResult | null>(null);
  let [currentWeather, setCurrentWeather] = useState<CurrentWeather>(null);
  let [location, setLocation] = useState<String | null>(null);
  let [dailyWeather, setDailyWeather] = useState<DailyWeather[] | null>(null);
  let [tempUnits, setTempUnits] = useState<'imperial' | 'metric'>('imperial');
  let weatherDataLoaded = currentWeather && dailyWeather;

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.target as HTMLFormElement;
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

  useEffect(() => {
    console.log('App. useEffect');
    (async () => {
      let result = await fetchWeather(DEFAULT_LOCATION);
      // setFetchWeatherResult(result);
      if (result?.status === 200) {
        result.current && setCurrentWeather(result.current);
        result.daily && setDailyWeather(result.daily);
        setLocation(DEFAULT_LOCATION);
        setintialLoadSucceeded(true);
        console.log('App. handle initial load', result);
        // set city
      } else {
        // note: handle error. give the user an indication that the fetch faield
        console.log('App. handle error on initial load');
        setintialLoadSucceeded(false);
      }
    })();
  }, []);

  if (intialLoadSucceeded === null) {
    return (
      <>
        <Search
          onSearch={handleSearch}
          onToggleTempUnits={handleToggleTempUnits}
          fetchWeatherResult={fetchWeatherResult}
          // location={location}
        />
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <Search
        onSearch={handleSearch}
        onToggleTempUnits={handleToggleTempUnits}
        fetchWeatherResult={fetchWeatherResult}
        // location={location}
      />

      {intialLoadSucceeded === true ? ( // change this?
        <>
          <Current currentWeather={currentWeather} tempUnits={tempUnits} />
          <Daily dailyWeather={dailyWeather} tempUnits={tempUnits} />
        </>
      ) : (
        <p>
          We had a problem retrieving weather data. Try your search in a few
          moments, please.
        </p>
      )}
    </>
  );
}
