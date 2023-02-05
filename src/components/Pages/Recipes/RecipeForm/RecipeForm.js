import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext.js";
import { InputLabel, FormControl, OutlinedInput } from "@mui/material/";

import Box from "@mui/material/Box";

export default function RecipeForm() {
    const { user } = useUser();

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
            }}
        >
            <h3>Add A Recipe</h3>
            {/* DISH NAME HERE */}
            <FormControl sx={{ m: 1, width: "90%" }} variant="outlined">
                <InputLabel margin="dense" htmlFor="outlined-dish-name">
                    Dish Name
                </InputLabel>
                <OutlinedInput
                    name="dish-name"
                    id="outlined-dish-name"
                    type="text"
                    label="dish-name"
                />
            </FormControl>
            {/* INGREDIENTS HERE */}
            <FormControl sx={{ m: 1, width: "90%" }}>
                <InputLabel htmlFor="ingredient">Ingredient</InputLabel>
                <OutlinedInput id="ingredient" type="text" label="ingredient" />
            </FormControl>
        </Box>
    );
}
