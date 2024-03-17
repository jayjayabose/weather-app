const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_PATH_LAT_LON = process.env.NEXT_PUBLIC_API_PATH_LAT_LON;
const API_PATH_GEO = process.env.NEXT_PUBLIC_API_PATH_GEO;
const GEO_RESULT_LIMIT = process.env.NEXT_PUBLIC_GEO_RESULT_LIMIT;
const API_PATH_GEO_REVERSE = process.env.NEXT_PUBLIC_API_PATH_GEO_REVERSE;

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

  const [lat, lon] = terms;

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
    const response = await fetch(url);
    const data = await response.json();

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

type FetchPlaceNameResult = {
  status: number;
  message: string;
  placeName: string;
};

async function fetchPlaceNameByLatLon(latLon: [number, number]): Promise<FetchPlaceNameResult> {
  const [lat, lon] = latLon;
  const url = `${API_BASE}/${API_PATH_GEO_REVERSE}?lat=${lat}&lon=${lon}&limit=${GEO_RESULT_LIMIT}&appid=${API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log('fetchPlaceNameByLatLon', data);
    if (data.length === 0) {
      return {
        status: 404,
        message: `No place name found for lat lon coordiates: ${lat}, ${lon}`,
        placeName: '',
      };
    } else {
      console.log('fetchPlaceNameByLatLon status 200', data[0].name)
      const name = data[0].name;
      const state = data[0].state;
      const country = data[0].country;
       
      const placeName = country === 'US' ? `${name}, ${state}, ${country}` : `${name}, ${country}`;

      return {
        status: 200,
        message: `OK`,
        placeName,
      };
    }
  } catch (error) {
    console.error('error', error);
    return {
      status: 500,
      message: `API server error occured while getting place name for lattitude longitude coordinates`,
      placeName: '',
    };
  }
}

async function fetchWeather(searchTerm: string): Promise<FetchWeatherResult> {
  // note:probably break this out
  let status, message, lat, lon;
  console.log('fetchWeather', searchTerm);

  // if lat lon search, extract coordinates
  if (isValidLatLon(searchTerm)) {
    searchTerm = searchTerm.trim().replace(/ +/g, ' ');
    [lat, lon] = searchTerm.split(' ');

    // get place name, and replace search term for display to user
    const result = await fetchPlaceNameByLatLon([Number(lat), Number(lon)]);
    console.log('featPlaceNameByLatLon result', result);
    if (result.status === 200) {
      searchTerm = result.placeName;
    }

  } else {
    // if place name search, get lat lon from api
    ({ status, message, lat, lon } = await fetchLatLonByPlaceName(searchTerm));
    if (status !== 200) {
      return {
        status,
        message,
        placeName: searchTerm,
        current: null,
        daily: null,
      };
    }
  }
  
  try {
    // get weather by lat lon
    const url = `${API_BASE}/${API_PATH_LAT_LON}?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.status !== 200) {
      return {
        status: 500,
        message: 'Unable to retrieve weather data. Please try again later.',
        placeName: searchTerm,
        current: null,
        daily: null,
      };
    }

    const current = {
      temp: data.current.temp,
      feelsLike: data.current.feels_like,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_speed,
      weather: data.current.weather[0],
    };

    const daily = data.daily.filter((_:DailyWeather, i: number) => {
      return i > 0 && i <= 5;
    });
    
    console.log('fetchWeather success: searchTerm', searchTerm)
    return { status: 200, message: 'ok', placeName: searchTerm, current, daily };
  } catch (error) {
    console.error('error', error);
    return {
      status: 500,
      message: 'API server error occured while getting weather data',
      placeName: searchTerm,
      current: null,
      daily: null,
    };
  }
}

export { fetchWeather, displayTempNumber, displayTempUnit };
