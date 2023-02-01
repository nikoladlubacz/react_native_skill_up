import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  WelcomeScreen: undefined;
  DrinksScreen: undefined;
  DrinkDetailScreen: { drinkId: number , drinkName:string};
};

export type BottomTabParamList = {
  Home: undefined;
  BreathalyzerScreen: undefined;
  FavoriteScreen: undefined;
};
