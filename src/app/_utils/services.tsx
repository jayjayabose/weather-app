const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_PATH = process.env.NEXT_PUBLIC_API_PATH;

async function fetchWeather(searchTerm: string) {
  console.log('fetchWeather', searchTerm);
  const [lat, lon] = searchTerm.split(' '); // assume lat and lon are separated by a space
  const url = `${API_BASE}/${API_PATH}?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${API_KEY}`;

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
  fetchWeather
}