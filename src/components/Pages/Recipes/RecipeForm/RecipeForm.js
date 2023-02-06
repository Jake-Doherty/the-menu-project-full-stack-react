import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext.js";
import { InputLabel, FormControl, OutlinedInput } from "@mui/material/";
import { useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import IngredientList from "./FormComponents/IngredientList.js";

export default function RecipeForm() {
    const { user } = useUser();

    const theme = useTheme();

    if (!user) {
        return <Navigate to="/auth/sign-in" />;
    }

    // Pausing on this for now until theme has been set up.
    // const handleAddIngredient = () => {
    //     console.log("Add Ingredient");
    // };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "max(calc(100vh - 80px), 400px)",
                width: "max(calc(100vw - 400px), 350px)",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid black",
                borderRadius: "10px",
                backgroundColor: theme.palette.primary.light,
            }}
        >
            <h3>Add A Recipe</h3>

            {/* DISH NAME HERE */}
            <FormControl
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: theme.palette.primary.dark,
                        },
                    },
                    "& label.Mui-focused": {
                        position: "absolute",
                        left: "-5px",
                        margin: "0",
                        padding: "0 5px",
                        borderRadius: "5px",
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.primary.contrastText,
                        fontWeight: "700",
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
                    sx={{ backgroundColor: theme.palette.background.paper }}
                    name="dish-name"
                    id="outlined-dish-name"
                    type="text"
                    label="Dish Name"
                />
            </FormControl>

            {/* INGREDIENTS HERE */}
            <FormControl
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: theme.palette.primary.dark,
                        },
                    },
                    "& label.Mui-focused": {
                        position: "absolute",
                        left: "-5px",
                        margin: "0",
                        padding: "0 5px",
                        borderRadius: "5px",
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.primary.contrastText,
                        fontWeight: "700",
                    },
                    m: 1,
                    width: "80%",
                }}
            >
                <InputLabel htmlFor="ingredient">Ingredient</InputLabel>
                <OutlinedInput
                    sx={{ backgroundColor: theme.palette.background.paper }}
                    id="ingredient"
                    type="text"
                    label="Ingredient"
                />
            </FormControl>
            <Box>
                <IngredientList />
            </Box>
        </Box>
    );
}
