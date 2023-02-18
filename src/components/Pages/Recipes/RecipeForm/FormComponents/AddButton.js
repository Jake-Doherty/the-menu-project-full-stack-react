import React from "react";
import { IconButton } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function AddButton({
    theme,
    handleAddIngredient,
    handleAddInstruction,
}) {
    return (
        <IconButton
            aria-label={
                handleAddIngredient ? "add ingredient" : "add instruction"
            }
            onClick={
                handleAddIngredient ? handleAddIngredient : handleAddInstruction
            }
            sx={{
                scale: "1.25",
                margin: "0 0 0 5%",
                padding: "5px",
            }}
        >
            <AddBoxIcon
                sx={{
                    color: theme.palette.success.light,
                }}
            />
        </IconButton>
    );
}
