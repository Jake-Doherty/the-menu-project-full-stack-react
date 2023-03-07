import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../../context/UserContext.js';
import { useTheme as useMuiTheme } from '@emotion/react';
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import { useRecipe } from '../../../context/RecipeContext.js';
import RecipeModal from '../Recipes/RecipeModal/RecipeModal.js';

export default function Home() {
  const { user } = useUser();
  const theme = useMuiTheme();
  const {
    userRecipes,
    modalOpen,
    setModalOpen,
    modalDishName,
    setModalDishName,
    modalIngredientList,
    setModalIngredientList,
    modalInstructionList,
    setModalInstructionList,
    modalNotes,
    setModalNotes,
    expanded,
    setExpanded,
  } = useRecipe();

  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

  if (!user) {
    return <Navigate to="/auth/sign-in" />;
  }

  const handleModalOpen = (e) => {
    if (e.key === 'Enter') {
      setModalDishName(value.dish_name);
      setModalIngredientList(value.ingredients);
      setModalInstructionList(value.instructions);
      setModalNotes(value.notes);

      setModalOpen(true);
    }

    if (e.target.id === 'open-modal-button') {
      setModalDishName(value.dish_name);
      setModalIngredientList(value.ingredients);
      setModalInstructionList(value.instructions);
      setModalNotes(value.notes);

      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Box component={'section'}>
      <Box
        component={'article'}
        border={2}
        borderRadius={2}
        borderColor={theme.palette.primary.main}
        p={5}
        gap={2}
        sx={{
          width: 'max(275px, 35vw)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h5"
          component="h5"
          sx={{
            color: theme.palette.primary.contrastText,
            margin: '0',
            padding: '0',
          }}
        >
          Quick Search Your Recipes
        </Typography>
        <Autocomplete
          value={value || null}
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onKeyDown={(e) => handleModalOpen(e)}
          disablePortal
          id="autocomplete-search"
          freeSolo
          getOptionLabel={(option) => option.dish_name}
          options={userRecipes}
          sx={{ width: 300 }}
          renderOption={(props, option) => (
            <Box component="li" {...props} key={option.id}>
              {option.dish_name}
            </Box>
          )}
          renderInput={(params) => <TextField {...params} label="Recipe Search" />}
        />
        <Button
          id="open-modal-button"
          variant="contained"
          type="button"
          onClick={(e) => handleModalOpen(e)}
        >
          Open Recipe
        </Button>
      </Box>
      <RecipeModal
        {...{
          modalOpen,
          handleModalClose,
          modalDishName,
          modalIngredientList,
          modalInstructionList,
          modalNotes,
          expanded,
          setExpanded,
          theme,
        }}
      />
    </Box>
  );
}
