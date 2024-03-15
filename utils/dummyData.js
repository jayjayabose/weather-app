let currentData  = {
  "temp": 278.29,
  "feelsLike": 278.29,
  "humidity": 73,
  "windSpeed": 0,
  "weather": {
    "id": 800,
    "main": "Clear",
    "description": "clear sky",
    "icon": "01d"
  }
}

let dailyData = [
  {
    "dt": 1710180000,
    "sunrise": 1710160273,
    "sunset": 1710202861,
    "moonrise": 1710163320,
    "moonset": 1710209520,
    "moon_phase": 0.05,
    "summary": "You can expect partly cloudy in the morning, with clearing in the afternoon",
    "temp": {
      "day": 289.11,
      "min": 280.03,
      "max": 290.85,
      "night": 283.75,
      "eve": 287.47,
      "morn": 280.74
    },
    "feels_like": {
      "day": 288.01,
      "night": 282.77,
      "eve": 286.6,
      "morn": 279.67
    },
    "pressure": 1025,
    "humidity": 48,
    "dew_point": 278.12,
    "wind_speed": 3.6,
    "wind_deg": 194,
    "wind_gust": 6.53,
    "weather": [
      {
        "id": 804,
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "04d"
      }
    ],
    "clouds": 91,
    "pop": 0,
    "uvi": 5.59
  },
  {
    "dt": 1710266400,
    "sunrise": 1710246594,
    "sunset": 1710289306,
    "moonrise": 1710251640,
    "moonset": 1710300180,
    "moon_phase": 0.09,
    "summary": "There will be clear sky until morning, then partly cloudy",
    "temp": {
      "day": 292.5,
      "min": 281.2,
      "max": 294.81,
      "night": 289.99,
      "eve": 290.74,
      "morn": 281.2
    },
    "feels_like": {
      "day": 291.98,
      "night": 289.79,
      "eve": 290.41,
      "morn": 279.39
    },
    "pressure": 1019,
    "humidity": 57,
    "dew_point": 283.78,
    "wind_speed": 4.57,
    "wind_deg": 198,
    "wind_gust": 11.87,
    "weather": [
      {
        "id": 803,
        "main": "Clouds",
        "description": "broken clouds",
        "icon": "04d"
      }
    ],
    "clouds": 75,
    "pop": 0,
    "uvi": 5.51
  },
  {
    "dt": 1710352800,
    "sunrise": 1710332914,
    "sunset": 1710375752,
    "moonrise": 1710340020,
    "moonset": 1710390900,
    "moon_phase": 0.13,
    "summary": "Expect a day of partly cloudy with rain",
    "temp": {
      "day": 293.89,
      "min": 288.29,
      "max": 296.23,
      "night": 291.47,
      "eve": 294.81,
      "morn": 288.55
    },
    "feels_like": {
      "day": 294.13,
      "night": 291.81,
      "eve": 295.09,
      "morn": 288.63
    },
    "pressure": 1010,
    "humidity": 81,
    "dew_point": 290.5,
    "wind_speed": 5.98,
    "wind_deg": 204,
    "wind_gust": 12.86,
    "weather": [
      {
        "id": 500,
        "main": "Rain",
        "description": "light rain",
        "icon": "10d"
      }
    ],
    "clouds": 99,
    "pop": 0.9,
    "rain": 3.55,
    "uvi": 2.29
  },
  {
    "dt": 1710439200,
    "sunrise": 1710419234,
    "sunset": 1710462197,
    "moonrise": 1710428640,
    "moonset": 0,
    "moon_phase": 0.17,
    "summary": "There will be rain today",
    "temp": {
      "day": 295.89,
      "min": 291.91,
      "max": 296.8,
      "night": 292.46,
      "eve": 295.22,
      "morn": 292.95
    },
    "feels_like": {
      "day": 296.36,
      "night": 292.95,
      "eve": 295.73,
      "morn": 293.34
    },
    "pressure": 1011,
    "humidity": 82,
    "dew_point": 292.66,
    "wind_speed": 5.31,
    "wind_deg": 182,
    "wind_gust": 14.33,
    "weather": [
      {
        "id": 500,
        "main": "Rain",
        "description": "light rain",
        "icon": "10d"
      }
    ],
    "clouds": 100,
    "pop": 0.96,
    "rain": 6.35,
    "uvi": 3
  },
  {
    "dt": 1710525600,
    "sunrise": 1710505554,
    "sunset": 1710548642,
    "moonrise": 1710517560,
    "moonset": 1710481500,
    "moon_phase": 0.2,
    "summary": "You can expect rain in the morning, with partly cloudy in the afternoon",
    "temp": {
      "day": 294.34,
      "min": 289.82,
      "max": 296.32,
      "night": 291.45,
      "eve": 293.37,
      "morn": 289.82
    },
    "feels_like": {
      "day": 294.55,
      "night": 291.63,
      "eve": 293.56,
      "morn": 290.08
    },
    "pressure": 1013,
    "humidity": 78,
    "dew_point": 290.41,
    "wind_speed": 3.8,
    "wind_deg": 27,
    "wind_gust": 10.9,
    "weather": [
      {
        "id": 501,
        "main": "Rain",
        "description": "moderate rain",
        "icon": "10d"
      }
    ],
    "clouds": 100,
    "pop": 1,
    "rain": 24.84,
    "uvi": 3
  }
]

export {currentData, dailyData}