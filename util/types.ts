import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  WelcomeScreen: undefined;
  DrinksScreen: undefined;
  DrinkDetailScreen: { drinkId: number };
};

export type BottomTabParamList = {
  Home: undefined;
  BreathalyzerScreen: undefined;
  FavoriteScreen: undefined;
};
