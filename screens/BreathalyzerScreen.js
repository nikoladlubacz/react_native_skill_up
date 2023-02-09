import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import BreathalyzerForm from "../components/Breathalyzer/BreathalyzerForm";
import Colors from "../constants/colors";
import React from "react";
import { useState } from "react";

// type BreathalyzerScreenProps = NativeStackScreenProps<
//   BottomTabParamList,
//   "BreathalyzerScreen"
// >;

function BreathalyzerScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  function checkHandler(formData) {
    console.log(modalVisible);

    if (formData.amountOfAlkohol == 0 || formData.strengthOfAlkohol == 0) {
      setModalVisible(true);
      setModalText("You are sober !");
    } else {
      setModalVisible(true);
      setModalText("You are drunk !");
    }
  }

  return (
    <ScrollView style={styles.appContainer}>
      <BreathalyzerForm onSubmitBtn={checkHandler} />
      <Modal visible={modalVisible}>
        <View style={styles.inputContainer}>
          <Text>{modalText}</Text>
          <Button onPress={() => setModalVisible(false)} title="close"></Button>
        </View>
      </Modal>
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
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});
