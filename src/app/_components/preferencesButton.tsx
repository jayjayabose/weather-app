import { useState } from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import TempUnitsRadioButtons from './tempUnitsRadioButtons';

type PreferencesButtonProps = { 
  onToggleTempUnits: () => void;
  tempUnits: string;
};

function PreferencesButton({onToggleTempUnits, tempUnits}: PreferencesButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  function togglePreferencesMenu(event: React.MouseEvent<HTMLButtonElement>) {
    if (!preferencesOpen) {
      setAnchorEl(event.currentTarget);
      setPreferencesOpen(true);
    } else {
      setPreferencesOpen(false);
    }
  }

  return (
    <>
      <IconButton onClick={togglePreferencesMenu}>
        <MoreVertIcon fontSize="large" />
      </IconButton>
      <Menu
        open={preferencesOpen}
        anchorEl={anchorEl}
        onClose={togglePreferencesMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Paper>
          <MenuList>
            <MenuItem>
              <TempUnitsRadioButtons onToggleTempUnits={onToggleTempUnits} tempUnits={tempUnits}/>
            </MenuItem>
          </MenuList>
        </Paper>
      </Menu>
    </>
  );
}

export default PreferencesButton;
