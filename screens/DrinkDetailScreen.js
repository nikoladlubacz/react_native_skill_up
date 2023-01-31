import { useLayoutEffect, useContext } from "react";
import { View } from "react-native";
import { RootStackParamList } from "../util/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Drinks } from "../data/data";
import DrinkItem from "../components/DrinkItem";
import Drink from "../models/drink";
import IconButton from "../components/IconButton";
import Colors from "../constants/colors";
import { FavoritesContext } from "../store/favoritesContext";

// type DrinkDetailProps = NativeStackScreenProps<
//   RootStackParamList,
//   "DrinkDetailScreen"
// >;

function DrinkDetailScreen({ route, navigation }) {
  const favoriteDrinksCtx = useContext(FavoritesContext);
  const drinkId = route.params.drinkId;

  const selectedDrink = Drinks.find((drinkItem) => drinkItem.id === drinkId);

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
      title: selectedDrink.name,
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

  return (
    <View>
      <DrinkItem
        image={selectedDrink.image}
        instruction={selectedDrink.instruction}
      />
    </View>
  );
}

export default DrinkDetailScreen;
