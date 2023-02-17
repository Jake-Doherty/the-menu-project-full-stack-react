import React from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { IconButton } from "@mui/material";

export default function RemoveButton({
    theme,
    handleRemoveClick,
    ingredient,
    instruction,
    index,
}) {
    return (
        <IconButton
            sx={{
                scale: "1",
                margin: "0.5",
                padding: "1",
            }}
            aria-label="delete ingredient"
            onClick={() =>
                handleRemoveClick(ingredient ? ingredient : instruction, index)
            }
        >
            <RemoveCircleIcon
                sx={{
                    color: theme.palette.error.light,
                }}
            />
        </IconButton>
    );
}
