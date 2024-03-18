# Weather App

## Introduction
### Overview
WeatherApp is a user-friendly weather application that provides real-time weather information for locations worldwide. 

### Features
- Search for weather information by city or lattitude and longitutude coordinates supplied in decimal degrees (e.g. 41.403, 2.174)
- View current weather conditions including temperature, humidity, wind speed, and more
- Get daily forecasts to plan ahead
- View temperature in fahrenheit or celsius

## About the app
### How It's Made
Weather App uses the following
- [Next.js](https://nextjs.org/)
- [Material UI](https://mui.com/)
- [Google Maps and Places API](https://developers.google.com/maps/documentation)
- [OpenWeatherMap API](https://openweathermap.org/api)

### Design Considerations
- Mobile-first. WeatherApp is designed as a mobile-first app. 
- Client-side rendering. 
  - To reduce latency API calls are make from the client
    - A tradeoff of this appraoch is API keys are exposed to the client
    - I consider this a minor concern for this projeect.
  - Server side rendering avoids this tradeoff but requires client to relay data to server, thus increasing latency
- Initial Load Screen. What is presented to the user initially?
  - I decided to load default weather data. Why?
    - When data loads the user sees weather results and intuitively understand the utility of the app
    - I considered a "search box" only inital scren
      - pros: (i) low latency
      - cons: (i) user must "do work" (e.g. enter search term) before the utility of the app is clear (see above)
    - I considered initial messaging on "how to use", but decided the interface is simple enought that it's best to enable the user to interact right away.

### Future Work
- Fix: Google Maps Javascript API is not loading asynchronously.  I belive [this](https://www.npmjs.com/package/@googlemaps/js-api-loader) will resolve the issue.
- Add support for multiple lattitude and longitude formats
- Add client side validation of search parameteres
- Format display of lattitude longitude coordinates in weather results
- Add tests

## Installation
### Dependencies
If you'd like to build th project locally, you'll need:
#### System Requirements
- [Node.js 18.17](https://nodejs.org/) or later.
- macOS, Windows (including WSL), and Linux are supported.

#### Other Requirements
- Google Maps API Key
  - Create a [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key)
  - Add the Google Maps API Key to your `.env` file as described below

- OpenWeather API Key
  - Create an [OpenWeather API Key](https://openweathermap.org/appid)
  - Add the OpenWeather API Key to your `.env` file as described below

#### .env file
- Create a file with tname `.env`
- Enter contents as shown below
  - enter your API Key Values where specified
- Save the file to your project directory
- You're done!

```
NEXT_PUBLIC_API_KEY=<YOUR_OPEN_WEATHER_MAP_API_KEY>
NEXT_PUBLIC_API_BASE=https://api.openweathermap.org
NEXT_PUBLIC_API_PATH_LAT_LON=data/3.0/onecall
NEXT_PUBLIC_API_PATH_GEO=geo/1.0/direct
NEXT_PUBLIC_GEO_RESULT_LIMIT=5
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<YOUR_GOOGLE_MAPS
```

### Install Steps:
If dependencies are satisfied (see above), you can install the application locally by following these steps:
- Clone the repository from GitHub: `git clone https://github.com/jayjayabose/weather-app/`
- Create a `.env` file as shown below and save to your project directory
- Install dependencies: `npm install`
- Start the development server: `npm run dev`
- By default, the app will start on: `http://localhost:3000`
- WeatherApp should be up and running now