import { Text, TextInput, View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import { CheckBox } from "react-native-elements";

function Input({ label, textInputConfig, suffix }) {
  return (
    <View style={styles.compContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <TextInput
          {...textInputConfig}
          style={styles.textInput}
          underlineColorAndroid="transparent"
          // onChangeText={(mobile_number) => this.setState({ mobile_number })}
        />
        <Text style={styles.suffix}>{suffix}</Text>
      </View>
    </View>
  );
}

function MultipleInput({
  label,
  textInputConfig1,
  textInputConfig2,
  suffix1,
  suffix2,
}) {
  return (
    <View style={styles.compContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.multipleInput}>
        <View style={[styles.input, { marginRight: 6 }]}>
          <TextInput
            {...textInputConfig1}
            style={styles.textInput}
            underlineColorAndroid="transparent"
            // onChangeText={(mobile_number) => this.setState({ mobile_number })}
          />
          <Text style={styles.suffix}>{suffix1}</Text>
        </View>
        <View style={[styles.input, { marginLeft: 6 }]}>
          <TextInput
            {...textInputConfig2}
            style={styles.textInput}
            underlineColorAndroid="transparent"
            // onChangeText={(mobile_number) => this.setState({ mobile_number })}
          />
          <Text style={styles.suffix}>{suffix2}</Text>
        </View>
      </View>
    </View>
  );
}
function RadioButton({
  label,
  title1,
  title2,
  checked1,
  checked2,
  onPress1,
  onPress2,
}) {
  return (
    <View style={styles.compContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.radioButtonContainer}>
        <CheckBox
          title={
            <Text style={[styles.label, styles.titleCheckbox]}>{title1}</Text>
          }
          center
          checked={checked1}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor={Colors.green200}
          onPress={onPress1}
          containerStyle={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            padding: 0,
            margin: 0,
          }}
        />
        <CheckBox
          title={
            <Text style={[styles.label, styles.titleCheckbox]}>{title2}</Text>
          }
          center
          checked={checked2}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor={Colors.green200}
          onPress={onPress2}
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

export { Input, MultipleInput, RadioButton };

const styles = StyleSheet.create({
  compContainer: {
    marginVertical: 12,
  },
  label: {
    color: Colors.green200,
    fontSize: 14,
    // color:
    paddingBottom: 6,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.green400,
    borderRadius: 12,
    height: 40,
  },
  multipleInput: {
    flexDirection: "row",
    justifyContent: "space-between",

    // borderWidth: 1,
    // alignItems: "center",
    // backgroundColor: Colors.green400,
    // borderRadius: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.green400,
    // color:
    padding: 6,
    borderRadius: 18,
    fontSize: 18,
  },
  suffix: {
    paddingHorizontal: 24,
    fontWeight: "bold",
    color: "black",
  },
  radioButtonContainer: {
    flexDirection: "row",
  },
  titleCheckbox: {
    marginLeft: 18,
  },
});
