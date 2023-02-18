import React from "react";
import IngredientList from "./IngredientList.js";
import IngredientsHeader from "./IngredientsHeader.js";

export default function IngredientGroup({
    theme,
    ingredientList,
    ingredientRef,
    handleAddIngredient,
    handleIngredientInputChange,
    handleRemoveClick,
}) {
    return (
        <>
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
        </>
    );
}
