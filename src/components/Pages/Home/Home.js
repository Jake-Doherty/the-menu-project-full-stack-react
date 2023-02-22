import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext.js";
import { useTheme as MuiTheme } from "@emotion/react";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { useRecipe } from "../../../context/RecipeContext.js";

export default function Home() {
    const { user } = useUser();

    const theme = MuiTheme();
    const { userRecipes } = useRecipe();

    if (!user) {
        return <Navigate to="/auth/sign-in" />;
    }

    return (
        <Box
            component={"section"}
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                justifySelf: "flex-start",
                height: "100%",
                gap: 2,
            }}
        >
            <Box
                component={"article"}
                border={2}
                borderRadius={2}
                borderColor={theme.palette.primary.main}
                p={5}
                gap={2}
                sx={{
                    width: "max(275px, 35vw)",
                    minHeight: "50px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                <Typography
                    variant="h4"
                    component={"h4"}
                    sx={{
                        color: theme.palette.primary.contrastText,
                        margin: "0",
                        padding: "0",
                    }}
                >
                    Quick Search Your Recipes
                </Typography>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    freeSolo
                    getOptionLabel={(option) => option.dish_name}
                    options={userRecipes}
                    sx={{ width: 300 }}
                    renderOption={(props, option) => (
                        <Box component="li" {...props} key={option.id}>
                            {option.dish_name}
                        </Box>
                    )}
                    renderInput={(params) => (
                        <TextField {...params} label="Recipe Search" />
                    )}
                />
            </Box>
            <Box
                component={"article"}
                border={2}
                borderRadius={2}
                borderColor={theme.palette.primary.main}
                p={5}
                gap={2}
                sx={{
                    width: "max(275px, 35vw)",
                    minHeight: "50px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                <Typography
                    variant="h4"
                    component={"h4"}
                    sx={{
                        color: theme.palette.primary.contrastText,
                        margin: "0",
                        padding: "0",
                    }}
                >
                    Recipes
                </Typography>
                {/* <Box component={"ul"}>
                    {userRecipes.map((recipe) => (
                        <Box
                            key={recipe.id}
                            variant="h6"
                            component={"li"}
                            sx={{
                                color: theme.palette.primary.contrastText,
                                margin: "0",
                                padding: "0",
                            }}
                        >
                            Name: {recipe.dish_name}, Ingredients:{" "}
                            {recipe.ingredients.length}, Instructions:
                            {recipe.instructions.length}
                        </Box>
                    ))}
                </Box> */}
            </Box>
        </Box>
    );
}
