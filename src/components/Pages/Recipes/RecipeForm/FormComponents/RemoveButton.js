import React from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { IconButton } from '@mui/material';

export default function RemoveButton({ theme, handleRemoveClick, ingredient, instruction, index }) {
  return (
    <IconButton
      aria-label={ingredient ? 'delete ingredient' : 'delete instruction'}
      onClick={() => handleRemoveClick(ingredient ? ingredient : instruction, index)}
      sx={{
        scale: '1',
        margin: '0.5',
        padding: '1',
      }}
    >
      <RemoveCircleIcon
        sx={{
          color: theme.palette.error.light,
        }}
      />
    </IconButton>
  );
}
