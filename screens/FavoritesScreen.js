import { useContext } from "react";
import { View, Text, StyleSheet,FlatList } from "react-native";
import { FavoritesContext } from "../store/favoritesContext";
import { Drinks } from "../data/data";
import DrinkGridTile from "../components/DrinkGridTile";


function FavoritesScreen() {
  const favoriteDrinksCtx = useContext(FavoritesContext);
  const favoriteDrinks = Drinks.filter((drink) =>
    favoriteDrinksCtx.ids.includes(drink.id)
  );

  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("DrinkDetailScreen", { drinkId: itemData.id });
    }
    return (
      <DrinkGridTile
        name={itemData.name}
        image={itemData.image}
        onPress={pressHandler}
      />
    );
  }

  return (
    <View>
      <View style={styles.drinksContainer}>
        <FlatList
          data={favoriteDrinks}
          keyExtractor={(item, index) => item.name}
          numColumns={2}
          renderItem={({ item }) => renderCategoryItem(item)}
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
    marginBottom: 60,
  },
});
