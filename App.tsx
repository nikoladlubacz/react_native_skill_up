import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import AlcoholContextProvider from "./util/alcoholContext";
import { init } from "./util/database";
import * as SplashScreen from "expo-splash-screen";
import { MenuProvider } from "react-native-popup-menu";
import StackNavigation from "./navigation/StackNavigation";

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
          <AlcoholContextProvider>
            <NavigationContainer>
              <StackNavigation />
            </NavigationContainer>
          </AlcoholContextProvider>
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

