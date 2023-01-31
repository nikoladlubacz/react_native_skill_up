import { View, StyleSheet, Image, Text } from "react-native";
import Colors from "../constants/colors";
import Menu from "../models/menu";

function MenuItem({ name, image }: Menu) {
  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={image} />
      </View>
      <Text>{name}</Text>
    </View>
  );
}

export default MenuItem;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 150 / 2,
    borderWidth: 1,
    borderColor: Colors.green800,
    backgroundColor: Colors.green200,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 40,
    height: 40,
    overflow: "hidden",
  },
});
