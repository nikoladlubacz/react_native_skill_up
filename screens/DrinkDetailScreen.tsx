import { useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View, Text } from "react-native";
import { RootStackParamList } from "../util/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Drinks } from "../data/data";
import DrinkItem from "../components/DrinkItem";
import Drink from "../models/drink";

type DrinkDetailProps = NativeStackScreenProps<
  RootStackParamList,
  "DrinkDetailScreen"
>;

function DrinkDetailScreen({ route }: DrinkDetailProps) {
  const drinkId = route.params.drinkId;

  const selectedDrink = Drinks.find(
    (drinkItem: Drink) => drinkItem.id == drinkId
  );

  return (
    <View>
      <DrinkItem
        name={selectedDrink.name}
        id={selectedDrink.id}
        image={selectedDrink.image}
        instruction={selectedDrink.instruction}
      />
    </View>
  );
}

export default DrinkDetailScreen;
