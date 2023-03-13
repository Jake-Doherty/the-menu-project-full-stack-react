import { Box, Divider, Modal } from '@mui/material';

import React from 'react';
import ModalDishName from './ModalDishName.js';
import ModalIngredients from './ModalIngredients.js';
import ModalInstructions from './ModalInstructions.js';
import ModalNotes from './ModalNotes.js';

export default function RecipeModal({
  modalOpen,
  handleModalClose,
  modalDishName,
  modalIngredientList,
  modalInstructionList,
  modalNotes,
  expanded,
  setExpanded,
  theme,
}) {
  return (
    <Modal
      outline="0"
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-recipe-dish-name"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'max(275px, 40vw)',
          height: 'max(275px, 80vh)',
          bgcolor: theme.palette.background.paper,
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: theme.palette.primary.main,
          borderRadius: 2,
          boxShadow: 24,
          overflow: 'auto',
          padding: '8px 32px 16px 32px',
          '& *': {
            color: theme.palette.primary.contrastText,
          },
        }}
      >
        <ModalDishName {...{ modalDishName, theme, handleModalClose }} />

        <Divider variant="middle" sx={{ m: 2 }} />

        <ModalIngredients {...{ modalIngredientList }} />

        <Divider variant="middle" sx={{ m: 2 }} />

        <ModalInstructions {...{ modalInstructionList, expanded, setExpanded, theme }} />

        {modalNotes ? <ModalNotes {...{ modalNotes }} /> : null}
      </Box>
    </Modal>
  );
}
