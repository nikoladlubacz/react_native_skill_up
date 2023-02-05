import { ScrollView, View, Text, StyleSheet } from "react-native";
import BreathalyzerForm from "../components/Breathalyzer/BreathalyzerForm";
import Colors from "../constants/colors";
import React from "react";

// type BreathalyzerScreenProps = NativeStackScreenProps<
//   BottomTabParamList,
//   "BreathalyzerScreen"
// >;

function BreathalyzerScreen({ navigation }) {
  function checkHandler() {}

  return (
    <ScrollView style={styles.appContainer}>
      <BreathalyzerForm onSubmitBtn={checkHandler} />
    </ScrollView>
  );
}

export default BreathalyzerScreen;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.green1000,
  },
});
