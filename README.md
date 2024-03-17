# Weather App README
## Project Title: WeatherPup
- WeatherPup is live! Check it out[here](https://weather-9medgirkf-jay-jayaboses-projects.vercel.app/)

## Overview:
WeatherPup is a user-friendly weather application that provides real-time weather information for locations worldwide. With a clean and intuitive interface, users can easily access current weather conditions and forecasts from across the globe.

## Features:
- Search for weather information by city or lattitude and longitutude coordinates
- View current weather conditions including temperature, humidity, wind speed, and more
- Get daily forecasts to plan ahead
- View temperature in fahrenheit or celsius

## System Requirements
- [Node.js 18.17](https://nodejs.org/) or later.
- macOS, Windows (including WSL), and Linux are supported.

## Dependencies
- WeatherPup uses Google 

## Installation:
- Clone the repository from GitHub: `git clone https://github.com/jayjayabose/weather-app/`
- Create a `.env` file as shown below and save to your project directory
- Install dependencies: `npm install`
- Start the development server: `npm run dev`
- By default, the app will start on: `http://localhost:3000`

## How It's Made
- Next.js
- Material UI
- Google API
- OpenWeatherMap API

## Design Considerations


## Future Work
- Puppify this app to 
- 

### .env file format
```
NEXT_PUBLIC_API_KEY=<YOUR_OPEN_WEATHER_MAP_API_KEY>
NEXT_PUBLIC_API_BASE=https://api.openweathermap.org
NEXT_PUBLIC_API_PATH_LAT_LON=data/3.0/onecall
NEXT_PUBLIC_API_PATH_GEO=geo/1.0/direct
NEXT_PUBLIC_GEO_RESULT_LIMIT=5
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<YOUR_GOOGLE_MAPS
```

Contributing:

We welcome contributions to enhance Weatherly. Please fork the repository, make your changes, and submit a pull request for review.
License:
This project is licensed under the MIT License - see the LICENSE.md file for details.
Contact:
For any questions, feedback, or support, please contact us at weatherly@example.com.
Thank you for using WeatherPup! Stay informed and prepared with accurate weather data at your fingertips.
