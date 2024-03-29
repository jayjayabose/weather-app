import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { CurrentWeather } from '../_types/weather';
import { displayTempNumber, displayTempUnit } from '../_utils/services';

type CurrentProps = {
  currentWeather: CurrentWeather | null;
  tempUnits: string;
  location: string | null;
};

export default function Current({
  currentWeather,
  tempUnits,
  location,
}: CurrentProps) {
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
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
    setDate(formattedDate);
  }, []);

  const iconUrl = `https://openweathermap.org/img/wn/${currentWeather?.weather.icon}@2x.png`;

  return (
    <Box component="section" sx={{ pb: 1, pt: 1 }}>
      {/* date, high and low temp*/}
      <Box component="div" sx={{ m: 0, pl: 2 }}>
        <Typography variant="h6" gutterBottom>
          {location}
        </Typography>
        {date && <Typography variant="subtitle2">{date}</Typography>}
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
          <Box component="div" sx={{ p: 2 }}>
            <Typography variant="h1">
              {currentWeather &&
                displayTempNumber(currentWeather.temp, tempUnits)}
              &deg;{displayTempUnit(tempUnits)}
            </Typography>
          </Box>
        </Grid>

        {/* box: icon */}
        <Grid item>
          <Box component="div" sx={{ p: 2 }}>
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
        {/* box: summary word */}
        <Grid item>
          <Box component="div" sx={{ p: 2 }}>
            <Typography variant="body2" gutterBottom>
              {currentWeather?.weather.main}
            </Typography>
          </Box>
        </Grid>

        {/* box: humidity and wind */}
        <Grid item>
          <Box component="div" sx={{ p: 2 }}>
            <Typography variant="body2" gutterBottom>
              Humidity {currentWeather?.humidity}%
            </Typography>
            <Typography variant="body2" gutterBottom>
              Wind {currentWeather && Math.round(currentWeather.windSpeed)} mph
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
