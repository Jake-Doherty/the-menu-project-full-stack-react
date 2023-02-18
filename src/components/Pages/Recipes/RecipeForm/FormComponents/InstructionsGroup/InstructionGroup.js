import React from "react";
import InstructionsHeader from "./InstructionsHeader.js";
import InstructionsList from "./InstructionsList.js";

export default function InstructionGroup({
    theme,
    instructionList,
    instructionRef,
    handleAddInstruction,
    handleInstructionInputChange,
    handleRemoveClick,
}) {
    return (
        <>
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
        </>
    );
}
