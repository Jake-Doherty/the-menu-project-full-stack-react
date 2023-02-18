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
                margin: "0 2.5%",
                padding: "1",
                m: 1,
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
