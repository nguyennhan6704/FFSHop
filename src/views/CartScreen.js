import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CartViewModels from "../viewmodels/CartViewModels";
import { auth } from "../../firebaseConfig";
import { useIsFocused } from "@react-navigation/native";

export default function CartScreen() {

    const isFocused = useIsFocused();

    const [cart, setCart] = useState([]);

    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await CartViewModels.getCart(auth.currentUser.uid);
            setCart(data);
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
    }, [isFocused]);

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

    const renderItem = ({ item }) => {

        return (
            <View style={styles.productCard}>

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

                    {/* Quantity */}
                    <View style={styles.quantityContainer}>

                        <TouchableOpacity style={styles.quantityButton} onPress={async () => {
                            if (item.quantity > 1) {
                                await CartViewModels.decreaseQuantity(auth.currentUser.uid, item.id);
                                item.quantity -= 1;
                                setCart([...cart]);
                            }
                            else {
                                await CartViewModels.deleteFromCart(auth.currentUser.uid, item.id);
                                setCart(cart.filter(cartItem => cartItem.id !== item.id));
                            }
                        }}>
                            <Text style={styles.quantityButtonText}>
                                -
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.quantity}>
                            {item.quantity}
                        </Text>

                        <TouchableOpacity style={styles.quantityButton} onPress={async () => {
                            await CartViewModels.increaseQuantity(auth.currentUser.uid, item.id);
                            item.quantity += 1;
                            setCart([...cart])
                        }}>
                            <Text style={styles.quantityButtonText}>
                                +
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>

                {/* Xóa */}
                <TouchableOpacity style={styles.deleteButton} onPress={async () => {
                    await CartViewModels.deleteFromCart(auth.currentUser.uid, item.id);
                    setCart(cart.filter(cartItem => cartItem.id !== item.id));
                }}>
                    <Text style={styles.deleteText}>
                        X
                    </Text>
                </TouchableOpacity>

            </View>
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
                        Đang tải sản phẩm...
                    </Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>

            {/* Tiêu đề */}
            <Text style={styles.title}>
                Giỏ hàng
            </Text>

            {/* Danh sách */}
            <FlatList
                data={cart}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />

            {/* Tổng tiền */}
            <View style={styles.bottomContainer}>

                <View style={styles.totalContainer}>

                    <Text style={styles.totalText}>
                        Tổng tiền
                    </Text>

                    <Text style={styles.totalPrice}>
                        {totalPrice.toLocaleString()}đ
                    </Text>

                </View>

                <TouchableOpacity style={styles.checkoutButton}>

                    <Text style={styles.checkoutText}>
                        Thanh toán
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

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#3B210A",
        margin: 15,
    },

    list: {
        padding: 15,
        paddingTop: 0,
    },


    // =========================
    // PRODUCT
    // =========================

    productCard: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#9C7055",

        borderRadius: 15,

        padding: 10,

        marginBottom: 12,
    },

    productImage: {
        width: 80,
        height: 80,

        borderRadius: 10,
    },

    productInfo: {
        flex: 1,
        marginLeft: 12,
    },

    productName: {
        color: "#EDE0CF",
        fontSize: 17,
        fontWeight: "bold",
    },

    price: {
        color: "#E0C0A9",
        marginTop: 5,
        fontSize: 15,
    },


    // =========================
    // QUANTITY
    // =========================

    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },

    quantityButton: {
        width: 28,
        height: 28,

        backgroundColor: "#EDE0CF",

        borderRadius: 7,

        alignItems: "center",
        justifyContent: "center",
    },

    quantityButtonText: {
        color: "#3B210A",
        fontSize: 18,
        fontWeight: "bold",
    },

    quantity: {
        color: "#EDE0CF",
        fontSize: 16,
        fontWeight: "bold",

        marginHorizontal: 12,
    },


    // =========================
    // DELETE
    // =========================

    deleteButton: {
        width: 30,
        height: 30,

        alignItems: "center",
        justifyContent: "center",
    },

    deleteText: {
        color: "#EDE0CF",
        fontWeight: "bold",
        fontSize: 16,
    },


    // =========================
    // BOTTOM
    // =========================

    bottomContainer: {
        backgroundColor: "#9C7055",

        padding: 15,

        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },

    totalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",

        marginBottom: 12,
    },

    totalText: {
        color: "#EDE0CF",
        fontSize: 17,
    },

    totalPrice: {
        color: "#EDE0CF",
        fontSize: 19,
        fontWeight: "bold",
    },

    checkoutButton: {
        backgroundColor: "#3B210A",

        padding: 14,

        borderRadius: 10,
    },

    checkoutText: {
        color: "#EDE0CF",
        textAlign: "center",

        fontSize: 17,
        fontWeight: "bold",
    },

    //Loading
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