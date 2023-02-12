import { useEffect, useState, useLayoutEffect } from "react";
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from "react-native";
import DrinkItem from "../components/drinks/DrinkItem";
import IconButton from "../components/buttons/IconButton";
import Colors from "../constants/colors";
import { FavoriteDrink } from "../models/favoriteDrink";
import { deleteFavoriteDrinkById, insertFavoriteDrink } from "../util/database";
import { fetchDrinkDetails } from "../util/http";
import { fetchFavoriteDrinkById } from "../util/database";
import { useIsFocused } from "@react-navigation/native";
import ErrorHandling from "../components/ErrorHandling";

function DrinkDetailScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [drinkDetailsList, setDrinkDetailsList] = useState([]);
  const [drinkIsFavorite, setDrinkIsFavorite] = useState();
  const [fetchingFailed, setFetchingFailed] = useState(false);

  const drinkId = route.params.drinkId;
  const drinkName = route.params.drinkName;

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadFavoriteDrinkById() {
      const favoriteDrink = await fetchFavoriteDrinkById(drinkId);
      setDrinkIsFavorite(favoriteDrink.length > 0 ? true : false);
    }
    async function getDrink() {
      try {
        const fetchedDrink = await fetchDrinkDetails(drinkId);
        setDrinkDetailsList(fetchedDrink);
      } catch (error) {
        setFetchingFailed(true);
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
    } else {
      const favoriteDrink = new FavoriteDrink(
        drinkDetailsList[0].nameDrink,
        drinkDetailsList[0].image,
        drinkDetailsList[0].drinkId
      );
      insertFavoriteDrink(favoriteDrink);
      setDrinkIsFavorite(true);
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

      headerRight: () => {
        return (
          !fetchingFailed &&
          <IconButton
            icon={drinkIsFavorite ? "star" : "star-outline"}
            color={Colors.light100}
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
    <View style={{ flex: 1 }}>
      {fetchingFailed ?
        (
          <ErrorHandling />
        ) :
        (
          <View>
            {isLoading ? (
              <ActivityIndicator size="large" style={styles.indicator} />
            ) : (
              <FlatList
                data={drinkDetailsList}
                renderItem={({ item }) => renderDrinkDetailItem(item)}
              />)}
          </View>)}
    </View>

  );
}

export default DrinkDetailScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    backgroundColor: Colors.green700
  },
  headerTitle: {
    marginRight: 132,
    marginVertical: 12,
    fontSize: 24,
    textAlign: "center",
    color: Colors.light100,
  },
});
