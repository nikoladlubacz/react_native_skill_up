import React from "react";
import { View, Pressable, Text, StyleSheet, Image } from "react-native";
import Colors from "../constants/colors";

type Props = {
  id: number;
  name: string;
  image: string;
  onPress: () => void;
};

function DrinkGridTile({ name, image, onPress }: Props) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: Colors.green4}}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{name}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default DrinkGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 12,
    height: 200,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: Colors.green25,
    shadowColor: Colors.green4,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: "hidden",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.45,
  },
  innerContainer: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    color: Colors.green4,
    marginHorizontal: 4,
    fontWeight:"bold"
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  imageContainer: {
    width: "100%",
    height: "80%",
   
  },
  titleContainer: {
    height: "20%",
    justifyContent: "center",
  },
});
