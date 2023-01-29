import { View, StyleSheet, FlatList, ListRenderItemInfo } from "react-native";
import DrinkGridTile from "../components/DrinkGridTile";
import MenuItem from "../components/MenuItem";
import { MenuLabels, Drinks } from "../data/data";
import Drink from "../models/drink";
import Menu from "../models/menu";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../util/types";

type DrinksScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "DrinksScreen"
>;

function DrinksScreen({ navigation }: DrinksScreenProps) {
  function pressHandler() {
    navigation.navigate("DrinkDetailScreen");
  }

  return (
    <View style ={styles.appContainer}>
      <View>
        <FlatList
          horizontal={true}
          data={MenuLabels}
          renderItem={({ item }: ListRenderItemInfo<Menu>) => (
            <MenuItem name={item.name} image={item.image} id={item.id} />
          )}
        />
      </View>
      <View>
        <FlatList
          data={Drinks}
          renderItem={({ item }: ListRenderItemInfo<Drink>) => (
            <DrinkGridTile
              id={item.id}
              name={item.name}
              image={item.image}
              instruction={item.instruction}
            />
          )}
          numColumns={2}
        />
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
});
