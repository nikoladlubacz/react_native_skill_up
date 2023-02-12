import { View, Text, StyleSheet } from "react-native";
import { Reac } from "react";
import Colors from "../constants/colors";


function NotificationsScreen() {

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.text}>Sorry, In progress...</Text>
        </View>

    );
}

export default NotificationsScreen;

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Colors.green300,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 32
    }
});
