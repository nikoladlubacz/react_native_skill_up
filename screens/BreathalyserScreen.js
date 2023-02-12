import { React, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import BreathalyserForm from "../components/breathalyser/BreathalyserForm";
import Colors from "../constants/colors";
import { fetchRandomDrink } from "../util/http";

function BreathalyserScreen({ navigation }) {
  const [randomDrink, setRandomDrink] = useState([]);

  useEffect(() => {
    async function getRandomDrink() {
      try {
        const fetchedRandomDrink = await fetchRandomDrink();
        setRandomDrink(fetchedRandomDrink);
      } catch (error) {
        console.log(error);
      }
    }
    getRandomDrink();
  }, []);

  function checkHandler(formData) {
    if (formData.amountOfAlcohol == 0 || formData.strengthOfAlcohol == 0) {
      let message = "";
      if (formData.amountOfAlcohol == 0) {
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
            onPress: () => { },
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
      let message = `You drunk ${formData.amountOfAlcohol} ml of ${formData.strengthOfAlcohol} % alcohol!`;
      Alert.alert(
        `${formData.name}, You are drunk !`,
        `${message}`,
        [
          {
            text: "Nevermind",
            onPress: () => {
              navigation.navigate("DrinkDetailScreen", {
                drinkId: randomDrink[0].drinkId,
                drinkName: randomDrink[0].nameDrink,
              });
            },
          },

          {
            text: "Cancel",
            onPress: () => { },
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
      <BreathalyserForm onSubmitBtn={checkHandler} />
    </ScrollView>
  );
}

export default BreathalyserScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: Colors.green300,
    paddingBottom: 460
  },
});
