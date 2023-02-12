import { View, StyleSheet, FlatList, ActivityIndicator, } from "react-native";
import DrinkGridTile from "../components/drinks/DrinkGridTile";
import { fetchFavoriteDrinks } from "../util/database";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Colors from "../constants/colors";

function FavoritesScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [loadedFavoriteDrinks, setLoadedFavoriteDrinks] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadFavoriteDrinks() {
      const favoriteDrinks = await fetchFavoriteDrinks();
      setLoadedFavoriteDrinks(favoriteDrinks);
      setLoading(false)
    }
    if (isFocused) {
      loadFavoriteDrinks();
    }
  }, [isFocused]);

  function renderDrinkItem(id, name, image) {
    return (
      <View style={styles.appContainer}>
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
      </View>
    );
  }

  return (
    <View style={styles.appContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" style={styles.indicator} />
      ) : (
        <View style={styles.drinksContainer}>
          <FlatList
            data={loadedFavoriteDrinks}
            numColumns={2}
            renderItem={({ item }) =>
              renderDrinkItem(item.drinkId, item.nameDrink, item.image)
            }
          />
        </View>)}
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
  indicator: {
    marginTop: 200,
  },
});
