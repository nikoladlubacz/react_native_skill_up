import { React, useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import DrinkGridTile from "../components/drinks/DrinkGridTile";
import CategoryItem from "../components/drinks/CategoryItem";
import { MenuLabels } from "../models/menuFactory";
import { AlcoholContext } from "../util/alcoholContext";
import { fetchDrinks } from "../util/http";
import Colors from "../constants/colors";
import ErrorHandling from "../components/ErrorHandling";
import SettingsButton from "../components/buttons/SettingsButton";

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
          <SettingsButton />
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
          showsHorizontalScrollIndicator={false}
          data={MenuLabels}
          renderItem={({ item }) => (
            <CategoryItem
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
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
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
        marginTop: 5
  },
  drinksContainer: {
    flex: 1,
    paddingHorizontal: 16,
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
