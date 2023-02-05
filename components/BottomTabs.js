import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../constants/colors";
import DrinksScreen from "../screens/DrinksScreen";
import { Ionicons } from "@expo/vector-icons";
import FavoritesScreen from "../screens/FavoritesScreen";
import BreathalyzerScreen from "../screens/BreathalyzerScreen";
import React from "react";

const BottomTab = createBottomTabNavigator();

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
          title: "Drinks",
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
          title: "How Drunk Are You ?",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="help-outline" color={color} size={size} />
          ),
          tabBarLabel:"Breathalyzer"
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabsNavigator;
