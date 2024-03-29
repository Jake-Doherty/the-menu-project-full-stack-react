import { Typography } from '@mui/material';
import React from 'react';
import AddButton from '../AddButton.js';
import SectionHeader from '../SectionHeader.js';

export default function IngredientsHeader({ theme, handleAddIngredient }) {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row nowrap',
        width: '80%',
        height: '40px',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '5px',
        borderBottom: `2px solid ${theme.palette.primary.main}`,
      }}
    >
      <SectionHeader theme={theme} text="Ingredients" />

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          margin: 1,
        }}
      >
        <Typography
          variant="h6"
          component="h6"
          sx={{
            fontSize: '0.8rem',
            color: theme.palette.primary.contrastText,
            width: '150px',
            textAlign: 'right',
          }}
        >
          Add an Ingredient
        </Typography>
        <AddButton {...{ theme, handleAddIngredient }} />
      </div>
    </div>
  );
}
