import { useLayoutEffect, useContext } from "react";
import { View, FlatList } from "react-native";
import { RootStackParamList } from "../util/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Drinks } from "../data/data";
import DrinkItem from "../components/DrinkItem";
import Drink from "../models/drink";
import IconButton from "../components/IconButton";
import Colors from "../constants/colors";
import { useEffect, useState } from "react";
import { FavoritesContext } from "../store/favoritesContext";

// type DrinkDetailProps = NativeStackScreenProps<
//   RootStackParamList,
//   "DrinkDetailScreen"
// >;

function DrinkDetailScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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
      console.log(json.drinks);
      setData(json.drinks);
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

  function renderDrinkDetailItem(
    image,
    instruction,
    ingredient1,
    ingredient2,
    ingredient3,
    ingredient4,
    ingredient5,
    measure1,
    measure2,
    measure3,
    measure4,
    measure5
  ) {
    return (
      <DrinkItem
        image={image}
        instruction={instruction}
        ingredient1={ingredient1}
        ingredient2={ingredient2}
        ingredient3={ingredient3}
        ingredient4={ingredient4}
        ingredient5={ingredient5}
        measure1={measure1}
        measure2={measure2}
        measure3={measure3}
        measure4={measure4}
        measure5={measure5}
      />
    );
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) =>
          renderDrinkDetailItem(
            item.strDrinkThumb,
            item.strInstructions,
            item.strIngredient1,
            item.strIngredient2,
            item.strIngredient3,
            item.strIngredient4,
            item.strIngredient5,
            item.strMeasure1,
            item.strMeasure2,
            item.strMeasure3,
            item.strMeasure4,
            item.strMeasure5
          )
        }
      />
    </View>
  );
}

export default DrinkDetailScreen;
