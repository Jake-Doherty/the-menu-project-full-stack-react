import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext.js";

import {
    InputLabel,
    FormControl,
    OutlinedInput,
    Typography,
    IconButton,
    Button,
    Box,
} from "@mui/material/";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useTheme as useMuiTheme } from "@mui/material/styles";

import IngredientList from "./FormComponents/IngredientList.js";
import useRecipeFormFunctions from "../../../../hooks/useRecipeFormFunctions.js";
import IngredientsHeader from "./FormComponents/IngredientsHeader.js";
import DishNameInput from "./FormComponents/DishNameInput.js";
import InstructionsHeader from "./FormComponents/InstructionsHeader.js";

export default function RecipeForm() {
    const { user } = useUser();

    const theme = useMuiTheme();

    const {
        ingredientList,
        ingredientRef,
        handleAddIngredient,
        handleIngredientInputChange,
        instructionList,
        instructionRef,
        handleAddInstruction,
        handleInstructionInputChange,
        handleRemoveClick,
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

            <DishNameInput {...{ theme }} />

            <IngredientsHeader
                {...{
                    theme,
                    handleAddIngredient,
                }}
            />

            <IngredientList
                {...{
                    theme,
                    ingredientList,
                    ingredientRef,
                    handleRemoveClick,
                    handleIngredientInputChange,
                }}
            />

            {/* INSTRUCTIONS HERE */}
            <InstructionsHeader {...{ theme, handleAddInstruction }} />

            <Box
                id="instructions-section"
                component={"article"}
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
                    paddingTop: "5px",
                }}
            >
                {instructionList.map((instruction, index) => {
                    instruction.step = index + 1;
                    return (
                        <div
                            ref={
                                instructionList.length - 1 === index
                                    ? instructionRef
                                    : null
                            }
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
                                    value={instruction.instruction}
                                    onChange={(e) =>
                                        handleInstructionInputChange(e, index)
                                    }
                                />
                            </FormControl>
                        </div>
                    );
                })}
            </Box>
            <Button>Save Recipe</Button>
        </Box>
    );
}
