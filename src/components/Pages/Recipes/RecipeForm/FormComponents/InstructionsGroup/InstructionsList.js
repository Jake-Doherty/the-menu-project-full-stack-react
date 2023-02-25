import { Box } from '@mui/material';
import React from 'react';
import Instruction from '../InstructionsGroup/Instruction.js';

export default function InstructionsList({
  theme,
  instructionList,
  instructionRef,
  handleRemoveClick,
  handleInstructionInputChange,
}) {
  return (
    <Box
      id="instructions-section"
      component={'article'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '10px',
        width: '80%',
        maxHeight: '190px',
        overflowY: 'auto',
        overflowX: 'hidden',
        margin: 1,
        paddingTop: '5px',
      }}
    >
      {instructionList.map((instruction, index) => {
        instruction.step = index + 1;
        return (
          <Instruction
            key={index}
            {...{
              theme,
              index,
              instruction,
              instructionList,
              instructionRef,
              handleRemoveClick,
              handleInstructionInputChange,
            }}
          />
        );
      })}
    </Box>
  );
}
