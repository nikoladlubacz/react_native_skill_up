import { React, useContext } from "react";
import { View, StyleSheet, Image, Text, Pressable, Dimensions } from "react-native";
import Colors from "../../constants/colors";
import { AlcoholContext } from "../../util/alcoholContext";

function CategoryItem({ name, image, onPress }) {
  const alcoholCtx = useContext(AlcoholContext);
  const alcohol = alcoholCtx.alcoholName;

  const imageStyle =
    alcohol == name ? styles.pressedImageContainer : styles.imageContainer;

  return (
    <View style={styles.screen}>
      <Pressable onPress={onPress}>
        <View style={imageStyle}>
          <Image style={styles.image} source={image} />
        </View>
      </Pressable>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}
const windowWidth = Dimensions.get('window').width;

export default CategoryItem;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: windowWidth / 36
  },
  imageContainer: {
    width: windowWidth / 6,
    height: windowWidth / 6,
    borderRadius: 150 / 2,
    borderWidth: 1,
    borderColor: Colors.green500,
    backgroundColor: Colors.green100,
    alignItems: "center",
    justifyContent: "center",
  },
  pressedImageContainer: {
    width: windowWidth / 6,
    height: windowWidth / 6,
    borderRadius: 150 / 2,
    borderWidth: 1,
    borderColor: Colors.green500,
    backgroundColor: Colors.green500,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "75%",
    height: "75%",
    overflow: "hidden",
  },
  text: {
    color: Colors.green900
  }
});
