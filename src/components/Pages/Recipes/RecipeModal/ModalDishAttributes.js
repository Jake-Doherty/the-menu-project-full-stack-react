import { Box, Typography } from '@mui/material';
import React from 'react';

export default function ModalDishAttributes({ theme, modalServings, modalTotalTime }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '5px',
      }}
    >
      {modalServings ? (
        <Box>
          <Typography
            id="servings-title"
            variant="body1"
            component="span"
            sx={{ textDecoration: 'underline', color: theme.palette.primary.light }}
          >
            Servings:
          </Typography>
          <Typography id="servings-title" variant="body1" component="span">
            {` ${modalServings}`}
          </Typography>
        </Box>
      ) : null}
      {modalTotalTime <= 0 ? null : (
        <Box>
          <Typography
            id="servings-title"
            variant="body1"
            component="span"
            sx={{ textDecoration: 'underline', color: theme.palette.primary.light }}
          >
            Total Cook Time:
          </Typography>
          <Typography id="servings-title" variant="body1" component="span">
            {` ${Math.floor(modalTotalTime / 60)} hours and ${modalTotalTime % 60} minutes`}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
