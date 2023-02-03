import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabParamList } from "../util/types";
import {
  View,
  Text,
} from "react-native";
import BreathalyzerForm from "../components/Breathalyzer/BreathalyzerForm";

type BreathalyzerScreenProps = NativeStackScreenProps<
  BottomTabParamList,
  "BreathalyzerScreen"
>;

function BreathalyzerScreen({ navigation }: BreathalyzerScreenProps) {
  return (
    <View>
      <BreathalyzerForm/>
    </View>
  );
}

export default BreathalyzerScreen;
