import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from "react-native";
import MenuItem from "../components/MenuItem";
import { MenuList } from "../data/menuData";
import Menu from "../models/menu";

function DrinkList() {
  function renderMenuItem(menuItem: Menu) {
    return (
      <MenuItem name={menuItem.name} image={menuItem.image} id={menuItem.id} />
    );
  }

  return (
    <View>
      <View>
        <FlatList
          horizontal={true}
          data={MenuList}
          renderItem={({ item }: ListRenderItemInfo<Menu>) => (
            <MenuItem name={item.name} image={item.image} id={item.id} />
          )}
        />
      </View>
    </View>
  );
}
export default DrinkList;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 16,
  },
});
