import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import DrinkGridTile from "../components/DrinkGridTile";
import MenuItem from "../components/MenuItem";
import { MenuLabels, Drinks } from "../data/data";
import { useEffect, useState } from "react";
import React from "react";

// type DrinksScreenProps = NativeStackScreenProps<
//   RootStackParamList,
//   "DrinksScreen"
// >;

function DrinksScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const getDrinks = async () => {
    try {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka"
      );
      const json = await response.json();
      const { drinks } = json;
      const newDrinks = drinks.map((element) => {
        const { idDrink, strDrink, strDrinkThumb } = element;

        return {
          id: idDrink,
          name: strDrink,
          image: strDrinkThumb,
        };
      });

      setDrinks(newDrinks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDrinks();
  }, []);

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
    <View style={styles.appContainer}>
      <View>
        <FlatList
          horizontal={true}
          data={MenuLabels}
          renderItem={({ item }) => (
            <MenuItem name={item.name} image={item.image} id={item.id} />
          )}
        />
      </View>
      <View style={styles.drinksContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" style={styles.indicator} />
        ) : (
          <FlatList
            data={drinks}
            numColumns={2}
            renderItem={({ item }) =>
              renderDrinkItem(item.id, item.name, item.image)
            }
          />
        )}
      </View>
    </View>
  );
}
export default DrinksScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 16,
  },
  drinksContainer: {
    marginBottom: 100,
  },
  indicator: {
    marginTop: 200,
  },
});
