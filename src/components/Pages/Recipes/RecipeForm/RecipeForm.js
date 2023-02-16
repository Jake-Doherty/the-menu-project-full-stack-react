import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext.js";
import {
    InputLabel,
    FormControl,
    OutlinedInput,
    Typography,
    IconButton,
    TextField,
    MenuItem,
} from "@mui/material/";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useTheme as useMuiTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
// import IngredientList from "./FormComponents/IngredientList.js";

export default function RecipeForm() {
    const { user } = useUser();

    const theme = useMuiTheme();

    const measurements = [
        {
            value: "Cup",
            label: "Cup",
        },
        {
            value: "TBSP",
            label: "TBSP",
        },
        {
            value: "TSP",
            label: "TSP",
        },
        {
            value: "Fl Oz",
            label: "Fl Oz",
        },
    ];

    const [ingredientList, setIngredientList] = useState([
        {
            unit: "",
            quantity: "",
            ingredientName: "",
        },
    ]);

    const [instructionList, setInstructionList] = useState([
        {
            step: "",
            instruction: "",
        },
    ]);

    if (!user) {
        return <Navigate to="/auth/sign-in" />;
    }

    const handleAddIngredient = () => {
        // const ingredientSection = document.getElementById(
        //     "ingredients-section"
        // );

        setIngredientList([
            ...ingredientList,
            {
                unit: "",
                quantity: "",
                ingredientName: "",
            },
        ]);
    };

    const handleAddInstruction = () => {
        setInstructionList([
            ...instructionList,
            {
                step: "",
                instruction: "",
            },
        ]);
    };

    const handleRemoveClick = (obj, index) => {
        if (Object.keys(obj)[0] === "unit") {
            const list = [...ingredientList];
            list.splice(index, 1);
            setIngredientList(list);
        }

        if (Object.keys(obj)[0] === "step") {
            const list = [...instructionList];
            list.splice(index, 1);
            setInstructionList(list);
        }
    };

    return (
        <Box
            component={"section"}
            id="recipe-form"
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "max(calc(100vh - 80px), 400px)",
                width: "max(calc(100vw / 2), 350px)",
                alignItems: "center",
                justifyContent: "flex-start",
                border: 2,
                borderColor: theme.palette.primary.main,
                borderRadius: "10px",
                transition: "all 0.5s ease",
            }}
        >
            <Typography mt={1} variant="h6" color="primary">
                Add A Recipe
            </Typography>

            {/* DISH NAME HERE */}
            <FormControl
                sx={{
                    "& .MuiInputBase-root *": {
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    },
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: theme.palette.primary.main,
                        },
                    },
                    m: 1,
                    width: "80%",
                }}
                variant="outlined"
            >
                <InputLabel margin="dense" htmlFor="outlined-dish-name">
                    Dish Name
                </InputLabel>
                <OutlinedInput
                    name="dish-name"
                    id="outlined-dish-name"
                    type="text"
                    label="Dish Name"
                />
            </FormControl>

            {/* INGREDIENTS HERE */}
            <Typography
                sx={{
                    color: theme.palette.primary.contrastText,
                }}
                variant="h6"
                component="h6"
            >
                Ingredients
            </Typography>
            <section
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
                                onClick={() =>
                                    handleRemoveClick(ingredient, index)
                                }
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
                                label="Qty."
                                inputProps={{
                                    inputMode: "numeric",
                                    pattern: "[0-99]*",
                                }}
                                sx={{
                                    width: "max(10%, 100px)",
                                }}
                            />

                            <TextField
                                sx={{
                                    width: "max(10%, 125px)",
                                }}
                                id="outlined-select-measurement"
                                select
                                label="Unit"
                                defaultValue={measurements[0].value}
                            >
                                {measurements.map((option) => (
                                    <MenuItem
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
                                        color: theme.palette.primary
                                            .contrastText,
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": {
                                            borderColor:
                                                theme.palette.primary.main,
                                        },
                                    },

                                    width: "100%",
                                }}
                            >
                                <InputLabel htmlFor="ingredient">
                                    Ingredient
                                </InputLabel>
                                <OutlinedInput
                                    sx={{
                                        width: "98%",
                                    }}
                                    id="ingredient"
                                    type="text"
                                    label="Ingredient"
                                    defaultValue={ingredient.ingredientName}
                                />
                            </FormControl>
                        </div>
                    );
                })}
            </section>
            <IconButton
                aria-label="delete ingredient"
                onClick={handleAddIngredient}
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

            {/* INSTRUCTIONS HERE */}
            <Typography
                sx={{
                    color: theme.palette.primary.contrastText,
                }}
                variant="h6"
                component="h6"
            >
                Instructions
            </Typography>
            <Box
                id="instructions-section"
                component={"section"}
                sx={{
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
                }}
            >
                {instructionList.map((instruction, index) => {
                    instruction.step = index + 1;
                    return (
                        <div
                            className="instruction"
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
                                aria-label="delete instruction"
                                onClick={() =>
                                    handleRemoveClick(instruction, index)
                                }
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
                            <FormControl
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    "& .MuiInputBase-root *": {
                                        borderColor: theme.palette.primary.main,
                                        color: theme.palette.primary
                                            .contrastText,
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": {
                                            borderColor:
                                                theme.palette.primary.main,
                                        },
                                    },

                                    width: "100%",
                                }}
                            >
                                <InputLabel htmlFor="instruction">
                                    {`Step ${instruction.step}`}
                                </InputLabel>
                                <OutlinedInput
                                    sx={{
                                        width: "99%",
                                    }}
                                    id="instruction"
                                    type="text"
                                    label={`Step ${index + 1}`}
                                    defaultValue={instruction.instruction}
                                />
                            </FormControl>
                        </div>
                    );
                })}
            </Box>
            <IconButton
                aria-label="delete ingredient"
                onClick={handleAddInstruction}
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
        </Box>
    );
}
