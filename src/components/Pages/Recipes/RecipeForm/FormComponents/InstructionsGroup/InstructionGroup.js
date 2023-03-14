import React from 'react';
import InstructionsHeader from './InstructionsHeader.js';
import InstructionsList from './InstructionsList.js';

export default function InstructionGroup({
  theme,
  instructionList,
  instructionRef,
  handleAddInstruction,
  handleInstructionInputChange,
  handleRemoveClick,
}) {
  return (
    <div
      style={{
        height: 'fit-content',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <InstructionsHeader {...{ theme, handleAddInstruction }} />

      <InstructionsList
        {...{
          theme,
          instructionList,
          instructionRef,
          handleInstructionInputChange,
          handleRemoveClick,
        }}
      />
    </div>
  );
}
