import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { FavoritesContext } from "../store/favoritesContext";
import { Drinks } from "../data/data";
import DrinkGridTile from "../components/DrinkGridTile";
import { fetchFavoriteDrinks } from "../util/database";
import { useIsFocused } from '@react-navigation/native';


function FavoritesScreen({ navigation }) {
  const [loadedFavoriteDrinks, setLoadedFavoriteDrinks] = useState([]);
  const favoriteDrinksCtx = useContext(FavoritesContext);
  // const favoriteDrinks = Drinks.filter((drink) =>
  //   favoriteDrinksCtx.ids.includes(drink.id)
  // );

  // const favoriteDrinks = fetchFavoriteDrinks();

  const isFocused = useIsFocused();


  useEffect(() => {
    async function loadFavoriteDrinks() {
      const favoriteDrinks2 = await fetchFavoriteDrinks();
      console.log(favoriteDrinks2);
      setLoadedFavoriteDrinks(favoriteDrinks2)
    }
    console.log("loade Favorite drink");
    console.log(loadFavoriteDrinks);
    if(isFocused){
    loadFavoriteDrinks();}
  }, [isFocused]);

  function renderDrinkItem(id, name, image) {
    console.log(id);
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
