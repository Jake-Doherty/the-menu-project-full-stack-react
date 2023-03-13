import { Box, IconButton, Switch, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

export default function ModalDishName({ modalDishName, theme, handleModalClose }) {
  return (
    <Box
      id="modal-header"
      variant="section"
      component="section"
      sx={{
        display: 'flex',
      }}
    >
      <Switch sx={{ opacity: 0 }} />
      <Typography
        id="modal-recipe-dish-name"
        variant="h4"
        component="h4"
        sx={{
          width: '100%',
          position: 'relative',
          textAlign: 'center',
          mb: 1,
        }}
      >
        {modalDishName}
      </Typography>
      <IconButton
        id="close-button"
        aria-label="close"
        size="small"
        sx={{
          position: 'relative',
          right: '0',
          cursor: 'pointer',
          '& :hover': {
            color: theme.palette.error.main,
          },
        }}
        onClick={handleModalClose}
      >
        <CloseIcon className="close-icon" titleAccess="Close recipe" />
      </IconButton>
    </Box>
  );
}
