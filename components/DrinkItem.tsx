import { View, Text, StyleSheet, Image } from "react-native";
import Colors from "../constants/colors";

type Props = {
  id: number;
  name: string;
  image: string;
  instruction: string;
  ingredient1: string;
  ingredient2: string;
  ingredient3: string;
  ingredient4: string;
  ingredient5: string;
  measure1: string;
  measure2: string;
  measure3: string;
  measure4: string;
  measure5: string;
};

function DrinkItem({
  image,
  instruction,
  ingredient1,
  ingredient2,
  ingredient3,
  ingredient4,
  ingredient5,
  measure1,
  measure2,
  measure3,
  measure4,
  measure5,
}: Props) {
  return (
    <View>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.detailContainer}>
        <View>
          <Text style={styles.ingredient}>{measure1}</Text>
          <Text style={styles.ingredient}>{measure2}</Text>
          <Text style={styles.ingredient}>{measure3}</Text>
          <Text style={styles.ingredient}>{measure4}</Text>
          <Text style={styles.ingredient}>{measure5}</Text>
        </View>
        <View>
          <Text style={styles.ingredient}>{ingredient1}</Text>
          <Text style={styles.ingredient}>{ingredient2}</Text>
          <Text style={styles.ingredient}>{ingredient3}</Text>
          <Text style={styles.ingredient}>{ingredient4}</Text>
          <Text style={styles.ingredient}>{ingredient5}</Text>
        </View>
        <Text style={styles.instruction}>{instruction}</Text>
      </View>
    </View>
  );
}

export default DrinkItem;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 350,
  },
  detailContainer: {
    flexDirection: "row",
    margin:4
  },
  ingredient: {
    flex: 1,
    fontSize: 14,
    margin: 2,
    color: Colors.grey800,
  },
  instruction: {
    flex: 2,
    fontSize: 18,
    margin: 2,
    // textAlign: "center",
    color: Colors.grey800,
  },
});
