import React, { useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";


export default function OrderDetailScreen({ route, navigation }) {

    const { order } = route.params;

    const [loading, setLoading] = useState(true);

    const renderItem = ({ item }) => {

        return (
            <View style={styles.productItem}>

                {/* Ảnh */}
                <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                />

                {/* Thông tin */}
                <View style={styles.productInfo}>

                    <Text style={styles.productName}>
                        {item.name}
                    </Text>

                    <Text style={styles.price}>
                        {
                            item.salePercent > 0
                                ? (item.price * (1 - item.salePercent / 100)).toLocaleString()
                                : item.price.toLocaleString()
                        }đ
                    </Text>
                    <Text style={styles.quantity}>
                        Số lượng: {item.quantity}
                    </Text>
                </View>
            </View>
        );
    };

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
                    Chi tiết đơn hàng
                </Text>

                <View style={{ width: 30 }} />

            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >

                {/* Thông tin đơn hàng */}
                <View style={styles.card}>

                    <Text style={styles.sectionTitle}>
                        Thông tin đơn hàng
                    </Text>

                    <Text style={styles.infoText}>
                        Mã đơn: {order.id}
                    </Text>

                    <Text style={styles.infoText}>
                        Ngày đặt: {
                            order.createdAt.toDate().toLocaleString()
                        }
                    </Text>

                    <Text style={styles.infoText}>
                        Trạng thái: {order.status}
                    </Text>

                    <Text style={styles.infoText}>
                        Thanh toán: {order.paymentMethod}
                    </Text>

                </View>

                {/* Thông tin giao hàng */}
                <View style={styles.card}>

                    <Text style={styles.sectionTitle}>
                        Thông tin giao hàng
                    </Text>

                    <Text style={styles.userName}>
                        Tên: {order.userName}
                    </Text>

                    <Text style={styles.infoText}>
                        SĐT: {order.phoneNo}
                    </Text>

                    <Text style={styles.infoText}>
                        Địa chỉ: {order.address}
                    </Text>

                    <Text style={styles.infoText}>
                        Ghi chú: {order.note || "Không có"}
                    </Text>

                </View>

                {/* Sản phẩm */}
                <View style={styles.card}>

                    <Text style={styles.sectionTitle}>
                        Sản phẩm
                    </Text>

                    <FlatList
                        data={order.items}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        scrollEnabled={false} />
                </View>

                {/* Tổng tiền */}
                <View style={styles.card}>

                    <View style={styles.priceRow}>

                        <Text style={styles.priceLabel}>
                            Tạm tính
                        </Text>

                        <Text style={styles.priceValue}>
                            {order.totalPrice.toLocaleString()}đ
                        </Text>

                    </View>

                    <View style={styles.priceRow}>

                        <Text style={styles.priceLabel}>
                            Phí vận chuyển
                        </Text>

                        <Text style={styles.priceValue}>
                            {order.shippingFee.toLocaleString()}đ
                        </Text>

                    </View>

                    <View style={styles.divider} />

                    <View style={styles.priceRow}>

                        <Text style={styles.totalLabel}>
                            Tổng thanh toán
                        </Text>

                        <Text style={styles.totalValue}>
                            {order.total.toLocaleString()}đ
                        </Text>

                    </View>

                </View>

                <TouchableOpacity style={
                    order.status === "Đang xử lý"
                        ? styles.cancelButton
                        : styles.disabledButton}
                    disabled={order.status === "Đã hủy"}>

                    <Text style={styles.cancelText}>
                        {order.status === "Đang xử lý"
                            ? "Hủy đơn hàng"
                            : "Đơn hàng đã hủy"}
                    </Text>

                </TouchableOpacity>

            </ScrollView>

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

    card: {
        backgroundColor: "#F5E9DA",

        borderRadius: 15,

        padding: 16,

        marginBottom: 15,

        elevation: 3,
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#3B210A",

        marginBottom: 12,
    },

    userName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#3B210A",
    },

    infoText: {
        marginTop: 5,

        fontSize: 14,
        color: "#6A4731",
    },

    productItem: {
        flexDirection: "row",

        marginBottom: 15,
    },

    productImage: {
        width: 75,
        height: 75,

        borderRadius: 12,
    },

    productInfo: {
        flex: 1,

        marginLeft: 12,

        justifyContent: "center",
    },

    productName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#3B210A",
    },

    price: {
        marginTop: 5,

        fontSize: 15,
        fontWeight: "bold",
        color: "#9C7055",
    },

    quantity: {
        marginTop: 5,

        color: "#6A4731",
    },

    priceRow: {
        flexDirection: "row",

        justifyContent: "space-between",

        marginVertical: 7,
    },

    priceLabel: {
        fontSize: 15,
        color: "#6A4731",
    },

    priceValue: {
        fontSize: 15,
        color: "#3B210A",
    },

    divider: {
        height: 1,

        backgroundColor: "#D8C4B1",

        marginVertical: 8,
    },

    totalLabel: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#3B210A",
    },

    totalValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#9C7055",
    },

    cancelButton: {
        backgroundColor: "#D9534F",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
    },

    disabledButton: {
        backgroundColor: "#BDBDBD",
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
    },

    cancelText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});