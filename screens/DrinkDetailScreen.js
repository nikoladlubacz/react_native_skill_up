import { useLayoutEffect, useContext } from "react";
import { View, FlatList } from "react-native";
import { RootStackParamList } from "../util/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Drinks } from "../data/data";
import DrinkItem from "../components/DrinkItem";
// import Drink from "../models/drink";
import IconButton from "../components/IconButton";
import Colors from "../constants/colors";
import { useEffect, useState } from "react";
import { FavoritesContext } from "../store/favoritesContext";
import Drink from "../models/drink";

// type DrinkDetailProps = NativeStackScreenProps<
//   RootStackParamList,
//   "DrinkDetailScreen"
// >;

function DrinkDetailScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [drinks, setDrink] = useState([]);

  const favoriteDrinksCtx = useContext(FavoritesContext);
  const drinkId = route.params.drinkId;
  const drinkName = route.params.drinkName;

  // const selectedDrink = Drinks.find((drinkItem) => drinkItem.id === drinkId);
  let url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
  url += drinkId;

  const getDrink = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();

      const {
        strDrink: name,
        strDrinkThumb: image,
        strCategory: category,
        strAlcoholic: alcoholic,
        strGlass: glass,
        strInstructions: instructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strIngredient14,
        strIngredient15,
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
        strMeasure9,
        strMeasure10,
        strMeasure11,
        strMeasure12,
        strMeasure13,
        strMeasure14,
        strMeasure15,
      } = json.drinks[0];

      console.log("??????????");
      console.log(json.drinks[0]);

      // const ingredients = [
      //   strIngredient1,
      //   strIngredient2,
      //   strIngredient3,
      //   strIngredient4,
      //   strIngredient5,
      //   strIngredient6,
      //   strIngredient7,
      //   strIngredient8,
      //   strIngredient9,
      //   strIngredient10,
      //   strIngredient11,
      //   strIngredient12,
      //   strIngredient13,
      //   strIngredient14,
      //   strIngredient15,
      // ].filter((element) => {
      //   return element != null;
      // });

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
      console.log(ingredients);

      // const measures = [
      //   strMeasure1,
      //   strMeasure2,
      //   strMeasure3,
      //   strMeasure4,
      //   strMeasure5,
      //   strMeasure6,
      //   strMeasure7,
      //   strMeasure8,
      //   strMeasure9,
      //   strMeasure10,
      //   strMeasure11,
      //   strMeasure12,
      //   strMeasure13,
      //   strMeasure14,
      //   strMeasure15,
      // ]
      //   .slice(0, ingredients.length)
      //   .map((element) => {
      //     return element;
      //   });

      const newDrink = new Drink(
        name,
        image,
        category,
        alcoholic,
        glass,
        instructions,
        ingredients
      );

      drinks.push(newDrink);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDrink();
  }, []);

  const drinkIsFavorite = favoriteDrinksCtx.ids.includes(drinkId);

  function changeFavoriteStatusHandler() {
    if (drinkIsFavorite) {
      favoriteDrinksCtx.removeFavorite(drinkId);
    } else {
      favoriteDrinksCtx.addFavorite(drinkId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: drinkName,
      headerRight: () => {
        return (
          <IconButton
            icon={drinkIsFavorite ? "star" : "star-outline"}
            color={Colors.green200}
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  function renderDrinkDetailItem(item) {
    return <DrinkItem drink={item} />;
  }

  return (
    <View>
      <FlatList
        data={drinks}
        renderItem={({ item }) => renderDrinkDetailItem(item)}
      />
    </View>
  );
}

export default DrinkDetailScreen;
