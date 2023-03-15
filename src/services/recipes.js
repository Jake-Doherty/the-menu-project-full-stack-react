import { client, checkError } from './client.js';

export async function getNonSecretRecipes() {
  const response = await client.from('recipes').select('*').match({ secret_recipe: false });

  return checkError(response);
}

export async function getUserRecipes(userId) {
  const response = await client.from('recipes').select('*').match({ user_id: userId });

  return checkError(response);
}

export async function insertRecipe(
  userId,
  { dishName, ingredients, instructions, notes, tags, servings, totalTime }
) {
  const response = await client
    .from('recipes')
    .insert({
      dish_name: dishName,
      ingredients: ingredients,
      instructions: instructions,
      notes: notes,
      tags: tags,
      servings: servings,
      total_time: totalTime,
    })
    .match({ user_id: userId })
    .maybeSingle();

  return response;
}
