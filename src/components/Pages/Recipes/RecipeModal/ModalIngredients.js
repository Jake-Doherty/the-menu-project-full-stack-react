import { Box, Typography } from '@mui/material';
import React from 'react';

export default function ModalIngredients({ modalIngredientList }) {
  return (
    <Box>
      <Typography
        id="ingredients-title"
        variant="h6"
        component="h6"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          textDecoration: 'underline',
          mb: 1,
        }}
      >
        Ingredients
      </Typography>
      {modalIngredientList.map((ingredient, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            borderBottom: '1px solid',
            marginBottom: '5px',
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {ingredient.quantity} {ingredient.unit}
          </Typography>
          <Typography variant="span" component="span">
            {ingredient.ingredientName ? ingredient.ingredientName : ingredient.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
