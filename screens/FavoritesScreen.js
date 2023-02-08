import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { FavoritesContext } from "../store/favoritesContext";
import { Drinks } from "../data/data";
import DrinkGridTile from "../components/DrinkGridTile";
import { fetchFavoriteDrinkById, fetchFavoriteDrinks } from "../util/database";
import { useIsFocused } from "@react-navigation/native";

function FavoritesScreen({ navigation }) {
  const [loadedFavoriteDrinks, setLoadedFavoriteDrinks] = useState([]);
  // const favoriteDrinksCtx = useContext(FavoritesContext);

  const isFocused = useIsFocused();

  const favorite5 = [];

  useEffect(() => {
    async function loadFavoriteDrinks() {
      const favoriteDrinks2 = await fetchFavoriteDrinks();
      setLoadedFavoriteDrinks(favoriteDrinks2);
    }

    async function loadFavoriteDrinkID() {
      const favoriteDrinkIDDD = await fetchFavoriteDrinkById(15346);
        favorite5.push(favoriteDrinkIDDD)
    }
    
    if (isFocused) {
      loadFavoriteDrinks();
      loadFavoriteDrinkID();

    }
  }, [isFocused]);

  function renderDrinkItem(id, name, image) {
    function pressHandler() {
      navigation.navigate("DrinkDetailScreen", {
        drinkId: id,
        drinkName: name,
      });
    }
    return (
      <DrinkGridTile id={id} name={name} image={image} onPress={pressHandler} />
    );
  }
  return (
    <View>
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
    padding: 16,
  },
  drinksContainer: {
    marginBottom: 10,
  },
});
