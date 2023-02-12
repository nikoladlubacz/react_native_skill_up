import WelcomeScreen from "../screens/WelcomeScreen";
import DrinkDetailScreen from "../screens/DrinkDetailScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "../constants/colors";
import BottomTabsNavigator from "../navigation/BottomTabs";
import React from 'react'
import NotificationsScreen from "../screens/NotificationsScreen";
import AuthenticationScreen from "../screens/AuthenticationScreen";

type RootStackParamList = {
    WelcomeScreen: undefined;
    DrinksScreen: undefined;
    DrinkDetailScreen: { drinkId: number, drinkName: string };
    NotificationsScreen: undefined;
    AuthenticationScreen: undefined
};

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
                    fontSize: 30,
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
            <Stack.Screen
                name="NotificationsScreen"
                component={NotificationsScreen}
                options={{
                    title: "Notifications",
                }}
            />
            <Stack.Screen
                name="AuthenticationScreen"
                component={AuthenticationScreen}
                options={{
                    title: "Authentication",
                }}
            />
        </Stack.Navigator>)
}

export default StackNavigation