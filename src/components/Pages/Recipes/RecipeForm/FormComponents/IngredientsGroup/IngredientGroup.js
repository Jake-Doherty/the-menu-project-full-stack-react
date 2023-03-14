import React from 'react';
import IngredientList from './IngredientList.js';
import IngredientsHeader from './IngredientsHeader.js';

export default function IngredientGroup({
  theme,
  ingredientList,
  ingredientRef,
  handleAddIngredient,
  handleIngredientInputChange,
  handleRemoveClick,
}) {
  return (
    <div
      style={{
        height: 'fit-content',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
          handleIngredientInputChange,
          handleRemoveClick,
        }}
      />
    </div>
  );
}
