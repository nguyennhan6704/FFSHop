import { View, Text, TouchableOpacity } from "react-native";
import AuthViewModels from "../viewmodels/AuthViewModels";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";

export default function ProfileScreen() {
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {

        }
    }, [isFocused])

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>Profile Screen</Text>
            <TouchableOpacity style={{ padding: 20, backgroundColor: "red", borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}
                onPress={() => AuthViewModels.logout()}>
                <Text>LogOut</Text>
            </TouchableOpacity>
        </View>
    );
}