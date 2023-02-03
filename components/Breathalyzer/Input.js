import { Text, TextInput, View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
// import TextInputMask from 'react-native-text-input-mask'

function Input({ label, textInputConfig, measurementUnit, value }) {
  const mask ='00,0 kg'
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        {/* <TextInputMask mask ={mask}></TextInputMask> */}
        <TextInput
          {...textInputConfig}
          style={styles.textInput}
          // value={` ${measurementUnit}`}
        ></TextInput>
        <Text>{measurementUnit}</Text>
      </View>
    </View>
  );
}

function MultipleInput({
  label,
  textInputConfig1,
  textInputConfig2,
  measurementUnit1,
  measurementUnit2,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.multipleInputContainer}>
        <TextInput
          {...textInputConfig1}
          style={styles.multipleInput}
        ></TextInput>
        <Text>{measurementUnit1}</Text>
        <TextInput
          {...textInputConfig2}
          style={styles.multipleInput}
        ></TextInput>
        <Text>{measurementUnit2}</Text>
      </View>
    </View>
  );
}

export { Input, MultipleInput };

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginHorizontal: 4,
    marginVertical: 16,
  },
  multipleInputContainer: {
    flexDirection: "row",
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    color: Colors.green200,
    fontSize: 12,
    // color:
    margimBottom: 4,
  },
  input: {
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.green400,
    // color:
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  multipleInput: {
    flex: 1,
    backgroundColor: Colors.green400,
    // color:
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
});
