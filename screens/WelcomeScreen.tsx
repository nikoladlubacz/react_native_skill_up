import { View, StyleSheet, Button, Text, ImageBackground } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../util/types";

type WelcomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "WelcomeScreen"
>;

function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  function pressHandler() {
    navigation.navigate("DrinkList");
  }

  return (
    <ImageBackground
      source={require("../assets/images/welcome_background.jpg")}
      resizeMode="cover"
      style={styles.rootScreen}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.appContainer}>
        <View style={styles.buttonContainer}>
          <Button title="Welcome" onPress={pressHandler}></Button>
        </View>
      </View>
    </ImageBackground>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
  },
  buttonContainer: {
    alignItems: "center",
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.75,
  },
});
