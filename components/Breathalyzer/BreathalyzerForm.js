import { View, Text, StyleSheet } from "react-native";
import { Input, MultipleInput } from "./Input";
import { CheckBox } from "react-native-elements";

import { useState } from "react";
import Colors from "../../constants/colors";
// import MultipleInput from "./MultipleInput";

function BreathalyzerForm() {
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);

  const genderMale = () => {
    setMale(true);
    setFemale(false);
  };

  const genderFemale = () => {
    setMale(false);
    setFemale(true);
  };

  function inputChangedHandle() {}
  return (
    <View>
      <Input
        label="Your name:"
        measurementUnit=""
        textInputConfig={{
          keyboardType: "default-pad",
          onChangeText: inputChangedHandle,
          autoCapitalize: "words",
        }}
      />

      <Text style={styles.label}>Choose your gender:</Text>
      <View style={styles.radioButtonContainer}>
        <CheckBox
          title="Male"
          center
          checked={male}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor={Colors.green200}
          onPress={genderMale}
          containerStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
        />
        <CheckBox
          title="Female"
          center
          checked={female}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor={Colors.green200}
          onPress={genderFemale}
          containerStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
        />
      </View>
      <Input
        label="Your weight"
        measurementUnit="kg"
        textInputConfig={{
          keyboardType: "number-pad",
          onChangeText: inputChangedHandle,
        }}
      />
      <MultipleInput
        label="Enter the amount and strength of alcohol with you consumed"
        textInputConfig1={{
          keyboardType: "number-pad",
          onChangeText: inputChangedHandle,
        }}
        textInputConfig2={{
          keyboardType: "number-pad",
          onChangeText: inputChangedHandle,
        }}
        measurementUnit1="ml"
        measurementUnit2="%"
      ></MultipleInput>
      <MultipleInput
        label="When you started drinking alcohol"
        textInputConfig1={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: () => {},
        }}
        textInputConfig2={{
          placeholder: "HH-MM",
          maxLength: 10,
          onChangeText: () => {},
        }}
      />
      <Input
        label="Your email"
        textInputConfig={{
          keyboardType: "default-pad",
          onChangeText: inputChangedHandle,
        }}
      />
    </View>
  );
}

export default BreathalyzerForm;

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
  },
  label: {
    color: Colors.green200,
    fontSize: 12,
    // color:
    margimBottom: 4,
  },
});
