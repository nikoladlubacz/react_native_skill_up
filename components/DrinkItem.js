import React from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import Colors from "../constants/colors";
import Drink from "../models/drink";
import PrimaryButton from "./PrimaryButton";
import { useState } from "react";

function DrinkItem(drink) {
  const [ingredients, setIngredients] = useState(true);
  const [steps, setSteps] = useState(false);

  const pressedIngrediens = () => {
    setIngredients(true);
    setSteps(false);
  };

  const pressedSteps = () => {
    setIngredients(false);
    setSteps(true);
  };

  function renderItem(ingredient) {
    return (
      <View>
        <Text style={styles.ingredientStyle}>{`\u2022 ${ingredient}`}</Text>
      </View>
    );
  }

  function checkHandler() {}

  return (
    <View>
      <Image style={styles.image} source={{ uri: drink.drink.image }} />
      <View style={styles.detailContainer}>
        <View style={styles.buttons}>
          <PrimaryButton
            width="48%"
            onPress={pressedIngrediens}
            color="Colors.green800"
          >
            Ingredients
          </PrimaryButton>
          <PrimaryButton width="48%" onPress={pressedSteps}>
            Steps
          </PrimaryButton>
        </View>
        {ingredients && (
          <View style={styles.ingredientsContainer}>
            <FlatList
              data={drink.drink.ingredients}
              renderItem={({ item }) => renderItem(item)}
            />
          </View>
        )}
        {steps && (
          <View style={styles.instructionContainer}>
            <Text style={styles.instruction}>{drink.drink.instructions}</Text>
          </View>
        )}
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
    margin: 24,
  },
  ingredientStyle: {
    fontSize: 16,
    margin: 2,
    color: Colors.grey800,
    marginVertical:4,
  },
  ingredientsContainer: {
    paddingLeft: 6,
    marginVertical: 18,
  },
  instruction: {
    fontSize: 18,
    margin: 2,
    color: Colors.grey800,
    textAlign: "center",
  },
  instructionContainer: {
    marginVertical: 24,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
