import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function PrimaryButton({ children, onPress, width }) {
  return (
    <View style={[styles.buttonOuterContainer, { width: width }]}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [
              { backgroundColor: pressed ? "black" : "white" },
              styles.buttonInnerContainer,
              styles.pressed,
            ]
            : styles.buttonInnerContainer
        }
        onPress={onPress}
        android_ripple={{ color: Colors.green900 }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.green700,
    height: 52,
  },
  buttonInnerContainer: {
    backgroundColor: Colors.green500,
    height: 52,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: Colors.light100,
    fontSize: 18,
  },
  pressed: {
    opacity: 0.75,
  },
});
