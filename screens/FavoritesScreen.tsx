import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../util/types";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from "react-native";

type FavoritesScreenProps = NativeStackScreenProps<
  BottomTabParamList,
  "FavoriteScreen"
>;

function FavoritesScreen({ navigation }: FavoritesScreenProps) {
  return (
    <View>
      <Text>Favorites</Text>
    </View>
  );
}

export default FavoritesScreen
