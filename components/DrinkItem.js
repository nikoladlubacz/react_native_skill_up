import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import Colors from "../constants/colors";
import Drink from "../models/drink";

// type Props = {
//   name: string,
//     image: string,
//     category: string,
//     alcoholic: string,
//     glass: string,
//     instructions: string,
//     ingredients: string[],
//     measures: string[]
// };

function DrinkItem(drink) {

  function renderItem(ingredient) {
    return (
      <View style={styles.detailContainer}>
        <Text>{ingredient}</Text>
      </View>
    );
  }

  return (
    <View>
      <Image style={styles.image} source={{ uri: drink.drink.image }} />
      <View style={styles.detailContainer}>
        {/* <View>
          <FlatList
            data={drink.measures}
            extraData={drink.ingredients}
            keyExtractor={item => item}
            renderItem={({ item, index }) => renderItem(item, drink.ingredients[index])}
          />
        </View> */}
        <View>
          <FlatList
            data={drink.drink.ingredients}
            renderItem={({ item }) => renderItem(item)}
          />
        </View>

        <Text style={styles.instruction}>{drink.drink.instructions}</Text>
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
    margin: 4,
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
    color: Colors.grey800,
  },
});
