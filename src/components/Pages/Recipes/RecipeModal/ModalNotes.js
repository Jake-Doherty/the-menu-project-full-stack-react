import { Box, Divider, Typography } from '@mui/material';
import React from 'react';

export default function ModalNotes({ modalNotes }) {
  return (
    <Box>
      <Divider variant="middle" sx={{ m: 2 }} />
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h6"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          textDecoration: 'underline',
        }}
      >
        Notes
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2, wordWrap: 'break-word' }}>
        {modalNotes}
      </Typography>
    </Box>
  );
}
