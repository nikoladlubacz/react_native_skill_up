import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../util/types";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
} from "react-native";

type BreathalyzerScreenProps = NativeStackScreenProps<
  BottomTabParamList,
  "BreathalyzerScreen"
>;

function BreathalyzerScreen({ navigation }: BreathalyzerScreenProps) {
  return (
    <View>
      <Text>Breathalyzer</Text>
    </View>
  );
}

export default BreathalyzerScreen;
