import { View, StyleSheet, Button, Text, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../util/types";
import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/colors";
import React from "react";
import FadeInView from "../components/FadeInView"
import MoveableView from "../components/MoveableView";
import { Dimensions } from 'react-native';
import { useEffect, useState } from "react";
import { fetchRandomDrink } from "../util/http";
import { useIsFocused } from "@react-navigation/native";


function WelcomeScreen({ navigation }) {
  const [randomDrink, setRandomDrink] = useState([]);
  const isFocused = useIsFocused();

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  function pressHandler() {
    navigation.navigate("DrinksScreen");
  }

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
  }, [isFocused]);

  return (
    <View style={styles.appContainer}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/drink-advisor.png")} style={{ width: windowWidth * 1.05, resizeMode: "contain" }}></Image>
      </View>
      <View style={styles.imageContainer}>
        <FadeInView>
          <View style={styles.image}>
            <Image source={require("../assets/adaptive-icon.png")} style={{ height: windowHeight * 0.5, resizeMode: "contain" }}></Image>
          </View>
        </FadeInView>
      </View>
      <View style={styles.buttonsContainer}>
        <MoveableView start={-windowWidth} end={0}>
          <View style={styles.button}>
            <PrimaryButton onPress={() => {
              navigation.navigate("DrinkDetailScreen", {
                drinkId: randomDrink[0].drinkId,
                drinkName: randomDrink[0].nameDrink,
              });
            }} width='100%'>Let me choose one for you</PrimaryButton>
          </View>
        </MoveableView>
        <MoveableView start={windowWidth} end={0}>
          <View style={styles.button}>
            <PrimaryButton onPress={pressHandler} width='100%'>Explore all drinks</PrimaryButton>
          </View>
        </MoveableView>
      </View>
    </View >
  )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: Colors.green700,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20
  },
  imageContainer: {
    flex: 1, 
    justifyContent: "center"
  },
  image: {
    alignItems: "center",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    alignItems: "center",
    marginVertical: 8,
  },
});
