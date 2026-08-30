import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    TextInput,
    Alert
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import AuthViewModels from "../viewmodels/AuthViewModels"

import { useIsFocused } from "@react-navigation/native";
import OrderViewModels from "../viewmodels/OrderViewModels";
import CartViewModels from "../viewmodels/CartViewModels";

export default function CheckoutScreen({ route, navigation }) {

    const { cart } = route.params;

    const isFocused = useIsFocused();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);

    const [address, setAddress] = useState("");

    const [note, setNote] = useState("");

    const loadData = async () => {
        try {
            const data = await AuthViewModels.getCurrentUserData();

            setUser(data);
        }
        catch (error) {
            console.log("Lỗi", error);
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

    let totalPrice = 0;

    for (let item of cart) {

        let price;

        if (item.salePercent > 0) {
            price = item.price * (1 - item.salePercent / 100);
        }
        else {
            price = item.price;
        }

        totalPrice += price * item.quantity;
    }

    const SHIPPING_FEE = 15000;

    const total = totalPrice + SHIPPING_FEE;

    const validate = () => {
        if (user.phoneNo.trim() === "") {
            Alert.alert("Lỗi", "SĐT không thể trống. Vui lòng cập nhật ở thông tin cá nhân")
            return false;
        }
        if (address.trim() === "") {
            Alert.alert("Lỗi", "Vui lòng nhập địa chỉ nhận hàng")
            return false;
        }
        return true;
    }

    const handleOrder = async () => {
        if (!validate())
            return
        try {
            setLoading(true);
            await OrderViewModels.createOrder(user.uid, user.username, user.phoneNo, address, note, cart, totalPrice, SHIPPING_FEE, total);

            await CartViewModels.deleteAllCart(user.uid);

            Alert.alert("Đặt hàng thành công", "Đơn hàng của bạn đã được tạo",
                [{ text: "Về trang chủ", onPress: () => navigation.popToTop() }]);
        }
        catch (error) {
            console.log("Lỗi", error);
        }
        finally {
            setLoading(false);
        }
    }

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
                    Đặt hàng
                </Text>

                <View style={{ width: 30 }} />

            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >

                {/* Địa chỉ giao hàng */}
                <View style={styles.card}>

                    <Text style={styles.sectionTitle}>
                        Thông tin giao hàng
                    </Text>

                    <Text style={styles.userName}>
                        Tên: {user.gender === "Khác"
                            ? user.username
                            : (user.gender === "Nam" ? `Anh ${user.username}` : `Chị ${user.username}`)}
                    </Text>

                    <Text style={styles.infoText}>
                        SĐT: {user?.phoneNo}
                    </Text>

                    {isEditing ? (
                        <>
                            <TextInput
                                value={address}
                                onChangeText={setAddress}
                                style={styles.input}
                                placeholder="Nhập địa chỉ"
                            />

                            <TextInput
                                value={note}
                                onChangeText={setNote}
                                style={styles.input}
                                placeholder="Nhập ghi chú"
                            />
                        </>
                    ) : (
                        <>
                            <Text
                                style={styles.infoText}
                                numberOfLines={2}
                                ellipsizeMode="tail"
                            >
                                Địa chỉ: {address}
                            </Text>

                            <Text style={styles.infoText}>
                                Ghi chú: {note}
                            </Text>
                        </>
                    )}

                    <View style={styles.buttonRow}>

                        {isEditing ? (
                            <>
                                <TouchableOpacity
                                    onPress={() => {
                                        setIsEditing(false), setAddress(""), setNote("")
                                    }}
                                >
                                    <Text style={styles.changeText}>
                                        Hủy
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => setIsEditing(false)}
                                >
                                    <Text style={styles.changeText}>
                                        Xác nhận
                                    </Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <TouchableOpacity
                                onPress={() => setIsEditing(true)}
                            >
                                <Text style={styles.changeText}>
                                    Thay đổi
                                </Text>
                            </TouchableOpacity>
                        )}

                    </View>

                </View>


                {/* Sản phẩm */}
                <View style={styles.card}>

                    <Text style={styles.sectionTitle}>
                        Đơn hàng của bạn
                    </Text>

                    <FlatList
                        data={cart}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.list}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={false} />

                </View>


                {/* Phương thức thanh toán */}
                <View style={styles.card}>

                    <Text style={styles.sectionTitle}>
                        Phương thức thanh toán
                    </Text>

                    <TouchableOpacity style={styles.paymentItem}>

                        <View>

                            <Text style={styles.paymentTitle}>
                                Thanh toán khi nhận hàng
                            </Text>

                            <Text style={styles.paymentDescription}>
                                Thanh toán bằng tiền mặt (COD)
                            </Text>

                        </View>

                        <Text style={styles.radio}>
                            ●
                        </Text>

                    </TouchableOpacity>

                </View>


                {/* Tổng tiền */}
                <View style={styles.card}>

                    <View style={styles.priceRow}>

                        <Text style={styles.priceLabel}>
                            Tạm tính
                        </Text>

                        <Text style={styles.priceValue}>
                            {totalPrice.toLocaleString()}đ
                        </Text>

                    </View>


                    <View style={styles.priceRow}>

                        <Text style={styles.priceLabel}>
                            Phí vận chuyển
                        </Text>

                        <Text style={styles.priceValue}>
                            {SHIPPING_FEE.toLocaleString()}đ
                        </Text>

                    </View>


                    <View style={styles.divider} />


                    <View style={styles.priceRow}>

                        <Text style={styles.totalLabel}>
                            Tổng thanh toán
                        </Text>

                        <Text style={styles.totalValue}>
                            {total.toLocaleString()}đ
                        </Text>

                    </View>

                </View>

            </ScrollView>


            {/* Button đặt hàng */}
            <View style={styles.bottomContainer}>

                <View>

                    <Text style={styles.bottomText}>
                        Tổng thanh toán
                    </Text>

                    <Text style={styles.bottomPrice}>
                        {total.toLocaleString()}đ
                    </Text>

                </View>

                <TouchableOpacity
                    style={styles.orderButton}
                    onPress={() => {
                        if (isEditing) {
                            Alert.alert("Lỗi", "Vui lòng ấn xác nhận để có thể đặt hàng")
                        }
                        else {
                            handleOrder()
                        }
                    }}
                >

                    <Text style={styles.orderButtonText}>
                        Đặt hàng
                    </Text>

                </TouchableOpacity>

            </View>

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

    input: {
        borderWidth: 1,
        borderColor: "#D8C4B1",
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        color: "#3B210A",
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 5,
    },

    changeText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#9C7055",
        marginLeft: 20,
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

    quantity: {
        marginTop: 5,

        color: "#6A4731",
    },

    price: {
        marginTop: 5,

        fontSize: 15,
        fontWeight: "bold",
        color: "#9C7055",
    },

    paymentItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        paddingVertical: 5,
    },

    paymentTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#3B210A",
    },

    paymentDescription: {
        marginTop: 4,

        fontSize: 13,
        color: "#6A4731",
    },

    radio: {
        fontSize: 20,
        color: "#3B210A",
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

    bottomContainer: {
        flexDirection: "row",

        justifyContent: "space-between",
        alignItems: "center",

        padding: 15,

        backgroundColor: "#F5E9DA",

        elevation: 10,
    },

    bottomText: {
        fontSize: 13,
        color: "#6A4731",
    },

    bottomPrice: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#3B210A",

        marginTop: 3,
    },

    orderButton: {
        backgroundColor: "#3B210A",

        paddingHorizontal: 30,
        paddingVertical: 15,

        borderRadius: 12,
    },

    orderButtonText: {
        color: "#FFFFFF",

        fontSize: 16,
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
});