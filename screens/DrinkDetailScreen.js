import { useLayoutEffect, useContext } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import DrinkItem from "../components/DrinkItem";
import IconButton from "../components/IconButton";
import Colors from "../constants/colors";
import { useEffect, useState } from "react";
import { FavoritesContext } from "../store/favoritesContext";
import { FavoriteDrink } from "../models/favoriteDrink";
import { insertFavoriteDrink } from "../util/database";
import { fetchDrinkDetails } from "../util/http";

function DrinkDetailScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const favoriteDrinksCtx = useContext(FavoritesContext);
  const drinkId = route.params.drinkId;
  const drinkName = route.params.drinkName;

  const drinkIsFavorite = favoriteDrinksCtx.drinkList.some(
    (item) => item.drinkId === drinkId
  );

  // async function favoriteDrinkHandler() {
  //   console.log("!!!!!!!!!!!!!!!");
  //   console.log(data[0].drinkId);
  //   const favoriteDrink = new FavoriteDrink(
  //     parseInt(data[0].drinkId),
  //     data[0].nameDrink,
  //     data[0].image
  //   );
  //   console.log(favoriteDrink);
  //   await insertFavoriteDrink(favoriteDrink);

  //   console.log(":::::::::::::::");
  //   if (drinkIsFavorite) {
  //     favoriteDrinksCtx.deleteFavorite(drinkId);
  //   } else {
  //     favoriteDrinksCtx.addFavorite({
  //       drinkId: drinkId,
  //       nameDrink: drinkName,
  //       image: data[0].image,
  //     });
  //   }
  // }

  async function favoriteDrinkHandler() {
    console.log("favoriteHandler");
    console.log(data);
    const favoriteDrink = new FavoriteDrink(
      data[0].nameDrink,
      data[0].image,
      data[0].drinkId
    );
    console.log(favoriteDrink);
    await insertFavoriteDrink(favoriteDrink);

    // if (drinkIsFavorite) {
    //   favoriteDrinksCtx.deleteFavorite(drinkId);
    // } else {
    //   favoriteDrinksCtx.addFavorite({
    //     drinkId: drinkId,
    //     nameDrink: drinkName,
    //     image: data[0].image,
    //   });
    // }
    }

  useEffect(() => {
    async function getDrink() {
      setLoading(false);
      try {
        const fetchedDrink = await fetchDrinkDetails(drinkId);
        setData(fetchedDrink);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getDrink();
  }, []);

  const CustomHeader = ({ title }) => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return <CustomHeader title={drinkName} />;
      },
      headerTitleAlign: "center",
      headerRight: () => {
        return (
          <IconButton
            icon={drinkIsFavorite ? "star" : "star-outline"}
            color={Colors.green200}
            onPress={favoriteDrinkHandler}
          />
        );
      },
    });
  }, [navigation, favoriteDrinkHandler]);

  function renderDrinkDetailItem(item) {
    return <DrinkItem drink={item} />;
  }

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => renderDrinkDetailItem(item)}
      />
    </View>
  );
}

export default DrinkDetailScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
  },
  headerTitle: {
    width: 260,
    marginVertical: 12,
    fontSize: 24,
    textAlign: "center",
    color: Colors.green200,
  },
});
