import { FormControl, TextField } from '@mui/material';
import React from 'react';
import SectionHeader from '../SectionHeader.js';

export default function Notes({ theme, notes, handleNoteInputChange }) {
  return (
    <>
      <SectionHeader text={'Notes'} theme={theme} />
      <FormControl
        sx={{
          borderTop: `2px solid ${theme.palette.primary.main}`,
          paddingTop: '10px',
          width: '80%',
        }}
      >
        <TextField
          name="notes"
          sx={{
            width: '100%',
            alignSelf: 'center',
            justifySelf: 'center',
            color: theme.palette.primary.contrastText,
            '& .MuiInputBase-input.MuiOutlinedInput-input, .MuiInputBase-input.MuiOutlinedInput-input::placeholder':
              {
                color: theme.palette.primary.contrastText,
                opacity: 0.8,
              },
            '& .css-vcg1b0-MuiInputBase-input-MuiOutlinedInput-input, & .css-645khj-MuiFormHelperText-root':
              {
                color: theme.palette.primary.contrastText,
              },
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
              },
            },
            '& .css-9425fu-MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
            },
          }}
          id="outlined-multiline-flexible"
          label="Notes..."
          helperText="For anything you want to remember about this recipe."
          multiline
          maxRows={4}
          value={notes}
          onChange={(e) => handleNoteInputChange(e)}
        />
      </FormControl>
    </>
  );
}
