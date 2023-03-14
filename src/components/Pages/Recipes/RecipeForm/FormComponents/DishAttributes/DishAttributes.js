import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
} from '@mui/material';
import React from 'react';

export default function DishAttributes() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '80%',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <FormControl>
        <Switch />
      </FormControl>
      {/* <FormControl>
        <InputLabel htmlFor="outlined-adornment-prep-time">Prep Time</InputLabel>
        <OutlinedInput label="Prep Time" />
      </FormControl> */}
      <Select label="Hrs" value="">
        <MenuItem value={1}>1</MenuItem>
      </Select>
      <Select label="Min" value=""></Select>
      <FormControl>
        <InputLabel htmlFor="outlined-adornment-servings">Servings</InputLabel>
        <OutlinedInput label="Servings" />
      </FormControl>
    </Box>
  );
}
