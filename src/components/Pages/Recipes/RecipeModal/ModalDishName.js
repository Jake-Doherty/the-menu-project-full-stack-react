import { Typography } from '@mui/material';
import React from 'react';

export default function ModalDishName({ modalDishName }) {
  return (
    <Typography id="modal-modal-title" variant="h4" component="h4" align="center" mb={2}>
      {modalDishName}
    </Typography>
  );
}
