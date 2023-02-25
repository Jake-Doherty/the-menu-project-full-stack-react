import React from 'react';
import Ingredient from './Ingredient.js';

export default function IngredientList({
  theme,
  ingredientList,
  ingredientRef,
  handleRemoveClick,
  handleIngredientInputChange,
}) {
  return (
    <article
      id="ingredients-section"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '10px',
        width: '80%',
        maxHeight: '190px',
        overflowY: 'auto',
        overflowX: 'hidden',
        margin: 1,
        paddingTop: 5,
      }}
    >
      {ingredientList.map((ingredient, index) => {
        return (
          <Ingredient
            key={index}
            {...{
              theme,
              index,
              ingredient,
              ingredientList,
              ingredientRef,
              handleRemoveClick,
              handleIngredientInputChange,
            }}
          />
        );
      })}
    </article>
  );
}
