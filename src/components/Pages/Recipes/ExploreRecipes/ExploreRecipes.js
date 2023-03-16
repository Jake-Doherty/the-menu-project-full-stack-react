import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../../../context/UserContext.js';
import { useTheme as useMuiTheme } from '@emotion/react';

import { Box, FormControl, InputLabel, OutlinedInput, Typography } from '@mui/material/';

import { useRecipe } from '../../../../context/RecipeContext.js';

import RecipeModal from '../RecipeModal/RecipeModal.js';

export default function ExploreRecipes() {
  const { user } = useUser();
  const theme = useMuiTheme();
  const {
    nonSecretRecipes,
    query,
    setQuery,
    expanded,
    setExpanded,
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
    modalServings,
    setModalServings,
    modalTotalTime,
    setModalTotalTime,
    searchInput,
    setSearchInput,
  } = useRecipe();

  const handleSearchRequest = (event) => {
    if (event.key === 'Enter') {
      setQuery(searchInput);
      setSearchInput('');
    }
  };

  const handleModalOpen = (e, recipe) => {
    setModalDishName(recipe.dish_name);
    setModalIngredientList(recipe.ingredients);
    setModalInstructionList(recipe.instructions);
    setModalNotes(recipe.notes);
    setModalServings(recipe.servings);
    setModalTotalTime(recipe.total_time);

    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  if (!user) {
    return <Navigate to="/auth/sign-in" />;
  }

  return (
    <Box
      component={'section'}
      sx={{
        display: 'grid',
        gridTemplateRows: '150px 1fr',
        justifyContent: 'center',
        alignItems: 'stretch',
        justifyItems: 'center',
        height: '100%',
        gap: 2,
      }}
    >
      <Box
        component={'article'}
        border={2}
        borderRadius={2}
        borderColor={theme.palette.primary.main}
        p={1}
        gap={2}
        sx={{
          width: 'max(320px, 40vw)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h5"
          component={'h5'}
          sx={{
            color: theme.palette.primary.contrastText,
            margin: '0',
            padding: '0',
          }}
        >
          Explore Recipes
        </Typography>
        <FormControl>
          <InputLabel>Recipe Search...</InputLabel>
          <OutlinedInput
            label="Recipe Search.."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => handleSearchRequest(e)}
          />
        </FormControl>
        {query && (
          <Typography
            variant="h6"
            component={'h6'}
            sx={{
              color: theme.palette.primary.contrastText,
              margin: '0',
              padding: '0',
            }}
          >
            Showing {nonSecretRecipes.length} results for {query}
          </Typography>
        )}
      </Box>
      <Box
        component={'article'}
        border={2}
        borderRadius={2}
        borderColor={theme.palette.primary.main}
        p={1}
        gap={2}
        sx={{
          width: 'max(320px, 70vw)',
          maxHeight: 'max(275px, 65vh)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
      >
        <Typography
          variant="h6"
          component={'h6'}
          sx={{
            color: theme.palette.primary.contrastText,
            margin: '0',
            padding: '0',
          }}
        >
          Displaying {nonSecretRecipes.length} Recipes
        </Typography>
        <Box
          component={'ul'}
          sx={{
            width: '97%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gridTemplateRows: 'repeat(auto-fit, minmax(60px, 1fr))',
            gridAutoFlow: 'row',
            gap: '10px',
            listStyle: 'none',
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: '10px',
            margin: '0px',
            justifyItems: 'center',
            alignItems: 'stretch',
            alignContent: 'stretch',
          }}
        >
          {nonSecretRecipes.map((recipe) => (
            <Box
              key={recipe.id}
              className="menu-project-recipe"
              variant="h6"
              component={'li'}
              onClick={(e) => handleModalOpen(e, recipe)}
              sx={{
                height: '60px',
                width: '120px',
                color: theme.palette.primary.contrastText,
                cursor: 'pointer',
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: theme.palette.primary.main,
                textAlign: 'center',
                wordBreak: 'break-word',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                  borderColor: theme.palette.primary.dark,
                  transition: 'all 0.2s ease-in-out',
                },
              }}
            >
              {recipe.dish_name}
            </Box>
          ))}

          <RecipeModal
            {...{
              modalOpen,
              handleModalClose,
              modalDishName,
              modalIngredientList,
              modalInstructionList,
              modalNotes,
              modalServings,
              modalTotalTime,
              expanded,
              setExpanded,
              theme,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
