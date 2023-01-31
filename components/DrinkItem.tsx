import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../constants/colors";

type Props = {
  id: number;
  name: string;
  image: string;
  instruction: string;
};

function DrinkItem({ image, instruction }: Props) {
  return (
    <View>
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.instruction}>{instruction}</Text>
    </View>
  );
}

export default DrinkItem;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 350,
  },
  instruction: {
    fontSize: 18,
    margin: 8,
    textAlign: "center",
    color: Colors.grey800,
  },
});
