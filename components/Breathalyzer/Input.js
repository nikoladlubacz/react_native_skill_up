import { Text, TextInput, View } from "react-native";

function Input({ label, textInputConfig }) {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput {...textInputConfig}></TextInput>
    </View>
  );
}

export default Input;
