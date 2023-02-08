import { useLayoutEffect } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import DrinkItem from "../components/DrinkItem";
import IconButton from "../components/IconButton";
import Colors from "../constants/colors";
import { useEffect, useState } from "react";
import { FavoriteDrink } from "../models/favoriteDrink";
import { deleteFavoriteDrinkById, insertFavoriteDrink } from "../util/database";
import { fetchDrinkDetails } from "../util/http";
import { fetchFavoriteDrinkById } from "../util/database";
import { useIsFocused } from "@react-navigation/native";

function DrinkDetailScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [drinkDetailsList, setDrinkDetailsList] = useState([]);
  const [drinkIsFavorite, setDrinkIsFavorite] = useState();

  const drinkId = route.params.drinkId;
  const drinkName = route.params.drinkName;

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadFavoriteDrinkById() {
      const favoriteDrink = await fetchFavoriteDrinkById(drinkId);
      setDrinkIsFavorite(favoriteDrink.length > 0 ? true : false);
    }
    async function getDrink() {
      setLoading(false);
      try {
        const fetchedDrink = await fetchDrinkDetails(drinkId);
        setDrinkDetailsList(fetchedDrink);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (isFocused) {
      loadFavoriteDrinkById();
      getDrink();
    }
  }, [isFocused, drinkIsFavorite]);

  function favoriteDrinkHandler() {
    if (drinkIsFavorite) {
      deleteFavoriteDrinkById(drinkId);
      setDrinkIsFavorite(false);
      console.log("drink is delete");
    } else {
      const favoriteDrink = new FavoriteDrink(
        drinkDetailsList[0].nameDrink,
        drinkDetailsList[0].image,
        drinkDetailsList[0].drinkId
      );
      insertFavoriteDrink(favoriteDrink);
      setDrinkIsFavorite(true);
      console.log("drink is favorite");
    }
  }

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
        data={drinkDetailsList}
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
