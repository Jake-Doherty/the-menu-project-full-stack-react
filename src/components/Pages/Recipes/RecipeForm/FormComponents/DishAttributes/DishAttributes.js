import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
} from '@mui/material';
import React from 'react';

export default function DishAttributes({
  theme,
  tags,
  servings,
  // totalTime,
  // isSecret,
  handleAddAttribute,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: '10px',
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
      <TextField
        name="tags"
        label="Tags"
        value={tags}
        onChange={(e) => handleAddAttribute(e)}
        helperText={`tags are separated by a comma and  one space`}
        inputProps={{
          inputMode: 'text',
          pattern: '^[a-zA-Z]+(, [a-zA-Z]+)*$',
        }}
        sx={{ width: '100%' }}
      ></TextField>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          gap: '10px',
        }}
      >
        <FormControl>
          <InputLabel htmlFor="outlined-adornment-servings">Servings</InputLabel>
          <OutlinedInput
            name="servings"
            label="Servings"
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-99]*',
            }}
            value={servings}
            onChange={(e) => handleAddAttribute(e)}
            sx={{ width: '100px' }}
          />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="outlined-adornment-hrs">Hrs</InputLabel>
          <Select
            label="Hrs"
            value=""
            sx={{ width: '80px' }}
            MenuProps={{
              sx: { height: '300px' },
            }}
          >
            {[...Array(25).keys()].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="outlined-adornment-hrs">Mins</InputLabel>
          <Select
            label="Min"
            value=""
            sx={{ width: '90px' }}
            MenuProps={{
              sx: { height: '300px' },
            }}
          >
            {[...Array(60).keys()].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <FormControl sx={{ display: 'flex', flexDirection: 'row' }}>
        <FormControlLabel
          control={<Switch id="secret-recipe" />}
          label="Secret Recipe"
          sx={{ color: theme.palette.primary.contrastText }}
        />
      </FormControl>
    </Box>
  );
}

{
  /* <FormControl>
  <InputLabel htmlFor="outlined-adornment-tags">Tags</InputLabel>
  <OutlinedInput label="Tags" />
</FormControl> */
}
