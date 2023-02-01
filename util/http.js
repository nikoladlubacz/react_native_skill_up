import { useState } from "react";

const BACKEND_URL =
  "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin";

export async function fetchDrinks() {
  // const [data, setData] = useState([]);

  const drinks = [];

  try {
    const response = await fetch(BACKEND_URL);
    const json = await response.json();
    // setData(json.drinks);
    // console.log(json);
    drinks.push(json.drinks)

    // for (const key in response.data) {
    //   const drinkObj = {
    //     // id: key,
    //     idDrink: response.data[key].idDrink,
    //     strDrink: response.data[key].strDrink,
    //     strDrinkThumb: response.data[key].strDrinkThumb,
    //   };
    //   console.log("-----");
    //   console.log(drinkObj);
    //   drinks.push(drinkObj);
    // }
  } catch (error) {
    console.log(error);
  }

  return drinks;
}
