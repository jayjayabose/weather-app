'use client';

import { useState, useEffect, useRef } from 'react';
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

  const lastSearchTerm = useRef<string | null>(null);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.target as HTMLFormElement;
    const searchTerm = (elements[0] as HTMLInputElement).value;
    lastSearchTerm.current = searchTerm;

    const result = await fetchWeather(searchTerm);
    setFetchWeatherResult(result);
    if (result?.status === 200) {
      result.current && setCurrentWeather(result.current);
      result.daily && setDailyWeather(result.daily);
      setLocation(lastSearchTerm.current);
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
          <Current currentWeather={currentWeather} tempUnits={tempUnits} location={location} />
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
