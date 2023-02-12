import { Alert } from "react-native";

function DrunkAlert(formData, navigation, randomDrink) {
    console.log(randomDrink)
    let message = `You drunk ${formData.amountOfAlcohol} ml of ${formData.strengthOfAlcohol} % alcohol!`;
    Alert.alert(
        `${formData.name}, You are drunk !`,
        `${message}`,
        [
            {
                text: "Nevermind",
                onPress: () => {
                    navigation.navigate("DrinkDetailScreen", {
                        drinkId: randomDrink[0].drinkId,
                        drinkName: randomDrink[0].nameDrink,
                    });
                },
            },
            {
                text: "Cancel",
                onPress: () => { },
                style: "cancel",
            },
            {
                text: "DRINKS",
                onPress: () => navigation.push("DrinksScreen"),
            },
        ],
        { cancelable: false }
    );
}

function SoberAlert(formData) {
    let message = "";
    if (formData.amountOfAlcohol == 0) {
        message = "You drunk 0 ml of alcohol";
    } else {
        message = "You drunk only 0 % alcohol";
    }
    Alert.alert(
        `${formData.name}, You are sober !`,
        `${message}`,
        [
            {
                text: "Random drink",
                onPress: () => {
                    navigation.navigate("DrinkDetailScreen", {
                        drinkId: randomDrink[0].drinkId,
                        drinkName: randomDrink[0].nameDrink,
                    });
                },
            },
            {
                text: "Cancel",
                onPress: () => { },
                style: "cancel",
            },
            {
                text: "DRINKS",
                onPress: () => navigation.push("DrinksScreen"),
            },
        ],
        { cancelable: false }
    );
}

export { DrunkAlert as setDrunkAlert, SoberAlert as setSoberAlert }