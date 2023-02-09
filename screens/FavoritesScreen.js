import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import DrinkGridTile from "../components/DrinkGridTile";
import { fetchFavoriteDrinkById, fetchFavoriteDrinks } from "../util/database";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import { deleteFavoriteDrinkById, insertFavoriteDrink } from "../util/database";
import ContextMenu from "react-native-context-menu-view";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Button } from "react-native-elements";

function FavoritesScreen({ navigation }) {
  const [loadedFavoriteDrinks, setLoadedFavoriteDrinks] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadFavoriteDrinks() {
      const favoriteDrinks2 = await fetchFavoriteDrinks();
      setLoadedFavoriteDrinks(favoriteDrinks2);
    }
    if (isFocused) {
      loadFavoriteDrinks();
    }
  }, [isFocused, loadedFavoriteDrinks]);

  function renderDrinkItem(id, name, image) {
    return (
      <View style={styles.appContainer}>
        <Menu onSelect={(value) => deleteFavoriteDrinkById(id)}>
          <MenuTrigger
            triggerOnLongPress={true}
            onPress={()=>console.log("GGGGGGGGGg")}
            children={
              <DrinkGridTile
                id={id}
                name={name}
                image={image}
                onPress={() => {
                  navigation.navigate("DrinkDetailScreen", {
                    drinkId: id,
                    drinkName: name,
                  });
                }}
              />
            }
          >
            {/* <Text>Delete</Text> */}
          </MenuTrigger>
          <MenuOptions>
            <MenuOption value={1} text="Delete" />
          </MenuOptions>
        </Menu>
      </View>
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
    width: "50%",
  },
  drinksContainer: {
    marginBottom: 10,
  },
  contextMenuContainer: {
    // position: "absolute",
  },
});
