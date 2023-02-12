import { RootStackParamList } from "../util/types";
import WelcomeScreen from "../screens/WelcomeScreen";
import DrinkDetailScreen from "../screens/DrinkDetailScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "../constants/colors";
import BottomTabsNavigator from "../navigation/BottomTabs";
import React from 'react'

const Stack = createNativeStackNavigator<RootStackParamList>();

function StackNavigation() {
    return (
        <Stack.Navigator
            initialRouteName="WelcomeScreen"
            screenOptions={{
                headerStyle: { backgroundColor: Colors.green700 },
                headerTintColor: Colors.light100,
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontSize: 50,
                },
            }
            }
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
                }}
            />
            <Stack.Screen
                name="DrinkDetailScreen"
                component={DrinkDetailScreen}
                options={{
                    contentStyle: { backgroundColor: Colors.green100 },
                }}
            />
        </Stack.Navigator>)
}

export default StackNavigation