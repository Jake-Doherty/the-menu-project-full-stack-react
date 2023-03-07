import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';

import measurements from '../../../../../../measurement-data.js';
import RemoveButton from '../RemoveButton.js';

export default function Ingredient({
  theme,
  index,
  ingredient,
  ingredientRef,
  ingredientList,
  handleRemoveClick,
  handleIngredientInputChange,
}) {
  return (
    <div
      className="ingredient"
      ref={ingredientList.length - 1 === index ? ingredientRef : null}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <RemoveButton {...{ theme, handleRemoveClick, ingredient, index }} />

      <Typography
        variant="h6"
        component="h6"
        sx={{
          color: theme.palette.primary.contrastText,
        }}
      >
        {index + 1}.{' '}
      </Typography>

      <TextField
        name="qty"
        label="Qty."
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-99]*',
        }}
        value={ingredient.quantity}
        onChange={(e) => handleIngredientInputChange(e, index)}
        sx={{
          width: 'max(10%, 100px)',
          '& .MuiInputBase-root *': {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
        }}
      />

      <TextField
        id="outlined-select-measurement"
        label="Unit"
        name="unit"
        select
        value={ingredient.unit}
        onChange={(e) => handleIngredientInputChange(e, index)}
        sx={{
          width: 'max(10%, 125px)',
          '& .MuiInputBase-root *': {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
        }}
      >
        {measurements.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              color: theme.palette.primary.contrastText,
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <FormControl
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          '& .MuiInputBase-root *': {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
        }}
      >
        <InputLabel htmlFor="ingredient">Ingredient</InputLabel>
        <OutlinedInput
          id="ingredient"
          label="Ingredient"
          name="ingredientName"
          type="text"
          value={ingredient.ingredientName}
          onChange={(e) => handleIngredientInputChange(e, index)}
          sx={{
            width: '98%',
          }}
        />
      </FormControl>
    </div>
  );
}
