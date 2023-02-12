import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { BreathalyserInput, BreathalyserMultipleInput } from "./BreathalyserInput";
import BreathalyserGenderButton from "./BreathalyserGenderButton";
import Colors from "../../constants/colors";
import PrimaryButton from "../buttons/PrimaryButton";

function BreathalyserForm({ onSubmitBtn }) {
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);

  const [inputValue, setInputValue] = useState({
    name: { value: "", isValid: true },
    gender: { value: "", isValid: true },
    weight: { value: "", isValid: true },
    amountOfAlcohol: { value: "", isValid: true },
    strengthOfAlcohol: { value: "", isValid: true },
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

    const formData = {
      name: inputValue.name.value,
      gender: male ? "male" : "female",
      weight: inputValue.weight.value,
      amountOfAlcohol: inputValue.amountOfAlcohol.value,
      strengthOfAlcohol: inputValue.strengthOfAlcohol.value,
      date: new Date(inputValue.date.value),
      time: inputValue.time.value,
      email: inputValue.email.value,
    };
    const nameIsValid = formData.name.trim().length > 0;
    const genderIsValid =
      (male === true && female === false) ||
      (male === false && female === true);
    const weightIsValid = !isNaN(formData.weight) && formData.weight > 0;
    const amountOfAlcoholIsValid =
      !isNaN(formData.amountOfAlcohol) &&
      formData.amountOfAlcohol >= 0 &&
      formData.amountOfAlcohol.trim();
    const strengthOfAlcoholIsValid =
      !isNaN(formData.strengthOfAlcohol) &&
      formData.strengthOfAlcohol >= 0 &&
      formData.strengthOfAlcohol <= 100 &&
      formData.strengthOfAlcohol.trim();
    const dateIsValid = formData.date.toString() !== "Invalid Date";
    const timeIsValid = regTime.test(formData.time) === true;
    const emailIsValid = regEmail.test(formData.email) === true;

    if (
      !nameIsValid ||
      !genderIsValid ||
      !weightIsValid ||
      !amountOfAlcoholIsValid ||
      !strengthOfAlcoholIsValid ||
      !dateIsValid ||
      !timeIsValid ||
      !emailIsValid
    ) {
      setInputValue((curInputValues) => {
        return {
          name: { value: curInputValues.name.value, isValid: nameIsValid },
          gender: { value: "", isValid: genderIsValid },
          weight: {
            value: curInputValues.weight.value,
            isValid: weightIsValid,
          },
          amountOfAlcohol: {
            value: curInputValues.amountOfAlcohol.value,
            isValid: amountOfAlcoholIsValid,
          },
          strengthOfAlcohol: {
            value: curInputValues.strengthOfAlcohol.value,
            isValid: strengthOfAlcoholIsValid,
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
    !inputValue.weight.isValid ||
    !inputValue.amountOfAlcohol.isValid ||
    !inputValue.strengthOfAlcohol.isValid ||
    !inputValue.date.isValid ||
    !inputValue.time.isValid ||
    !inputValue.email.isValid;

  return (
    <View style={styles.container}>
      <BreathalyserInput
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
      <BreathalyserGenderButton
        label="Choose your gender:"
        invalid={!inputValue.gender.isValid}
        checkedMale={male}
        checkedFemale={female}
        onPressMale={genderMale}
        onPressFemale={genderFemale}
      ></BreathalyserGenderButton>
      <BreathalyserInput
        label="Your weight:"
        suffix="kg"
        invalid={!inputValue.weight.isValid}
        textInputConfig={{
          keyboardType: "number-pad",
          onChangeText: inputChangedHandle.bind(this, "weight"),
          value: inputValue.weight.value,
        }}
      />
      <BreathalyserMultipleInput
        label="Enter the amount and strength of alcohol which you consumed:"
        invalid={
          !inputValue.amountOfAlcohol.isValid ||
          !inputValue.strengthOfAlcohol.isValid
        }
        textInputConfig1={{
          keyboardType: "number-pad",
          onChangeText: inputChangedHandle.bind(this, "amountOfAlcohol"),
          value: inputValue.amountOfAlcohol.value,
        }}
        suffix1="ml"
        textInputConfig2={{
          keyboardType: "number-pad",
          onChangeText: inputChangedHandle.bind(this, "strengthOfAlcohol"),
          value: inputValue.strengthOfAlcohol.value,
        }}
        suffix2="%"
      ></BreathalyserMultipleInput>
      <BreathalyserMultipleInput
        label="When you started drinking alcohol:"
        invalid={!inputValue.date.isValid || !inputValue.time.isValid}
        textInputConfig1={{
          placeholder: "HH:MM",
          placeholderTextColor: Colors.green400,
          keyboardType: "default",
          onChangeText: inputChangedHandle.bind(this, "time"),
          value: inputValue.time.value,
        }}
        textInputConfig2={{
          placeholder: "YYYY-MM-DD",
          placeholderTextColor: Colors.green400,
          keyboardType: "default",
          onChangeText: inputChangedHandle.bind(this, "date"),
          value: inputValue.date.value,
        }}
      />
      <BreathalyserInput
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
    </View>
  );
}

export default BreathalyserForm;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 80
  },
  radioButtonContainer: {
    flexDirection: "row",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.error500,
    margin: 8,
  },
});
