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
    open,
    setOpen,
    setDishName,
    setIngredientList,
    setInstructionList,
    ingredientList,
    instructionList,
    setNotes,
    dishName,
    notes,
    handleSaveRecipe,
    snackbarSeverity,
  } = useRecipe();

  const {
    ingredientRef,
    instructionRef,
    handleDishNameChange,
    handleAddIngredient,
    handleIngredientInputChange,
    handleAddInstruction,
    handleInstructionInputChange,
    handleRemoveClick,
    handleNoteInputChange,
  } = useRecipeFormFunctions({
    setDishName,
    setIngredientList,
    setInstructionList,
    ingredientList,
    instructionList,
    setNotes,
    dishName,
    notes,
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

      <DishNameInput {...{ theme, dishName, handleDishNameChange }} />

      <DishAttributes />

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

      {loading ? null : (
        <Button type="submit" variant="contained" sx={{ mb: 2 }}>
          Save Recipe
        </Button>
      )}
    </Box>
  );
}
