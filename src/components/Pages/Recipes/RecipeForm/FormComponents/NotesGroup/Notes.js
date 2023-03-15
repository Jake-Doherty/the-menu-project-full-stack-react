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
            m: 1,
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
          id="outlined-multiline-flexible"
          label="Notes..."
          helperText="For anything you want to remember about this recipe."
          multiline
          maxRows={5}
          value={notes}
          onChange={(e) => handleNoteInputChange(e)}
        />
      </FormControl>
    </>
  );
}
