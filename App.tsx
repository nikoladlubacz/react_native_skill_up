import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import DrinksScreen from "./screens/DrinksScreen";
import DrinkDetailScreen from "./screens/DrinkDetailScreen";
import { BottomTabParamList, RootStackParamList } from "./util/types";
import Colors from "./constants/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FavoritesScreen from "./screens/FavoritesScreen";
import BreathalyzerScreen from "./screens/BreathalyzerScreen";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import FavoritesContextProvider from "./store/favoritesContext";

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabsNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.grey800 },
        headerTintColor: Colors.green200,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 30,
        },
      }}
    >
      <BottomTab.Screen
        name="Drinks"
        component={DrinksScreen}
        options={{
          title: "Drink Advisor",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Breathalyzer"
        component={BreathalyzerScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="help-outline" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FavoritesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
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
              name="BottomTab"
              component={BottomTabsNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
              options={{
                title: "Drink Advisor",
              }}
            />
            <Stack.Screen
              name="DrinksScreen"
              component={DrinksScreen}
              options={{
                title: "Drinks",
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
