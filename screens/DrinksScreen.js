import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import DrinkGridTile from "../components/DrinkGridTile";
import MenuItem from "../components/MenuItem";
import { MenuLabels } from "../data/data";
import { useContext, useEffect, useState } from "react";
import React from "react";
import { AlkoholContext } from "../store/alkoholContext";
import { fetchDrinks } from "../util/http";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/colors";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

function DrinksScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [drinks, setDrinks] = useState([]);

  const alkoholCtx = useContext(AlkoholContext);
  const alkohol = alkoholCtx.alkoholName;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Menu
            onSelect={(value) => {
              console.log("kliknąłeś: " + value);
            }}
          >
            <MenuTrigger
            // onPress={() => console.log("GGGGGGGGGg")}
            >
              <View style={{ justifyContent: "flex-end", paddingRight: 10 }}>
                <Ionicons
                  name="settings-outline"
                  color={Colors.green200}
                  size={24}
                />
              </View>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption value={1} text="Notifications" />
              <MenuOption value={2} text="Autentication" />
            </MenuOptions>
          </Menu>
        );
      },
    });

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
              onPress={() => alkoholCtx.updateAlkoholName(item.name)}
            />
          )}
        />
      </View>
      <View style={styles.drinksContainer}>
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
