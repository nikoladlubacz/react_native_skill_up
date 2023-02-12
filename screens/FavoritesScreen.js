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

  return (
    <View style={styles.appContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" style={styles.indicator} />
      ) : (
        <View style={styles.drinksContainer}>
          <FlatList
            data={loadedFavoriteDrinks}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            numColumns={2}
            renderItem={({ item }) =>
              <DrinkGridTile
                id={item.drinkId}
                name={item.nameDrink}
                image={item.image}
                onPress={() =>
                  navigation.navigate("DrinkDetailScreen", {
                    drinkId: item.drinkId,
                    drinkName: item.nameDrink,
                  })
                }
              />
            }
          />
        </View>
      )}
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
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 60,
  },
  indicator: {
    marginTop: 200,
  },
});
