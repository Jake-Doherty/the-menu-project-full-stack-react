import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext.js";
import {
    InputLabel,
    FormControl,
    OutlinedInput,
    Typography,
} from "@mui/material/";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useTheme as useMuiTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import IngredientList from "./FormComponents/IngredientList.js";

export default function RecipeForm() {
    const { user } = useUser();

    const theme = useMuiTheme();

    if (!user) {
        return <Navigate to="/auth/sign-in" />;
    }

    const handleAddIngredient = () => {
        console.log("Add Ingredient");

        // const ingredientSection = document.getElementById(
        //     "ingredients-section"
        // );

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
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "max(calc(100vh - 80px), 400px)",
                width: "max(calc(100vw - 400px), 350px)",
                alignItems: "center",
                justifyContent: "center",
                border: 2,
                borderColor: theme.palette.primary.main,
                borderRadius: "10px",
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
                    justifyContent: "center",
                    width: "100%",
                }}
            >
                <FormControl
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "20px",
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
                >
                    <InputLabel htmlFor="ingredient">Ingredient</InputLabel>
                    <OutlinedInput
                        id="ingredient"
                        type="text"
                        label="Ingredient"
                    />
                    <RemoveCircleIcon
                        sx={{
                            color: theme.palette.error.light,
                        }}
                        color="primary"
                    />
                </FormControl>
            </section>
            <AddBoxIcon
                onClick={handleAddIngredient}
                sx={{
                    color: theme.palette.success.light,
                }}
            />
            <Box>
                <IngredientList />
            </Box>
        </Box>
    );
}
