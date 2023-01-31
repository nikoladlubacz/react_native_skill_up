import { View, StyleSheet, Button, Text, ImageBackground } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../util/types";
import PrimaryButton from "../components/PrimaryButton";
import Colors from "../constants/colors";

type WelcomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "WelcomeScreen"
>;

function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  function pressHandler() {
    navigation.navigate("DrinksScreen");
  }

  return (
    <ImageBackground
      source={require("../assets/images/welcome_background.jpg")}
      resizeMode="cover"
      style={styles.image}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.appContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}> Time for drink!!!</Text>
        </View>
        <View style={styles.emptyContainer}></View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={pressHandler}>Continue</PrimaryButton>
        </View>
      </View>
    </ImageBackground>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 30,
  },
  image: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.75,
  },
  titleContainer: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 32,
    color: Colors.green1000,
  },
  emptyContainer: {
    flex: 2,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
