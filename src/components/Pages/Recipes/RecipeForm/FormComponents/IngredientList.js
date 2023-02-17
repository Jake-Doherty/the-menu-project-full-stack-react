import React from "react";
import {
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import measurements from "../../../../../measurement-data.js";
// import Ingredient from "./Ingredient.js";

export default function IngredientList({
    theme,
    ingredientList,
    ingredientRef,
    handleRemoveClick,
    handleIngredientInputChange,
}) {
    return (
        <article
            id="ingredients-section"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "10px",
                width: "80%",
                maxHeight: "190px",
                overflowY: "auto",
                overflowX: "hidden",
                margin: 1,
                paddingTop: 5,
            }}
        >
            {ingredientList.map((ingredient, index) => {
                return (
                    <div
                        ref={
                            ingredientList.length - 1 === index
                                ? ingredientRef
                                : null
                        }
                        className="ingredient"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                        key={index}
                    >
                        <IconButton
                            sx={{
                                scale: "1",
                                margin: "0.5",
                                padding: "1",
                            }}
                            aria-label="delete ingredient"
                            onClick={() => handleRemoveClick(ingredient, index)}
                        >
                            <RemoveCircleIcon
                                sx={{
                                    color: theme.palette.error.light,
                                }}
                            />
                        </IconButton>
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
                            onChange={(e) =>
                                handleIngredientInputChange(e, index)
                            }
                        />

                        <TextField
                            id="outlined-select-measurement"
                            label="Unit"
                            name="unit"
                            select
                            value={ingredient.unit}
                            onChange={(e) =>
                                handleIngredientInputChange(e, index)
                            }
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
                                        color: theme.palette.primary
                                            .contrastText,
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
                            <InputLabel htmlFor="ingredient">
                                Ingredient
                            </InputLabel>
                            <OutlinedInput
                                id="ingredient"
                                label="Ingredient"
                                name="ingredientName"
                                type="text"
                                value={ingredient.ingredientName}
                                onChange={(e) =>
                                    handleIngredientInputChange(e, index)
                                }
                                sx={{
                                    width: "98%",
                                }}
                            />
                        </FormControl>
                    </div>
                );
            })}
        </article>
    );
}
