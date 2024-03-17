import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

type TemperatureUnitsdRadioButtonsProps = {
  onToggleTempUnits: () => void;
  tempUnits: string;
};

function TemperatureUnitsdRadioButtons({onToggleTempUnits, tempUnits}: TemperatureUnitsdRadioButtonsProps) {
  return (
      <RadioGroup
        name="temperature-units"
        value={tempUnits}
        onChange={onToggleTempUnits}
      >
        <FormControlLabel value="imperial" control={<Radio />} label="Fahrenheit" />
        <FormControlLabel value="metric" control={<Radio />} label="Celcius" />
      </RadioGroup>
  );
}

export default TemperatureUnitsdRadioButtons;