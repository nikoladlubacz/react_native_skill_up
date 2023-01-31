import { useLayoutEffect } from "react";
import { View } from "react-native";
import { RootStackParamList } from "../util/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Drinks } from "../data/data";
import DrinkItem from "../components/DrinkItem";
import Drink from "../models/drink";
import IconButton from "../components/IconButton";
import Colors from "../constants/colors";

type DrinkDetailProps = NativeStackScreenProps<
  RootStackParamList,
  "DrinkDetailScreen"
>;

function DrinkDetailScreen({ route, navigation }: DrinkDetailProps) {
  const drinkId = route.params.drinkId;

  const selectedDrink = Drinks.find(
    (drinkItem: Drink) => drinkItem.id == drinkId
  );

  function headerButtonPressHandler() {
    console.log("STAR");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedDrink.name,
      headerRight: () => {
        return (
          <IconButton
            onPress={headerButtonPressHandler}
            icon={"star"}
            color={Colors.green200}
          />
        );
      },
    });
  }, [navigation, headerButtonPressHandler]);

  return (
    <View>
      <DrinkItem
        image={selectedDrink.image}
        instruction={selectedDrink.instruction}
      />
    </View>
  );
}

export default DrinkDetailScreen;
