import { View, StyleSheet, FlatList, ListRenderItemInfo, Text, ActivityIndicator } from "react-native";
import DrinkGridTile from "../components/DrinkGridTile";
import MenuItem from "../components/MenuItem";
import { MenuLabels, Drinks } from "../data/data";
import Drink from "../models/drink";
import Menu from "../models/menu";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../util/types";
import { useEffect, useState } from "react";

type DrinksScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "DrinksScreen"
>;


function DrinksScreen({ navigation }: DrinksScreenProps) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  const getDrinks = async () => {
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin');
      const json = await response.json();
      console.log(json);
      setData(json.drinks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDrinks();
  }, []);
  
  function renderCategoryItem(id: number, name: string, image: string) {
    function pressHandler() {
      // navigation.navigate("DrinkDetailScreen", { drinkId: id });
    }
    return (
      <DrinkGridTile
        name={name}
        image={image}
        onPress={pressHandler}
      />
    );
  }

  return (
    <View style={styles.appContainer}>
      <View>
        <FlatList
          horizontal={true}
          data={MenuLabels}
          renderItem={({ item }: ListRenderItemInfo<Menu>) => (
            <MenuItem name={item.name} image={item.image} id={item.id} />
          )}
        />
      </View>
      <View style={styles.drinksContainer}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          //keyExtractor={({idDrink}) => idDrink}
          // keyExtractor={(item: Drink, index: number) => item.name}
          numColumns={2}
          // renderItem={({item}) => (
          //   <Text>
          //     {item.strDrink}, {item.idDrink}
          //   </Text>
          // )}
          renderItem={({ item }: ListRenderItemInfo<Drink>) =>
            renderCategoryItem(item.idDrink, item.strDrink, item.strDrinkThumb)
          }
        />)}
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
    marginBottom: 60,
  },
});
