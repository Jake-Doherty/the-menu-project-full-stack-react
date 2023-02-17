import React from "react";
import {
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";

import measurements from "../../../../../measurement-data.js";
import RemoveButton from "./RemoveButton.js";

export default function Ingredient({
    theme,
    index,
    ingredient,
    ingredientRef,
    ingredientList,
    handleRemoveClick,
    handleIngredientInputChange,
}) {
    return (
        <div
            ref={ingredientList.length - 1 === index ? ingredientRef : null}
            className="ingredient"
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <RemoveButton
                {...{ theme, handleRemoveClick, ingredient, index }}
            />
            <Typography
                sx={{
                    color: theme.palette.primary.contrastText,
                }}
                variant="h6"
                component="h6"
            >
                {index + 1}.{" "}
            </Typography>
            <TextField
                name="qty"
                label="Qty."
                inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-99]*",
                }}
                sx={{
                    width: "max(10%, 100px)",
                    "& .MuiInputBase-root *": {
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    },
                }}
                value={ingredient.quantity}
                onChange={(e) => handleIngredientInputChange(e, index)}
            />

            <TextField
                id="outlined-select-measurement"
                label="Unit"
                name="unit"
                select
                value={ingredient.unit}
                onChange={(e) => handleIngredientInputChange(e, index)}
                sx={{
                    width: "max(10%, 125px)",
                    "& .MuiInputBase-root *": {
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    },
                }}
            >
                {measurements.map((option) => (
                    <MenuItem
                        sx={{
                            color: theme.palette.primary.contrastText,
                        }}
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <FormControl
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    "& .MuiInputBase-root *": {
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    },
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: theme.palette.primary.main,
                        },
                    },

                    width: "100%",
                }}
            >
                <InputLabel htmlFor="ingredient">Ingredient</InputLabel>
                <OutlinedInput
                    id="ingredient"
                    label="Ingredient"
                    name="ingredientName"
                    type="text"
                    value={ingredient.ingredientName}
                    onChange={(e) => handleIngredientInputChange(e, index)}
                    sx={{
                        width: "98%",
                    }}
                />
            </FormControl>
        </div>
    );
}
