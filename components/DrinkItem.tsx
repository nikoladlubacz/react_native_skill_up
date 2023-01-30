import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../constants/colors";

type Props = {
  id: number;
  name: string;
  image: string;
  instruction: string;
};

function MealItem({ id, name, image, instruction }: Props) {
  return (
    <View>
      <Text style={styles.title}>{name}</Text>
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.instruction}>{instruction}</Text>
    </View>
  );
}

export default MealItem;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: Colors.grey800,
  },
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
