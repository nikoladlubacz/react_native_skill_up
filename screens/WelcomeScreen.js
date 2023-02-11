import { View, StyleSheet, Button, Text, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../util/types";
import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/colors";
import React from "react";

function WelcomeScreen({ navigation }) {
  function pressHandler() {
    navigation.navigate("DrinksScreen");
  }

  return (
    <View style={styles.appContainer}>
      <View style ={styles.logoContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}> Drink Advisor</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={require("../assets/adaptive-icon.png")} style={styles.image}></Image>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}> Time for drink!!!</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <PrimaryButton onPress={pressHandler} width='100%'>Random drink</PrimaryButton>
        </View>
        <View style={styles.button}>
          <PrimaryButton onPress={pressHandler} width='100%'>Continue</PrimaryButton>
        </View>
      </View>

    </View >
  )
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 30,
    backgroundColor: Colors.green700,
  },
  logoContainer: {
    flex: 8,
    justifyContent: "center",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 200,
    resizeMode: "contain"
  },
  titleText: {
    fontSize: 42,
    color: Colors.light100,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: Colors.light100,
  },

  button: {
    alignItems: "center",
  },
});
