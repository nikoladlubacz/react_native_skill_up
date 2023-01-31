import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import DrinkDetailScreen from "./screens/DrinkDetailScreen";
import { RootStackParamList } from "./util/types";
import Colors from "./constants/colors";
import React from "react";
import FavoritesContextProvider from "./store/favoritesContext";
import BottomTabsNavigator from "./components/BottomTabs";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FavoritesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="WelcomeScreen"
            screenOptions={{
              headerStyle: { backgroundColor: Colors.grey800 },
              headerTintColor: Colors.green200,
              headerTitleAlign: "center",
              headerTitleStyle: {
                fontSize: 30,
              },
            }}
          >
            <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="DrinksScreen"
              component={BottomTabsNavigator}
              options={{
                title: "Drinks",
                headerShown: false,

                contentStyle: { backgroundColor: Colors.green600 },
              }}
            />
            <Stack.Screen
              name="DrinkDetailScreen"
              component={DrinkDetailScreen}
              options={{
                contentStyle: { backgroundColor: Colors.green600 },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
