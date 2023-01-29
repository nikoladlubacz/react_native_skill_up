import {
  View,
  Pressable,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Colors from "../constants/colors";
import Drink from "../models/drink";

function DrinkGridTile({ name, image }: Drink, onPress:void) {
  return (
    <View style={styles.gridItem}>
      <ImageBackground
        source={{ uri: image }}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <Pressable>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{name}</Text>
          </View>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

export default DrinkGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 180,
    borderRadius: 18,
    elevation: 4,
    backgroundColor: Colors.green200,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: "hidden",
  },
  rootScreen: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  backgroundImage: {
    opacity: 0.65,
  },
  innerContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    position: "absolute",
    fontSize: 22,
    fontWeight: "bold",
  },
});
