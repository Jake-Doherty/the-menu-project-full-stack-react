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
import IngredientList from "./FormComponents/IngredientList.js";

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

    // const ingredient = (
    //     <FormControl
    //         sx={{
    //             display: "flex",
    //             flexDirection: "row",
    //             alignItems: "center",
    //             gap: "20px",
    //             "& .MuiInputBase-root *": {
    //                 borderColor: theme.palette.primary.main,
    //                 color: theme.palette.primary.contrastText,
    //             },
    //             "& .MuiOutlinedInput-root": {
    //                 "&.Mui-focused fieldset": {
    //                     borderColor: theme.palette.primary.main,
    //                 },
    //             },
    //             m: 1,
    //             width: "80%",
    //         }}
    //     >
    //         <InputLabel htmlFor="ingredient">Ingredient</InputLabel>
    //         <OutlinedInput id="ingredient" type="text" label="Ingredient" />
    //         <RemoveCircleIcon
    //             sx={{
    //                 color: theme.palette.error.light,
    //             }}
    //             color="primary"
    //         />
    //     </FormControl>
    // );

    // ingredientSection.append(ingredient);
    // };

    return (
        <Box
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
            <Typography variant="h6" color="primary">
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
                                // onClick={handleClickShowPassword}
                                // onMouseDown={handleMouseDownPassword}
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
                                gutterBottom
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
                                // helperText="Please select your currency"
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
            <Box>
                <IngredientList />
            </Box>
        </Box>
    );
}
