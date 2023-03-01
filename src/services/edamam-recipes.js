const app_id = process.env.REACT_APP_EDAMAM_ID;
const app_key = process.env.REACT_APP_EDAMAM_KEY;

export async function getEdamamRecipes(query) {
  // console.log('query', query);
  const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${app_id}&app_key=${app_key}`;
  const response = await fetch(baseUrl);

  const data = await response.json();

  return data;
}

export async function getMoreEdamamRecipes(url) {
  const response = await fetch(url);

  const data = await response.json();

  // console.log('MOARdata', data);

  return data;
}
