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
  const drinkName = route.params.drinkName

  // const selectedDrink = Drinks.find((drinkItem) => drinkItem.id === drinkId);
  let url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
  url += drinkId;

  const getDrink = async () => {
    console.log(2);

    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      setData(json.drinks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(1);
    getDrink();
  }, []);

  const drinkIsFavorite = favoriteDrinksCtx.ids.includes(drinkId);

  console.log(3);

  function changeFavoriteStatusHandler() {
    console.log(4);

    if (drinkIsFavorite) {
      favoriteDrinksCtx.removeFavorite(drinkId);
    } else {
      favoriteDrinksCtx.addFavorite(drinkId);
    }
  }

  useLayoutEffect(() => {
    console.log(5);

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
  console.log(6);

  function renderDrinkDetailItem(image, instruction) {
    return <DrinkItem image={image} instruction={instruction} />;
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) =>
          renderDrinkDetailItem(item.strDrinkThumb, item.strInstructions)
        }
      />
    </View>

    // {/* <DrinkItem
    //   image={selectedDrink.image}
    //   instruction={selectedDrink.instruction}
    // /> */}
  );
}

export default DrinkDetailScreen;
