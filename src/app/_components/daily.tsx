import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

import { DailyWeather } from '../_types/weather';

type DailyProps = {
  dailyWeather: DailyWeather[];
};

export default function Daily({ dailyWeather }: DailyProps) {
  return (
    <>
      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        {dailyWeather.map((day, index) => <Day key={day.dt} weather={day}/>)}
      </Box>
    </>
  );
}

type DayProps = {
  weather: DailyWeather;
};

function Day({ weather }: DayProps) {
  const date = new Date(weather.dt * 1000);
  const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {/* day left side */}
        <Grid item>
          <Box component="div" sx={{ p: 2, border: '1px dashed grey' }}>
            <Typography variant="subtitle2" gutterBottom>
              {formattedDate}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {weather.weather[0].main}
            </Typography>
          </Box>
        </Grid>

        {/* day right side */}
        <Grid item>
          <Box
            component="div"
            id="tmp-right-container"
            sx={{
              p: 2,
              border: '1px dashed grey',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box component="div" id="image-container">
              <Image
                src={iconUrl}
                alt="weather icon"
                width={50}
                height={50}
              />
            </Box>
            <Box component="div" id="temperature-container" sx={{ ml: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                {weather.temp.max}&deg;
              </Typography>
              <Typography variant="body2" gutterBottom>
              {weather.temp.min}&deg;
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
