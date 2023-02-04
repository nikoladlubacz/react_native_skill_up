import { View, StyleSheet, Alert, Text, ScrollView } from "react-native";
import { Input, MultipleInput, RadioButton } from "./Input";

import { useState } from "react";
import Colors from "../../constants/colors";
import PrimaryButton from "../PrimaryButton";

function BreathalyzerForm({ onSubmitBtn }) {
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);

  const [inputValue, setInputValue] = useState({
    name: { value: "", isValid: true },
    gender: { value: "", isValid: true },
    // male: { value: "", isValid: false },
    // female: { value: "", isValid: false },
    weight: { value: "", isValid: true },
    amountOfAlkohol: { value: "", isValid: true },
    strengthOfAlkohol: { value: "", isValid: true },
    date: { value: "", isValid: true },
    time: { value: "", isValid: true },
    email: { value: "", isValid: true },
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
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function checkHandler() {
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regTime = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;

    console.log("TEST ! ! !");
    const formData = {
      name: inputValue.name.value,
      gender: inputValue.gender.value,
      // male: inputValue.male.value,
      // female: inputValue.female.value,
      weight: inputValue.weight.value,
      amountOfAlkohol: inputValue.amountOfAlkohol.value,
      strengthOfAlkohol: inputValue.strengthOfAlkohol.value,
      date: new Date(inputValue.date.value),
      time: inputValue.time.value,
      email: inputValue.email.value,
    };
    const nameIsValid = formData.name.trim().length > 0;
    const genderIsValid =
      (male === true && female === false) ||
      (male === false && female === true);
    const weightIsValid = !isNaN(formData.weight) && formData.weight > 0;
    const amountOfAkoholoIsValid =
      !isNaN(formData.amountOfAlkohol) && formData.amountOfAlkohol > 0;
    const strenghtOfAkoholoIsValid =
      !isNaN(formData.strengthOfAlkohol) && formData.strengthOfAlkohol > 0;
    const dateIsValid = formData.date.toString() !== "Invalid Date";
    const timeIsValid = regTime.test(formData.time) === true;
    const emailIsValid = regEmail.test(formData.email) === true;

    if (
      !nameIsValid ||
      !genderIsValid ||
      !weightIsValid ||
      !amountOfAkoholoIsValid ||
      !strenghtOfAkoholoIsValid ||
      !dateIsValid ||
      !timeIsValid ||
      !emailIsValid
    ) {
      setInputValue((curInputValues) => {
        return {
          name: { value: curInputValues.name.value, isValid: nameIsValid },
          // male: { value: curInputValues.male.value, isValid: genderIsValid },
          // female: {
          //   value: curInputValues.female.value,
          //   isValid: genderIsValid,
          // },
          gender: { value: "", isValid: genderIsValid },
          weight: {
            value: curInputValues.weight.value,
            isValid: weightIsValid,
          },
          amountOfAlkohol: {
            value: curInputValues.amountOfAlkohol.value,
            isValid: amountOfAkoholoIsValid,
          },
          strengthOfAlkohol: {
            value: curInputValues.strengthOfAlkohol.value,
            isValid: strenghtOfAkoholoIsValid,
          },
          date: { value: curInputValues.date.value, isValid: dateIsValid },
          time: { value: curInputValues.time.value, isValid: timeIsValid },
          email: { value: curInputValues.email.value, isValid: emailIsValid },
        };
      });
      return;
    }
    onSubmitBtn(formData);
  }

  const formIsValid =
    !inputValue.name.isValid ||
    !inputValue.gender.isValid ||
    // !inputValue.male.isValid ||
    // !inputValue.female.isValid ||
    !inputValue.weight.isValid ||
    !inputValue.amountOfAlkohol.isValid ||
    !inputValue.strengthOfAlkohol.isValid ||
    !inputValue.date.isValid ||
    !inputValue.time.isValid ||
    !inputValue.email.isValid;

  return (
    <ScrollView style={styles.container}>
      <Input
        label="Your name:"
        measurementUnit=""
        invalid={!inputValue.name.isValid}
        textInputConfig={{
          keyboardType: "default-type",
          autoCapitalize: "words",
          onChangeText: inputChangedHandle.bind(this, "name"),
          value: inputValue.name.value,
        }}
      />
      <RadioButton
        label="Choose your gender:"
        invalid={!inputValue.gender.isValid}
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
        invalid={!inputValue.weight.isValid}
        textInputConfig={{
          keyboardType: "number-pad",
          onChangeText: inputChangedHandle.bind(this, "weight"),
          value: inputValue.weight.value,
        }}
      />
      <MultipleInput
        label="Enter the amount and strength of alcohol which you consumed:"
        invalid={
          !inputValue.amountOfAlkohol.isValid ||
          !inputValue.strengthOfAlkohol.isValid
        }
        textInputConfig1={{
          keyboardType: "number-pad",
          onChangeText: inputChangedHandle.bind(this, "amountOfAlkohol"),
          value: inputValue.amountOfAlkohol.value,
        }}
        suffix1="ml"
        textInputConfig2={{
          keyboardType: "number-pad",
          onChangeText: inputChangedHandle.bind(this, "strengthOfAlkohol"),
          value: inputValue.strengthOfAlkohol.value,
        }}
        suffix2="%"
      ></MultipleInput>
      <MultipleInput
        label="When you started drinking alcohol:"
        invalid={!inputValue.date.isValid || !inputValue.time.isValid}
        textInputConfig1={{
          placeholder: "HH:MM",
          onChangeText: inputChangedHandle.bind(this, "time"),
          value: inputValue.time.value,
        }}
        textInputConfig2={{
          placeholder: "YYYY-MM-DD",
          onChangeText: inputChangedHandle.bind(this, "date"),
          value: inputValue.date.value,
        }}
      />
      <Input
        label="Your email:"
        invalid={!inputValue.email.isValid}
        textInputConfig={{
          keyboardType: "email-addres",
          onChangeText: inputChangedHandle.bind(this, "email"),
          value: inputValue.email.value,
        }}
      />
      {formIsValid && (
        <Text style={styles.errorText}>
          Invalid input! Please check your inputs.
        </Text>
      )}
      <View style={styles.button}>
        <PrimaryButton width="100%" onPress={checkHandler}>
          Check
        </PrimaryButton>
      </View>
    </ScrollView>
  );
}

export default BreathalyzerForm;

const styles = StyleSheet.create({
  container: {
    // marginVertical: 12,
  },
  button: {
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
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.error500,
    margin: 8,
  },
});
