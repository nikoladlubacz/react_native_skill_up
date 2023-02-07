import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import DrinkGridTile from "../components/DrinkGridTile";
import MenuItem from "../components/MenuItem";
import { MenuLabels } from "../data/data";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { AlkoholContext } from "../store/alkoholContext";
import { fetchDrinks } from "../util/http";

function DrinksScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [drinks, setDrinks] = useState([]);

  const alkoholCtx = useContext(AlkoholContext);
  const alkohol = alkoholCtx.alkoholName;

  useEffect(() => {
    async function getDrinks() {
      setLoading(false);
      try {
        const fetchedDrinks = await fetchDrinks(alkohol);
        setDrinks(fetchedDrinks);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getDrinks();
  }, [alkohol]);

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

  function renderMenuItem(name, image) {
    function pressHandler() {
      console.log("presed");
      console.log(name);
      alkoholCtx.updateAlkoholName(name);
    }
    return <MenuItem name={name} image={image} onPress={pressHandler} />;
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.menuLabelContainer}>
        <FlatList
          horizontal={true}
          data={MenuLabels}
          renderItem={({ item }) => renderMenuItem(item.name, item.image)}
        />
      </View>
      <View style={styles.drinksContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" style={styles.indicator} />
        ) : (
          <FlatList
            data={drinks[0]}
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
    marginHorizontal: 6,
  },
  menuLabelContainer: {
    height: 90,
  },
  drinksContainer: {
    marginBottom: 100,
  },
  indicator: {
    marginTop: 200,
  },
});
