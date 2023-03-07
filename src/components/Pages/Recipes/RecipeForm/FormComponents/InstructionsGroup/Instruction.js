import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import React from 'react';
import RemoveButton from '../RemoveButton.js';

export default function Instruction({
  theme,
  index,
  instruction,
  instructionList,
  instructionRef,
  handleRemoveClick,
  handleInstructionInputChange,
}) {
  return (
    <div
      ref={instructionList.length - 1 === index ? instructionRef : null}
      className="instruction"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <RemoveButton
        {...{
          theme,
          handleRemoveClick,
          instruction,
          index,
        }}
      />

      <FormControl
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          '& .MuiInputBase-root *': {
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
            },
          },
        }}
      >
        <InputLabel htmlFor="instruction">{`Step ${instruction.step}`}</InputLabel>

        <OutlinedInput
          sx={{
            width: '99%',
          }}
          id="instruction"
          type="text"
          label={`Step ${index + 1}`}
          value={instruction.instruction}
          onChange={(e) => handleInstructionInputChange(e, index)}
        />
      </FormControl>
    </div>
  );
}
