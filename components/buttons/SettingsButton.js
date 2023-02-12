import { View, StyleSheet } from "react-native";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { useNavigation } from '@react-navigation/native';

function SettingsButton() {
    const navigation = useNavigation();

    return (
        <Menu

            onSelect={(value) => {
                switch (value) {
                    case 1: navigation.navigate("NotificationsScreen"); break
                    case 2: navigation.navigate("AuthenticationScreen"); break
                }
            }}
        >
            <MenuTrigger>
                <View style={styles.menuContext}>
                    <Ionicons
                        name="settings-outline"
                        color={Colors.light100}
                        size={24}
                    />
                </View>
            </MenuTrigger>
            <MenuOptions>
                <MenuOption value={1} text="Notifications" />
                <MenuOption value={2} text="Authentication" />
            </MenuOptions>
        </Menu>
    )
}

export default SettingsButton

const styles = StyleSheet.create({
    menuContext: {
        justifyContent: "flex-end",
        alignItems: "center",
        marginRight: 10,
    }
})
