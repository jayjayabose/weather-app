import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { CurrentWeather } from '../_types/weather';
import { displayTempNumber, displayTempUnit } from '../_utils/services';

type CurrentProps = {
  currentWeather: CurrentWeather;
  tempUnits: String;
};

export default function Current({ currentWeather, tempUnits }: CurrentProps) {
  const date = new Date();
  const formattedDate = date
    .toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
    .replace(' at', ',');

  const iconUrl = `https://openweathermap.org/img/wn/${currentWeather.weather.icon}@2x.png`;

  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      {/* date, high and low temp*/}
      <Box component="div" sx={{ m: 0, pl: 2, border: '1px dashed grey' }}>
        <Typography variant="subtitle2">{formattedDate}</Typography>
        {/* <Typography variant="body2"> // note: data  not in current weather. can this be found elsewhere
          Day 47&deg;F &uarr; &bull; Night 39&deg;F &darr;
        </Typography> */}
      </Box>

      {/* temperature and icon */}
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {/* box: temperature */}
        <Grid item>
          <Box component="div" sx={{ p: 2, border: '1px dashed grey' }}>
            <Typography variant="h1">{displayTempNumber(currentWeather.temp, tempUnits)}&deg;{displayTempUnit(tempUnits)}</Typography>
          </Box>
        </Grid>

        {/* box: icon */}
        <Grid item>
          <Box component="div" sx={{ p: 2, border: '1px dashed grey' }}>
            <Image src={iconUrl} alt="weather icon" width={100} height={100} />
          </Box>
        </Grid>
      </Grid>

      {/* text below temperature and icon */}
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {/* box: temperature */}
        <Grid item>
          <Box component="div" sx={{ p: 2, border: '1px dashed grey' }}>
            <Typography variant="body2" gutterBottom>
              Humidity {currentWeather.humidity}%
            </Typography>
            <Typography variant="body2" gutterBottom>
              Wind {currentWeather.windSpeed} mph
            </Typography>
          </Box>
        </Grid>

        {/* box: icon */}
        <Grid item>
          <Box component="div" sx={{ p: 2, border: '1px dashed grey' }}>
            <Typography variant="body2" gutterBottom>
              {currentWeather.weather.main}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
