import { useLayoutEffect, useContext } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import DrinkItem from "../components/DrinkItem";
import IconButton from "../components/IconButton";
import Colors from "../constants/colors";
import { useEffect, useState } from "react";
import { FavoritesContext } from "../store/favoritesContext";
import Drink from "../models/drink";

// type DrinkDetailProps = NativeStackScreenProps<
//   RootStackParamList,
//   "DrinkDetailScreen"
// >;

function DrinkDetailScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const favoriteDrinksCtx = useContext(FavoritesContext);
  const drinkId = route.params.drinkId;
  const drinkName = route.params.drinkName;

  // const selectedDrink = Drinks.find((drinkItem) => drinkItem.id === drinkId);
  

  // const drinkIsFavorite = favoriteDrinksCtx.drinkList.includes(data.id);
  // const drinkIsFavorite = favoriteDrinksCtx.drinkList.filter(drink => drink.drinkId === drinkId)
  const drinkIsFavorite = favoriteDrinksCtx.drinkList.some(
    (item) => item.drinkId === drinkId
  );

  function changeFavoriteStatusHandler() {
    if (drinkIsFavorite) {
      favoriteDrinksCtx.deleteFavorite(drinkId);
    } else {
      favoriteDrinksCtx.addFavorite({
        drinkId: drinkId,
        nameDrink: drinkName,
        image: data[0].image,
      });
    }
  }

  // let url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
  // url += drinkId;

  const getDrink = async () => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`
      );
      const json = await response.json();

      const {
        idDrink: id,
        strDrink: name,
        strDrinkThumb: image,
        strCategory: category,
        strAlcoholic: alcoholic,
        strGlass: glass,
        strInstructions: instructions,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strIngredient14,
        strIngredient15,
        strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
        strMeasure9,
        strMeasure10,
        strMeasure11,
        strMeasure12,
        strMeasure13,
        strMeasure14,
        strMeasure15,
      } = json.drinks[0];

      const ingredients = [
        (strMeasure1 ?? "") + " " + strIngredient1,
        (strMeasure2 ?? "") + " " + strIngredient2,
        (strMeasure3 ?? "") + " " + strIngredient3,
        (strMeasure4 ?? "") + " " + strIngredient4,
        (strMeasure5 ?? "") + " " + strIngredient5,
        (strMeasure6 ?? "") + " " + strIngredient6,
        (strMeasure7 ?? "") + " " + strIngredient7,
        (strMeasure8 ?? "") + " " + strIngredient8,
        (strMeasure9 ?? "") + " " + strIngredient9,
        (strMeasure10 ?? "") + " " + strIngredient10,
        (strMeasure11 ?? "") + " " + strIngredient11,
        (strMeasure12 ?? "") + " " + strIngredient12,
        (strMeasure13 ?? "") + " " + strIngredient13,
        (strMeasure14 ?? "") + " " + strIngredient14,
        (strMeasure15 ?? "") + " " + strIngredient15,
      ].filter((element) => {
        return element != " null";
      });

      const newDrink = new Drink(
        id,
        name,
        image,
        category,
        alcoholic,
        glass,
        instructions,
        ingredients
      );

      data.push(newDrink);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
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
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

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
