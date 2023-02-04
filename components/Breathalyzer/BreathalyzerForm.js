import { View, StyleSheet, Button } from "react-native";
import { Input, MultipleInput, RadioButton } from "./Input";

import { useState } from "react";
import Colors from "../../constants/colors";
import PrimaryButton from "../PrimaryButton";

function BreathalyzerForm() {
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);

  const [inputValue, setInputValue] = useState({
    name: "",
    weight: "",
    amountOfAlkohol: "",
    strengthOfAlkohol: "",
    date: "",
    time: "",
    email: "",
  });

  const genderMale = () => {
    setMale(true);
    setFemale(false);
  };

  const genderFemale = () => {
    setMale(false);
    setFemale(true);
  };

  function inputChangedHandle(inputIdentifier, enteredValue) {
    setInputValue((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  return (
    <View style={styles.container}>
      <Input
        label="Your name:"
        measurementUnit=""
        textInputConfig={{
          keyboardType: "default-type",
          autoCapitalize: "words",
          onChangeText: inputChangedHandle.bind(this, "name"),
          value: inputValue.name,
        }}
      />
      <RadioButton
        label="Choose your gender:"
        title1="Male"
        title2="Female"
        checked1={male}
        checked2={female}
        onPress1={genderMale}
        onPress2={genderFemale}
      ></RadioButton>
      <Input
        label="Your weight:"
        suffix="kg"
        textInputConfig={{
          keyboardType: "number-pad",
          onChangeText: inputChangedHandle.bind(this, "weight"),
          value: inputValue.weight,
        }}
      />
      <MultipleInput
        label="Enter the amount and strength of alcohol with you consumed:"
        textInputConfig1={{
          keyboardType: "number-pad",
          onChangeText: inputChangedHandle.bind(this, "amountOfAlkohol"),
          value: inputValue.amountOfAlkohol,
        }}
        suffix1="ml"
        textInputConfig2={{
          keyboardType: "number-pad",
          onChangeText: inputChangedHandle.bind(this, "strengthOfAlkohol"),
          value: inputValue.strengthOfAlkohol,
        }}
        suffix2="%"
      ></MultipleInput>
      <MultipleInput
        label="When you started drinking alcohol:"
        textInputConfig1={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          onChangeText: inputChangedHandle.bind(this, "date"),
          value: inputValue.date,
        }}
        textInputConfig2={{
          placeholder: "HH-MM",
          maxLength: 10,
          onChangeText: inputChangedHandle.bind(this, "time"),
          value: inputValue.time,
        }}
      />
      <Input
        label="Your email:"
        textInputConfig={{
          keyboardType: "email-addres",
          onChangeText: inputChangedHandle.bind(this, "email"),
          value: inputValue.email,
        }}
      />
      <View style={styles.buttons}>
        <PrimaryButton width="48%">Cancel</PrimaryButton>
        <PrimaryButton width="48%">Check</PrimaryButton>
      </View>
    </View>
  );
}

export default BreathalyzerForm;

const styles = StyleSheet.create({
  container: {
    // marginVertical: 12,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
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
