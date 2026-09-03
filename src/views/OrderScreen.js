import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import AuthViewModels from "../viewmodels/AuthViewModels";
import OrderViewModels from "../viewmodels/OrderViewModels";
import { useIsFocused } from "@react-navigation/native";


export default function OrderScreen({ navigation }) {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const isFocused = useIsFocused();

    const loadData = async () => {
        try {
            setLoading(true);

            const user = await AuthViewModels.getCurrentUserData();

            const data = await OrderViewModels.getOrders(user.uid);

            setOrders(data);
        }
        catch (error) {
            console.log("LỖI:", error);
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

    const renderItem = ({ item }) => {

        return (
            <TouchableOpacity
                style={styles.orderItem}
                onPress={() => {
                    navigation.navigate("OrderDetailScreen", { order: item });
                }}>

                <View style={styles.topRow}>

                    <Text style={styles.orderId}>
                        Mã đơn: {item.id}
                    </Text>

                    <Text style={styles.status}>
                        {item.status}
                    </Text>

                </View>

                <Text style={styles.date}>
                    {item.createdAt?.toDate().toLocaleString()}
                </Text>

                <View style={styles.divider} />

                <View style={styles.row}>

                    <Text style={styles.infoText}>
                        {item.items.length} sản phẩm
                    </Text>

                    <Text style={styles.total}>
                        {item.total.toLocaleString()}đ
                    </Text>

                </View>

                <Text style={styles.payment}>
                    Thanh toán: {item.paymentMethod}
                </Text>

            </TouchableOpacity>
        );
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.centerContainer}>
                    <ActivityIndicator
                        size="large"
                        color="#3B210A" />
                    <Text style={styles.loadingText}>
                        Đang lấy thông tin...
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>

            {/* Header */}
            <View style={styles.header}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backText}>
                        ←
                    </Text>
                </TouchableOpacity>

                <Text style={styles.headerTitle}>
                    Đơn hàng của tôi
                </Text>

                <View style={{ width: 30 }} />

            </View>

            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: "#EDE0CF",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        paddingHorizontal: 20,
        paddingVertical: 5,

        backgroundColor: "#F5E9DA",
    },

    backText: {
        fontSize: 28,
        color: "#3B210A",
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#3B210A",
    },

    container: {
        padding: 15,
    },

    orderItem: {
        backgroundColor: "#F5E9DA",
        borderRadius: 15,
        padding: 16,
        marginBottom: 15,
        elevation: 3,
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    orderId: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#3B210A",
    },

    status: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#9C7055",
    },

    date: {
        marginTop: 8,
        fontSize: 13,
        color: "#6A4731",
    },

    divider: {
        height: 1,
        backgroundColor: "#D8C4B1",
        marginVertical: 12,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    infoText: {
        fontSize: 14,
        color: "#6A4731",
    },

    total: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#9C7055",
    },

    payment: {
        marginTop: 8,
        fontSize: 13,
        color: "#6A4731",
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
});