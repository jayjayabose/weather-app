export type FetchWeatherResult = {
  status: number;
  message: string;
  placeName: string,
  current: CurrentWeather | null;
  daily: DailyWeather[] | null;
};


export type CurrentWeather = {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  weather: Weather;
} | null;

export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};


export type DailyWeather = {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: Temperature;
  feels_like: FeelsLike;
  pressure: number,
  humidity: number,
  dew_point: number,
  wind_speed: number,
  wind_deg: number,
  wind_gust: number,
  weather: Weather[];
};

export type Temperature = {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
};

export type FeelsLike = {
  day: number;
  night: number;
  eve: number;
  morn: number;
};

