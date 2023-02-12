import { Text, TextInput, View, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

function BreathalyserInput({ label, invalid, textInputConfig, suffix }) {
  return (
    <View style={styles.compContainer}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <View style={styles.input}>
        <TextInput
          {...textInputConfig}
          style={styles.textInput}
          underlineColorAndroid="transparent"
        />
        <Text style={styles.suffix}>{suffix}</Text>
      </View>
    </View>
  );
}

function BreathalyserMultipleInput({
  label,
  invalid,
  textInputConfig1,
  textInputConfig2,
  suffix1,
  suffix2,
}) {
  return (
    <View style={styles.compContainer}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <View style={styles.multipleInput}>
        <View style={[styles.input, { marginRight: 6 }]}>
          <TextInput
            {...textInputConfig1}
            style={styles.textInput}
            underlineColorAndroid="transparent"
          />
          <Text style={styles.suffix}>{suffix1}</Text>
        </View>
        <View style={[styles.input, { marginLeft: 6 }]}>
          <TextInput
            {...textInputConfig2}
            style={styles.textInput}
            underlineColorAndroid="transparent"
          />
          <Text style={styles.suffix}>{suffix2}</Text>
        </View>
      </View>
    </View>
  );
}

export { BreathalyserInput, BreathalyserMultipleInput };

const styles = StyleSheet.create({
  compContainer: {
    marginVertical: 10,
  },
  label: {
    color: Colors.green700,
    fontSize: 14,
    paddingBottom: 6,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.green100,
    borderRadius: 18,
    height: 40,
    borderColor: Colors.green500,
  },
  multipleInput: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    flex: 1,
    color: Colors.green700,
    backgroundColor: Colors.green100,
    paddingLeft: 14,
    borderRadius: 18,
    fontSize: 18,
  },
  suffix: {
    paddingRight: 24,
    paddingLeft: 4,
    color: Colors.green700,
  },
  titleCheckbox: {
    marginLeft: 18,
  },
  invalidLabel: {
    color: Colors.error500,
  },
});
