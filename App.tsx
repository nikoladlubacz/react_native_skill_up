import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import DrinksScreen from "./screens/DrinksScreen";
import DrinkDetailScreen from "./screens/DrinkDetailScreen";
import { RootStackParamList } from "./util/types";
import Colors from "./constants/colors";
import Drink from "./models/drink";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
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
              contentStyle: { backgroundColor: Colors.green600 },
            }}
          />
          <Stack.Screen
            name="DrinkDetailScreen"
            component={DrinkDetailScreen}
            options={{
              title: "Drink Details",
              contentStyle: { backgroundColor: Colors.green600 },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
