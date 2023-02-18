import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext.js";

import { Typography, Button, Box } from "@mui/material/";

import { useTheme as useMuiTheme } from "@mui/material/styles";

import useRecipeFormFunctions from "../../../../hooks/useRecipeFormFunctions.js";
import DishNameInput from "./FormComponents/DishNameInput.js";
import InstructionGroup from "./FormComponents/InstructionsGroup/InstructionGroup.js";
import IngredientGroup from "./FormComponents/IngredientsGroup/IngredientGroup.js";
import Notes from "./FormComponents/NotesGroup/Notes.js";

export default function RecipeForm() {
    const { user } = useUser();

    const theme = useMuiTheme();

    const {
        dishName,
        handleDishNameChange,
        ingredientList,
        ingredientRef,
        handleAddIngredient,
        handleIngredientInputChange,
        instructionList,
        instructionRef,
        handleAddInstruction,
        handleInstructionInputChange,
        handleRemoveClick,
        notes,
        handleNoteInputChange,
        handleSaveRecipe,
    } = useRecipeFormFunctions();

    if (!user) {
        return <Navigate to="/auth/sign-in" />;
    }

    return (
        <Box
            id="recipe-form"
            component={"section"}
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
            <Typography
                mt={1}
                variant="h6"
                color={theme.palette.primary.contrastText}
            >
                Add A Recipe
            </Typography>

            <DishNameInput {...{ theme, dishName, handleDishNameChange }} />

            <IngredientGroup
                {...{
                    theme,
                    ingredientList,
                    ingredientRef,
                    handleAddIngredient,
                    handleIngredientInputChange,
                    handleRemoveClick,
                }}
            />

            <InstructionGroup
                {...{
                    theme,
                    instructionList,
                    instructionRef,
                    handleAddInstruction,
                    handleInstructionInputChange,
                    handleRemoveClick,
                }}
            />

            <Notes {...{ theme, notes, handleNoteInputChange }} />

            <Button onClick={handleSaveRecipe}>Save Recipe</Button>
        </Box>
    );
}
