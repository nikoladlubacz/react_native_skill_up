import { View, Text, StyleSheet } from "react-native";
import Input from "./Input";
import { CheckBox } from "react-native-elements";

import { useState } from "react";

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
      <Text>How Drunk Are You ?</Text>
      <Input
        label="Weight"
        textInputConfig={{
          keyboardType: "number-pad",
          onChangeText: inputChangedHandle,
        }}
      />
      <Text>Choose your gender:</Text>
      <View style={styles.radioButtonContainer}>
        <CheckBox
          title="Male"
          center
          checked={male}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          onPress={genderMale}
          containerStyle={{ backgroundColor: "transparent", borderColor:"transparent" }}
        />
        <CheckBox
          title="Female"
          center
          checked={female}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          onPress={genderFemale}
          containerStyle={{ backgroundColor: "transparent", borderColor:"transparent" }}
        />
      </View>
      <Input
        label="amount of alcohol consumed"
        textInputConfig={{
          keyboardType: "number-pad",
          onChangeText: inputChangedHandle,
        }}
      />
      <Input
        label="strenght of alcohol consumed"
        textInputConfig={{
          keyboardType: "number-pad",
          onChangeText: inputChangedHandle,
        }}
      />
      <Input
        label="It's been a while since drinking alcohol"
        textInputConfig={{
          keyboardType: "number-pad",
          onChangeText: inputChangedHandle,
        }}
      />
      <Input
        label="When you started drinking alcohol"
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: () => {},
        }}
      />
      <Input
        label="Email"
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
});
