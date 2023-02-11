import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../constants/colors";

function DetailButton({ children, onPress, width, isPressed }) {
  const buttonInnerStyle = isPressed
    ? styles.pressedButtonInnerContainer
    : styles.buttonInnerContainer;

  return (
    <View style={[styles.buttonOuterContainer, { width: width }]}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: Colors.green4}}
      >
        <View style={buttonInnerStyle}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default DetailButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.green4,
  },
  buttonInnerContainer: {
    backgroundColor: Colors.green3,
    paddingVertical: 8,
    paddingHorizontal: 6,
    elevation: 4,
  },
  pressedButtonInnerContainer: {
    backgroundColor: Colors.green4,
    paddingVertical: 8,
    paddingHorizontal: 6,
    elevation: 4,
  },
  buttonText: {
    color: Colors.light,
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase",
  },
  pressed: {
    opacity: 0.75,
  },
});
