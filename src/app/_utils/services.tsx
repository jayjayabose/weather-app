const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_PATH_LAT_LON = process.env.NEXT_PUBLIC_API_PATH_LAT_LON;
const API_PATH_GEO = process.env.NEXT_PUBLIC_API_PATH_GEO;
const GEO_RESULT_LIMIT = process.env.NEXT_PUBLIC_GEO_RESULT_LIMIT;

import { DailyWeather, FetchWeatherResult } from "../_types/weather";

function displayTempNumber(temp: number, units: String) {
  if (units === 'imperial') {
    return Math.round(temp);
  } else {
    return Math.round(((temp - 32) * 5) / 9);
  }
}

function displayTempUnit(tempUnits: String) {
  return tempUnits === 'imperial' ? 'F' : 'C';
}

function isValidLatLon(searchTerm: string) {
  searchTerm = searchTerm.trim().replace(/ +/g, ' ').replace(/\+|\-/g, '');

  const terms = searchTerm.split(' ');
  if (terms.length !== 2) {
    return false;
  }

  let [lat, lon] = terms;

  if (isNaN(Number(lat)) || isNaN(Number(lon))) {
    return false;
  }

  const latNumber = parseFloat(lat);
  const lonNumber = parseFloat(lon);

  if (latNumber > 90 || lonNumber > 180) {
    return false;
  }

  return true;
}

type FetchLatLonResult = {
  status: number;
  message: string;
  lat: number | null;
  lon: number | null;
};

async function fetchLatLonByPlaceName(placeName: string): Promise<FetchLatLonResult> {
  const url = `${API_BASE}/${API_PATH_GEO}?q=${placeName}limit=${GEO_RESULT_LIMIT}&appid=${API_KEY}`;
  console.log('fetchLatLonByPlaceName', url);
  try {
    // calling Geo PAI
    let response = await fetch(url);
    let data = await response.json();

    console.log('fetchLatLonByPlaceName', data);
    if (data.length === 0) {
      return {
        status: 404,
        message: `No lattitude longitude coordinates found for search term: ${placeName}`,
        lat: null,
        lon: null,
      };
    } else {
      return {
        status: 200,
        message: `OK`,
        lat: data[0].lat,
        lon: data[0].lon,
      };
    }
  } catch (error) {
    console.error('error', error);
    return {
      status: 500,
      message: `API server error occured while getting lattitude longitude coordinates for search term`,
      lat: null,
      lon: null,
    };
  }
}


async function fetchWeather(searchTerm: string): Promise<FetchWeatherResult> {
  // probably break this out
  let status, message, lat, lon;
  console.log('fetchWeather', searchTerm);
  if (isValidLatLon(searchTerm)) {
    searchTerm = searchTerm.trim().replace(/ +/g, ' ');
    [lat, lon] = searchTerm.split(' ');
  } else {
    // attempt to get lat lon based on search term
    ({ status, message, lat, lon } = await fetchLatLonByPlaceName(searchTerm));
    if (status !== 200) {
      console.log('fetchWeather', status, message, lat, lon);
      return {
        status,
        message,
        current: null,
        daily: null,
      };
    }
  }

  const url = `${API_BASE}/${API_PATH_LAT_LON}?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${API_KEY}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    if (response.status !== 200) {
      return {
        status: 500,
        message: 'Unable to retrieve weather data. Please try again later.',
        current: null,
        daily: null,
      };
    }

    let current = {
      temp: data.current.temp,
      feelsLike: data.current.feels_like,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_speed,
      weather: data.current.weather[0],
    };

    let daily = data.daily.filter((_:DailyWeather, i: number) => {
      return i > 0 && i <= 5;
    });

    console.log('daily', daily);
    console.log('current', current);

    return { status: 200, message: 'ok', current, daily };
  } catch (error) {
    console.error('error', error);
    return {
      status: 500,
      message: 'API server error occured while getting weather data',
      current: null,
      daily: null,
    };
  }
}

export { fetchWeather, displayTempNumber, displayTempUnit };
