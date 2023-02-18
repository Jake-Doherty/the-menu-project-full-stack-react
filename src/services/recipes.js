import { client, checkError } from "./client.js";

export async function getNonSecretRecipes(userId, recipes) {
    const response = await client
        .from("recipes")
        .select("*")
        .match({ secret_recipe: false })
        .maybeSingle();

    return checkError(response);
}

export async function getUserRecipes(userId, recipes) {
    const response = await client
        .from("recipes")
        .select("*")
        .match({ user_id: userId })
        .maybeSingle();

    return checkError(response);
}

export async function insertRecipe(
    userId,
    { dishName, ingredients, instructions, notes }
) {
    const response = await client
        .from("recipes")
        .insert({
            dish_name: dishName,
            ingredients: ingredients,
            instructions: instructions,
            notes: notes,
        })
        .match({ user_id: userId })
        .maybeSingle();

    return response;
}
