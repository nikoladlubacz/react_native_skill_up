import { React, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import BreathalyserForm from "../components/breathalyser/BreathalyserForm";
import Colors from "../constants/colors";
import { fetchRandomDrink } from "../util/http";

import { setDrunkAlert, setSoberAlert } from "../components/breathalyser/BreathalyserAlert";


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
      setSoberAlert(formData, navigation, randomDrink);
    } else {
      setDrunkAlert(formData, navigation, randomDrink);
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
