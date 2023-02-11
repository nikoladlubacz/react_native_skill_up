import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import DrinkDetailScreen from "./screens/DrinkDetailScreen";
import { RootStackParamList } from "./util/types";
import Colors from "./constants/colors";
import React, { useCallback, useEffect, useState } from "react";
import FavoritesContextProvider from "./store/favoritesContext";
import BottomTabsNavigator from "./components/BottomTabs";
import AlkoholContextProvider from "./store/alkoholContext";
import { init } from "./util/database";
import * as SplashScreen from "expo-splash-screen";
import { MenuProvider } from "react-native-popup-menu";
import { Ionicons } from "@expo/vector-icons";


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  

  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (dbInitialized) {
      await SplashScreen.hideAsync();
    }
  }, [dbInitialized]);

  return (
    <>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar backgroundColor="#333d32" style="light" />

        <MenuProvider>
          <FavoritesContextProvider>
            <AlkoholContextProvider>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName="WelcomeScreen"
                  screenOptions={{
                    headerStyle: { backgroundColor: Colors.green700 },
                    headerTintColor: Colors.light100,
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                      fontSize: 50,
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
                      // contentStyle: { backgroundColor: Colors.error500 },
                    }}
                  />
                  <Stack.Screen
                    name="DrinkDetailScreen"
                    component={DrinkDetailScreen}
                    options={{
                      contentStyle: { backgroundColor: Colors.green100 },
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </AlkoholContextProvider>
          </FavoritesContextProvider>
        </MenuProvider>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
function changeNavigationBarColor(arg0: string, arg1: boolean) {
  throw new Error("Function not implemented.");
}

