import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';

export default function DishNameInput({
  theme,
  dishName,
  handleDishNameChange,
  formError,
  setFormError,
}) {
  return (
    <FormControl
      sx={{
        '& .MuiInputBase-root *': {
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
          },
        },
        m: 1,
        width: '80%',
      }}
      variant="outlined"
    >
      <InputLabel component="label" htmlFor="outlined-dish-name">
        Dish Name
      </InputLabel>
      <OutlinedInput
        autoComplete="off"
        name="dish-name"
        id="outlined-dish-name"
        type="text"
        label="Dish Name"
        value={dishName}
        onChange={(e) => handleDishNameChange(e)}
        required
        error={formError}
        onInvalid={() => setFormError(true)}
      />
    </FormControl>
  );
}
