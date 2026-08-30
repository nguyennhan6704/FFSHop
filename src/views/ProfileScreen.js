import React, { useState, useEffect } from "react";

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";

import AuthViewModels from "../viewmodels/AuthViewModels";

import { SafeAreaView } from "react-native-safe-area-context";

import { useIsFocused } from "@react-navigation/native";
import { auth } from "../../firebaseConfig";

export default function ProfileScreen({ navigation }) {

    const isFocused = useIsFocused();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const data = await AuthViewModels.getCurrentUserData();
            setUser(data);
        }
        catch (error) {

        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isFocused) {
            loadData();
        }
    }, [isFocused])

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.centerContainer}>
                    <ActivityIndicator
                        size="large"
                        color="#3B210A" />
                    <Text style={styles.loadingText}>
                        Đang tải thông tin...
                    </Text>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.userContainer}>

                <View style={styles.avatarContainer}>

                    <Image
                        source={{
                            uri: user && user.avatar
                                ? user.avatar
                                : "https://th.bing.com/th/id/OIP.4E7iaWZGvMGSfu91X-zJUQHaHa?w=201&h=200&c=7&r=0&o=7&pid=1.7&rm=3"
                        }}
                        style={styles.avatar}
                    />

                </View>

                <Text style={styles.userName}>
                    {user && user.username ? user.username : "Khách"}
                </Text>

                <Text style={styles.email}>
                    {user.email}
                </Text>

            </View>

            <View style={styles.menuContainer}>

                <TouchableOpacity style={styles.menuItem}
                    onPress={() => {
                        navigation.navigate("InformationScreen", { userId: user.uid })
                    }}>

                    <Text style={styles.icon}>
                        👤
                    </Text>

                    <Text style={styles.menuText}>
                        Thông tin cá nhân
                    </Text>

                    <Text style={styles.arrow}>
                        ›
                    </Text>

                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.menuItem}
                    onPress={() => {
                        navigation.navigate("OrderScreen");
                    }}>

                    <Text style={styles.icon}>
                        🛒
                    </Text>

                    <Text style={styles.menuText}>
                        Đơn hàng của tôi
                    </Text>

                    <Text style={styles.arrow}>
                        ›
                    </Text>

                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.menuItem}>

                    <Text style={styles.icon}>
                        ⚙️
                    </Text>

                    <Text style={styles.menuText}>
                        Cài đặt
                    </Text>

                    <Text style={styles.arrow}>
                        ›
                    </Text>

                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.menuItem}>

                    <Text style={styles.icon}>
                        ℹ️
                    </Text>

                    <Text style={styles.menuText}>
                        Thông tin
                    </Text>

                    <Text style={styles.arrow}>
                        ›
                    </Text>

                </TouchableOpacity>

            </View>

            <TouchableOpacity style={styles.logoutButton}
                onPress={AuthViewModels.logout}>

                <Text style={styles.logoutText}>
                    Đăng xuất
                </Text>

            </TouchableOpacity>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#EDE0CF",
    },

    userContainer: {
        alignItems: "center",

        marginTop: 25,
        marginBottom: 30,
    },

    avatarContainer: {
        padding: 4,

        borderRadius: 60,

        backgroundColor: "#9C7055",
    },

    avatar: {
        width: 100,

        height: 100,

        borderRadius: 50,

        borderWidth: 3,

        borderColor: "#EDE0CF",
    },

    userName: {
        marginTop: 12,

        fontSize: 22,
        fontWeight: "bold",

        color: "#3B210A",
    },

    email: {
        marginTop: 5,

        fontSize: 14,

        color: "#6A4731",
    },

    menuContainer: {

        marginHorizontal: 15,
        backgroundColor: "#F5E9DA",

        borderRadius: 16,

        paddingHorizontal: 15,

        elevation: 10,
    },

    menuItem: {

        flexDirection: "row",

        alignItems: "center",

        paddingVertical: 17,
    },

    icon: {
        width: 40,

        fontSize: 21,
    },

    menuText: {

        flex: 1,

        fontSize: 16,

        fontWeight: "500",

        color: "#3B210A",
    },

    arrow: {

        fontSize: 27,

        color: "#9C7055",
    },

    divider: {

        height: 1,

        backgroundColor: "#D8C4B1",
    },

    logoutButton: {

        marginHorizontal: 15,

        marginTop: 30,

        padding: 15,

        borderRadius: 12,

        backgroundColor: "#3B210A",
    },

    logoutText: {

        textAlign: "center",

        color: "#EDE0CF",

        fontSize: 17,

        fontWeight: "bold",
    },

    centerContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#EDE0CF",
    },

    loadingText: {
        marginTop: 10,
        color: "#3B210A",
    },

    safeArea: {
        flex: 1,
        backgroundColor: "#EDE0CF",
    },
});