import { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { FavoritesContext } from "../store/favoritesContext";
import { Drinks } from "../data/data";
import DrinkGridTile from "../components/DrinkGridTile";
import { fetchFavoriteDrinks } from "../util/database";

function FavoritesScreen({ navigation }) {
  const favoriteDrinksCtx = useContext(FavoritesContext);
  // const favoriteDrinks = Drinks.filter((drink) =>
  //   favoriteDrinksCtx.ids.includes(drink.id)
  // );

  const favoriteDrinks = fetchFavoriteDrinks();

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
          data={favoriteDrinksCtx.drinkList}
          numColumns={2}
          renderItem={({ item }) =>
            renderDrinkItem(item.drinkId, item.nameDrink, item.image)
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
