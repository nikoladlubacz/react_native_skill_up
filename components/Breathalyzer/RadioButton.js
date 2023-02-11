import { Text, View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import { CheckBox } from "react-native-elements";
import { useState } from "react";

function RadioButton({
  label,
  invalid,
  checkedMale,
  checkedFemale,
  onPressMale,
  onPressFemale,
}) {
  return (
    <View style={styles.compContainer}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <View style={styles.radioButtonContainer}>
        <CheckBox
          title={<Text style={[styles.label, styles.titleCheckbox]}>Male</Text>}
          center
          checked={checkedMale}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor={Colors.green700}
          uncheckedColor={Colors.green100}
          onPress={onPressMale}
          containerStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            padding: 0,
            margin: 0,
          }}
        />
        <CheckBox
          title={
            <Text style={[styles.label, styles.titleCheckbox]}>Female</Text>
          }
          center
          checked={checkedFemale}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor={Colors.green700}
          uncheckedColor={Colors.green100}
          onPress={onPressFemale}
          containerStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            padding: 0,
            margin: 0,
          }}
        />
      </View>
    </View>
  );
}

export default RadioButton;

const styles = StyleSheet.create({
  compContainer: {
    marginVertical: 10,
  },
  label: {
    color: Colors.green700,
    fontSize: 14,
    paddingBottom: 6,
  },
  radioButtonContainer: {
    flexDirection: "row",
  },
  titleCheckbox: {
    marginLeft: 18,
  },
  invalidLabel: {
    color: Colors.error500,
  },
});
