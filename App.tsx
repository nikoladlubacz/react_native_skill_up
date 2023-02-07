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

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        init();
        await SplashScreen.preventAutoHideAsync();
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setDbInitialized(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (dbInitialized) {
      await SplashScreen.hideAsync();
    }
  }, [dbInitialized]);

  if (!dbInitialized) {
    return null;
  }

  return (
    <>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <StatusBar style="auto" />
        <FavoritesContextProvider>
          <AlkoholContextProvider>
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
          </AlkoholContextProvider>
        </FavoritesContextProvider>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
