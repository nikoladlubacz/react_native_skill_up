import Drink from "../models/drink";

export async function fetchDrinks(alcohol) {
  const fetchedDrinks = [];
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${alcohol}`
  );
  const json = await response.json();
  const { drinks } = json;
  const mappedDrinks = drinks.map((element) => {
    const { idDrink, strDrink, strDrinkThumb } = element;
    return {
      id: idDrink,
      name: strDrink,
      image: strDrinkThumb,
    };
  });
  fetchedDrinks.push(mappedDrinks);
  return fetchedDrinks;
}

export async function fetchDrinkDetails(drinkId) {
  const fetchedDrink = [];
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
  );

  const mappedDrink = await mapDrink(response);
  fetchedDrink.push(mappedDrink);
  return fetchedDrink;
}

export async function fetchRandomDrink() {
  const fetchedDrink = [];
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/random.php`
  );

  const mappedDrink = await mapDrink(response);
  fetchedDrink.push(mappedDrink);
  return fetchedDrink;
}

async function mapDrink(response) {
  const json = await response.json();
  const {
    idDrink: drinkId, strDrink: nameDrink, strDrinkThumb: image, strInstructions: instructions, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5, strIngredient6, strIngredient7, strIngredient8, strIngredient9, strIngredient10, strIngredient11, strIngredient12, strIngredient13, strIngredient14, strIngredient15, strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5, strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10, strMeasure11, strMeasure12, strMeasure13, strMeasure14, strMeasure15,
  } = json.drinks[0];

  const ingredients = [
    (strMeasure1 ?? "") + " " + strIngredient1,
    (strMeasure2 ?? "") + " " + strIngredient2,
    (strMeasure3 ?? "") + " " + strIngredient3,
    (strMeasure4 ?? "") + " " + strIngredient4,
    (strMeasure5 ?? "") + " " + strIngredient5,
    (strMeasure6 ?? "") + " " + strIngredient6,
    (strMeasure7 ?? "") + " " + strIngredient7,
    (strMeasure8 ?? "") + " " + strIngredient8,
    (strMeasure9 ?? "") + " " + strIngredient9,
    (strMeasure10 ?? "") + " " + strIngredient10,
    (strMeasure11 ?? "") + " " + strIngredient11,
    (strMeasure12 ?? "") + " " + strIngredient12,
    (strMeasure13 ?? "") + " " + strIngredient13,
    (strMeasure14 ?? "") + " " + strIngredient14,
    (strMeasure15 ?? "") + " " + strIngredient15,
  ].filter((element) => {
    return element != " null";
  });

  const mappedDrink = new Drink(
    drinkId,
    nameDrink,
    image,
    instructions,
    ingredients
  );
  return mappedDrink;
}
