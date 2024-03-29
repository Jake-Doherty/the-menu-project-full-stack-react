import React from 'react';
import {
  Box,
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
    <Box
      className="ingredient"
      ref={ingredientList.length - 1 === index ? ingredientRef : null}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
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
      <RemoveButton {...{ theme, handleRemoveClick, ingredient, index }} />

      <Typography
        variant="h6"
        component="h6"
        sx={{
          fontSize: '1rem',
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
          minWidth: '63px',
        }}
        required
        onInvalid={(e) => {
          e.target.setCustomValidity('Please add a quantity');
        }}
        onInput={(e) => {
          e.target.setCustomValidity('');
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
          minWidth: '83px',
        }}
        required
        onInvalid={(e) => {
          e.target.setCustomValidity('Please select a measurement');
        }}
        onSelect={(e) => {
          e.target.setCustomValidity('');
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
        }}
      >
        <InputLabel htmlFor="ingredient">Ingredient *</InputLabel>
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
          required
          onInvalid={(e) => {
            e.target.setCustomValidity('Please add an ingredient');
          }}
          onInput={(e) => {
            e.target.setCustomValidity('');
          }}
        />
      </FormControl>
    </Box>
  );
}
