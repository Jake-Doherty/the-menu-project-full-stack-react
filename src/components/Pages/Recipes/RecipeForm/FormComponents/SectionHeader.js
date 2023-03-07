import { Typography } from '@mui/material';
import React from 'react';

export default function SectionHeader({ theme, text }) {
  return (
    <Typography
      variant="h6"
      component="h6"
      sx={{
        color: theme.palette.primary.contrastText,
      }}
    >
      {text}
    </Typography>
  );
}
