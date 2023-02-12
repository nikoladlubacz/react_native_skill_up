import { View, StyleSheet, FlatList } from "react-native";
import DrinkGridTile from "../components/drinks/DrinkGridTile";
import { fetchFavoriteDrinks } from "../util/database";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { deleteFavoriteDrinkById } from "../util/database";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Colors from "../constants/colors";

function FavoritesScreen({ navigation }) {
  const [loadedFavoriteDrinks, setLoadedFavoriteDrinks] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadFavoriteDrinks() {
      const favoriteDrinks = await fetchFavoriteDrinks();
      setLoadedFavoriteDrinks(favoriteDrinks);
    }
    if (isFocused) {
      loadFavoriteDrinks();
    }
  }, [isFocused, loadedFavoriteDrinks]);

  function renderDrinkItem(id, name, image) {
    return (
      <View style={styles.appContainer}>
        <Menu onSelect={() => deleteFavoriteDrinkById(id)}>
          <MenuTrigger>
            <DrinkGridTile
              id={id}
              name={name}
              image={image}
              onPress={() => {
                navigation.navigate("DrinkDetailScreen", {
                  drinkId: id,
                  drinkName: name,
                });
              }}
            />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption value={1} text="Delete" />
          </MenuOptions>
        </Menu>
      </View>
    );
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.drinksContainer}>
        <FlatList
          data={loadedFavoriteDrinks}
          numColumns={2}
          renderItem={({ item }) =>
            renderDrinkItem(item.drinkNumber, item.nameDrink, item.image)
          }
        />
      </View>
    </View>
  );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: Colors.green300,
  },
  drinksContainer: {
    marginBottom: 60,
  },
});
