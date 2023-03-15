import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../../../context/UserContext.js';

import { Typography, Button, Box, Snackbar, Alert, IconButton } from '@mui/material/';
import CloseIcon from '@mui/icons-material/Close';

import { useTheme as useMuiTheme } from '@mui/material/styles';

import useRecipeFormFunctions from '../../../../hooks/useRecipeFormFunctions.js';
import DishNameInput from './FormComponents/DishNameInput.js';
import InstructionGroup from './FormComponents/InstructionsGroup/InstructionGroup.js';
import IngredientGroup from './FormComponents/IngredientsGroup/IngredientGroup.js';
import Notes from './FormComponents/NotesGroup/Notes.js';
import { useRecipe } from '../../../../context/RecipeContext.js';
import DishAttributes from './FormComponents/DishAttributes/DishAttributes.js';

export default function RecipeForm() {
  const { user, loading } = useUser();

  const theme = useMuiTheme();

  const {
    snackbarSeverity,
    handleSaveRecipe,
    open,
    setOpen,
    dishName,
    setDishName,
    ingredientList,
    setIngredientList,
    instructionList,
    setInstructionList,
    notes,
    setNotes,
    tags,
    setTags,
    servings,
    setServings,
    totalTime,
    setTotalTime,
    isSecret,
    setIsSecret,
  } = useRecipe();

  const {
    ingredientRef,
    instructionRef,
    handleDishNameChange,
    handleIngredientInputChange,
    handleAddIngredient,
    handleInstructionInputChange,
    handleAddInstruction,
    handleNoteInputChange,
    handleAddAttribute,
    handleRemoveClick,
  } = useRecipeFormFunctions({
    dishName,
    setDishName,
    ingredientList,
    setIngredientList,
    instructionList,
    setInstructionList,
    notes,
    setNotes,
    tags,
    setTags,
    servings,
    setServings,
    totalTime,
    setTotalTime,
    isSecret,
    setIsSecret,
  });

  if (!user) {
    return <Navigate to="/auth/sign-in" />;
  }

  const handleClose = (event, reason) => {
    if (reason === '') {
      return;
    }

    setOpen(false);
  };

  return (
    <Box
      id="recipe-form"
      component={'form'}
      onSubmit={(e) => handleSaveRecipe(e)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        border: 2,
        mb: 2,
        borderColor: theme.palette.primary.main,
        borderRadius: '10px',
        transition: 'all 0.5s ease',
        overflowY: 'auto',
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        action={
          <IconButton aria-label="close" color="inherit" sx={{ p: 0.5 }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
      >
        <Alert
          onClick={handleClose}
          onClose={handleClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarSeverity === 'success'
            ? 'Recipe Saved!'
            : 'Error Saving Recipe, Please Try Again.'}
        </Alert>
      </Snackbar>

      <Typography mt={1} variant="h6" color={theme.palette.primary.contrastText}>
        Add A Recipe
      </Typography>

      <Typography
        variant="body2"
        color={theme.palette.primary.contrastText}
        sx={{
          opacity: '0.7',
        }}
      >
        * Indicates a required field
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

      <DishAttributes
        {...{
          theme,
          tags,
          setTags,
          servings,
          setServings,
          totalTime,
          setTotalTime,
          isSecret,
          setIsSecret,
          handleAddAttribute,
        }}
      />

      {loading ? null : (
        <Button type="submit" variant="contained" sx={{ m: 2 }}>
          Save Recipe
        </Button>
      )}
    </Box>
  );
}
