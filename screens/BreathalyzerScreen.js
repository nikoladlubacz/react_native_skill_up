import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
  Alert,
} from "react-native";
import BreathalyzerForm from "../components/Breathalyzer/BreathalyzerForm";
import Colors from "../constants/colors";
import React from "react";
import { fetchRandomDrink } from "../util/http";
import { useEffect, useState } from "react";

function BreathalyzerScreen({ navigation }) {
  const [randomDrink, setRandomDrink] = useState([]);

  useEffect(() => {
    async function getRandomDrink() {
      try {
        const fetchedRandomDrink = await fetchRandomDrink();
        setRandomDrink(fetchedRandomDrink);
      } catch (error) {
        console.log(error);
      } finally {
        // setLoading(false);
      }
    }
    getRandomDrink();
  }, []);
  console.log(randomDrink);

  function checkHandler(formData) {
    if (formData.amountOfAlkohol == 0 || formData.strengthOfAlkohol == 0) {
      let message = "";
      if (formData.amountOfAlkohol == 0) {
        message = "You drunk 0 ml of alcohol";
      } else {
        message = "You drunk only 0 % alcohol";
      }
      Alert.alert(
        `${formData.name}, You are sober !`,
        `${message}`,
        [
          {
            text: "Random drink",
            onPress: () => {
              navigation.navigate("DrinkDetailScreen", {
                drinkId: randomDrink[0].drinkId,
                drinkName: randomDrink[0].nameDrink,
              });
            },
          },

          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "DRINKS",
            onPress: () => navigation.push("DrinksScreen"),
          },
        ],
        { cancelable: false }
      );
    } else {
      let message = `You drunk ${formData.amountOfAlkohol} ml of ${formData.strengthOfAlkohol} % alcohol!`;
      Alert.alert(
        `${formData.name}, You are drunk !`,
        `${message}`,
        [
          {
            text: "Never mind",
            onPress: () => {
              navigation.navigate("DrinkDetailScreen", {
                drinkId: randomDrink[0].drinkId,
                drinkName: randomDrink[0].nameDrink,
              });
            },
          },

          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "DRINKS",
            onPress: () => navigation.push("DrinksScreen"),
          },
        ],
        { cancelable: false }
      );
    }
  }

  return (
    <ScrollView style={styles.appContainer}>
      <BreathalyzerForm onSubmitBtn={checkHandler} />
    </ScrollView>
  );
}

export default BreathalyzerScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.green1000,
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});
