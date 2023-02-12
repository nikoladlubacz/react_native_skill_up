import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import Colors from "../constants/colors";

function ErrorHandling() {
    return (
        <ScrollView style={styles.appContainer}>
            <View style={styles.screenContainer}>
                <Text style={styles.text}>No internet, no drinking!</Text>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={require("../assets/gif/no-internet.gif")} />
                </View>
            </View>
        </ScrollView>
    )
}

export default ErrorHandling

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
    },
    screenContainer: {
        alignItems: "center",
        paddingBottom: 60,
    },
    imageContainer: {
        width: 250,
        height: 350,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 18,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: Colors.green500,
        margin: 14,
        shadowColor: Colors.green900,
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: "hidden",
    },
    text: {
        fontSize: 20, marginVertical: 14, color: Colors.green900, textAlign: "center", paddingTop: 12
    },
    image: {
        width: "100%", height: "100%", resizeMode: "cover"
    }
})