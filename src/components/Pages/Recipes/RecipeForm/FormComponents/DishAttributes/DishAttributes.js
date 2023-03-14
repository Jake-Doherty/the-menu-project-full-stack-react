import { Label } from '@mui/icons-material';
import { Box, FormControl, InputLabel, OutlinedInput, Select, Switch } from '@mui/material';
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
      <Select value="" />
      <Select value="" />
      <FormControl>
        <InputLabel htmlFor="outlined-adornment-servings">Servings</InputLabel>
        <OutlinedInput label="Servings" />
      </FormControl>
    </Box>
  );
}
