import { React, useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import DrinkGridTile from "../components/drinks/DrinkGridTile";
import MenuItem from "../components/drinks/CategoryItem";
import { MenuLabels } from "../models/menuFactory";
import { AlcoholContext } from "../util/alcoholContext";
import { fetchDrinks } from "../util/http";
import Colors from "../constants/colors";
import ErrorHandling from "../components/ErrorHandling";
import MenuContext from "../components/buttons/SettingsButton";

function DrinksScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [drinks, setDrinks] = useState([]);
  const [fetchingFailed, setFetchingFailed] = useState(false);

  const alcoholCtx = useContext(AlcoholContext);
  const alcohol = alcoholCtx.alcoholName;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <MenuContext />
        )
      }
    })
  }, [])

  useEffect(() => {
    async function getDrinks() {
      try {
        setFetchingFailed(false)
        const fetchedDrinks = await fetchDrinks(alcohol);
        setDrinks(fetchedDrinks);
      } catch (error) {
        setFetchingFailed(true);
      } finally {
        setLoading(false);
      }
    }
    getDrinks();
  }, [alcohol]);

  return (
    <View style={styles.appContainer}>
      <View style={styles.menuLabelContainer}>
        <FlatList
          horizontal={true}
          data={MenuLabels}
          renderItem={({ item }) => (
            <MenuItem
              name={item.name}
              image={item.image}
              onPress={() => alcoholCtx.updateAlcoholName(item.name)}
            />
          )}
        />
      </View>
      {fetchingFailed ?
        (
          <ErrorHandling />
        ) :
        (
          <View style={styles.drinksContainer}
          >
            {isLoading ? (
              <ActivityIndicator size="large" style={styles.indicator} />
            ) : (
              <FlatList
                data={drinks[0]}
                numColumns={2}
                renderItem={({ item }) => (
                  <DrinkGridTile
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    onPress={() =>
                      navigation.navigate("DrinkDetailScreen", {
                        drinkId: item.id,
                        drinkName: item.name,
                      })
                    }
                  />
                )}
              />
            )}
          </View>
        )}
    </View>
  );
}
export default DrinksScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: Colors.green300,
  },
  menuLabelContainer: {
    height: 90,
    marginHorizontal: 12,
    marginTop: 5
  },
  drinksContainer: {
    flex: 1,
    marginBottom: 60,
  },
  indicator: {
    marginTop: 200,
  },
  menuContext: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: 10,
  }
});
