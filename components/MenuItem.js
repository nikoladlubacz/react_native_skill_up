import React from "react";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import Colors from "../constants/colors";
import { AlkoholContext } from "../store/alkoholContext";
import { useContext } from "react";

function MenuItem({ name, image, onPress }) {
  const alkoholCtx = useContext(AlkoholContext);
  const alkohol = alkoholCtx.alkoholName;

  const imageStyle =
    alkohol == name ? styles.pressedImageContainer : styles.imageContainer;

  return (
    <View>
      <View style={styles.screen}>
        <Pressable onPress={onPress}>
          <View style={imageStyle}>
            <Image style={styles.image} source={image} />
          </View>
        </Pressable>
        <Text>{name}</Text>
      </View>
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
  pressedImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 150 / 2,
    borderWidth: 1,
    borderColor: Colors.green800,
    backgroundColor: Colors.green600,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 40,
    height: 40,
    overflow: "hidden",
  },
});
