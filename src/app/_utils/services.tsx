const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_PATH_LAT_LON = process.env.NEXT_PUBLIC_API_PATH_LAT_LON;
const API_PATH_GEO = process.env.NEXT_PUBLIC_API_PATH_GEO;
const GEO_RESULT_LIMIT = process.env.NEXT_PUBLIC_GEO_RESULT_LIMIT;;

function displayTempNumber (temp: number, units: String) {
  if (units === 'imperial') {
    // round to nearest whole number

    return Math.round(temp);
  } else {
    return Math.round(((temp - 32) * 5) / 9);
  }
};

function displayTempUnit (tempUnits: String) {
  return tempUnits === 'imperial' ? 'F' : 'C'
}

function isPlaceName(searchTerm: string) {
  if (searchTerm.match(/^[^\d]+$/)) { // if the search term contains no digits
    console.log('isPlaceName', searchTerm);
    return true;
  }
}

async function fetchLatLonByPlaceName(placeName: string) {
  const url = `${API_BASE}/${API_PATH_GEO}?q=${placeName}limit=${GEO_RESULT_LIMIT}&appid=${API_KEY}`;
  console.log('fetchLatLonByPlaceName', url);
  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log('fetchLatLonByPlaceName', data);
    return {lat: data[0].lat, lon: data[0].lon}
  } catch (error) {
    console.error('error', error.message);
  }
}

async function fetchWeather(searchTerm: string) {
  let lat, lon;
  console.log('fetchWeather', searchTerm);
  if (isPlaceName(searchTerm)) {
    ({lat, lon} = await fetchLatLonByPlaceName(searchTerm));

  } else {
    [lat, lon] = searchTerm.split(' '); // assume lat and lon are separated by a space
  }

  const url = `${API_BASE}/${API_PATH_LAT_LON}?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${API_KEY}`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    let current = {
      temp: data.current.temp,
      feelsLike: data.current.feels_like,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_speed,
      weather: data.current.weather[0],
    };

    let daily = data.daily.filter((day, i) => {
      return i >0 && i <= 5;
    });

    console.log('daily', daily);
    console.log('current', current);

    return {ok: true, current, daily}
  } catch (error) {
    console.error('error', error.message);
  }
}

export {
  fetchWeather, displayTempNumber, displayTempUnit
}