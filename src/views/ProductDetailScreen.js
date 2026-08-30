import React, { useEffect, useState } from "react";
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from "react-native";

import ProductViewModel from "../viewmodels/ProductViewModel";
import { SafeAreaView } from "react-native-safe-area-context";
import CartViewModels from "../viewmodels/CartViewModels";
import { auth } from "../../firebaseConfig";

export default function ProductDetailScreen({ route }) {

    const { productId } = route.params;

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const data = await ProductViewModel.getProductById(productId);
                setProduct(data);
            }
            catch (error) {
                console.log("Lỗi lấy sản phẩm:", error);
                Alert.alert(
                    "Lỗi",
                    "Không thể tải thông tin sản phẩm."
                );
            }
            finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleAddToCart = async () => {
        try {
            setLoading(true);
            await CartViewModels.addToCart(auth.currentUser.uid, product, quantity);

            Alert.alert("Thành công", "Đã thêm sản phẩm vào giỏ hàng thành công")
        }
        catch (error) {
            console.log(error);

            Alert.alert(
                "Lỗi",
                "Không thể thêm sản phẩm vào giỏ hàng."
            );
        }
        finally {
            setQuantity(1);
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
                        Đang tải sản phẩm...
                    </Text>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >

                {/* ================= IMAGE ================= */}
                <View style={styles.card}>

                    <Image
                        source={{ uri: product.image }}
                        style={styles.productImage}
                    />

                </View>


                {/* ================= PRODUCT INFO ================= */}
                <View style={styles.card}>

                    {/* Name + Rating */}
                    <View style={styles.headerContainer}>

                        <View style={styles.nameContainer}>

                            <Text style={styles.productName}>
                                {product.name}
                            </Text>

                            <Text style={styles.category}>
                                {product.category}
                            </Text>

                        </View>

                        <View style={styles.ratingContainer}>

                            <Text style={styles.rating}>
                                ⭐ {product.rating}
                            </Text>

                            <Text style={styles.reviews}>
                                {product.reviewsCount} đánh giá
                            </Text>

                        </View>

                    </View>


                    {/* Price */}
                    <View style={styles.priceContainer}>

                        {/* Giá hiện tại */}
                        <Text style={styles.price}>
                            {product.finalPrice.toLocaleString()
                            }đ
                        </Text>

                        {/* Phần trăm giảm giá */}
                        {product.salePercent > 0 && (
                            <Text style={styles.salePercent}>
                                -{product.salePercent}%
                            </Text>
                        )}

                        {/* Nếu có giảm giá thì hiển thị giá gốc */}
                        {product.salePercent > 0 && (
                            <Text style={styles.oldPrice}>
                                {product.price.toLocaleString()}đ
                            </Text>
                        )}

                    </View>


                    {/* Description */}
                    <View style={styles.descriptionContainer}>

                        <Text style={styles.sectionTitle}>
                            Mô tả
                        </Text>

                        <Text style={styles.description}>
                            {product.description}
                        </Text>

                    </View>


                    {/* Quantity */}
                    <View style={styles.quantityContainer}>

                        <Text style={styles.sectionTitle}>
                            Số lượng
                        </Text>

                        <View style={styles.quantityControl}>

                            <TouchableOpacity
                                style={styles.quantityButton} onPress={() => {
                                    if (quantity > 1) {
                                        setQuantity(quantity - 1);
                                    }
                                }}>
                                <Text style={styles.quantityButtonText}>
                                    -
                                </Text>
                            </TouchableOpacity>

                            <View style={styles.quantityNumberContainer}>
                                <Text style={styles.quantityNumber}>
                                    {quantity}
                                </Text>
                            </View>

                            <TouchableOpacity
                                style={styles.quantityButton} onPress={() => {
                                    setQuantity(quantity + 1);
                                }}>
                                <Text style={styles.quantityButtonText}>
                                    +
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>


                    {/* Add Cart */}
                    <TouchableOpacity style={styles.button} onPress={handleAddToCart}>

                        <Text style={styles.buttonText}>
                            Thêm vào giỏ hàng
                        </Text>

                    </TouchableOpacity>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    // Nền
    safeArea: {
        flex: 1,
        backgroundColor: "#EDE0CF",
    },

    container: {
        padding: 15,
    },

    // Card
    card: {
        backgroundColor: "#9C7055",
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },

    // Ảnh
    productImage: {
        width: "100%",
        height: 300,
        borderRadius: 12,
    },

    // Tên + rating
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    nameContainer: {
        flex: 1,
    },

    productName: {
        color: "#EDE0CF",
        fontSize: 22,
        fontWeight: "bold",
    },

    category: {
        color: "#E0C0A9",
        marginTop: 5,
    },

    // Rating
    ratingContainer: {
        alignItems: "flex-end",
    },

    rating: {
        color: "#EDE0CF",
        fontWeight: "bold",
    },

    reviews: {
        color: "#E0C0A9",
        fontSize: 12,
        marginTop: 3,
    },

    // Giá
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 15,
    },

    oldPrice: {
        color: "#E0C0A9",
        fontSize: 15,
        textDecorationLine: "line-through",
    },

    price: {
        color: "#EDE0CF",
        fontSize: 20,
        fontWeight: "bold",
    },

    salePercent: {
        color: "#EDE0CF",
        fontSize: 14,
        paddingHorizontal: 8,
        fontWeight: "bold",
    },

    // Mô tả
    descriptionContainer: {
        marginTop: 15,
    },

    sectionTitle: {
        color: "#EDE0CF",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },

    description: {
        color: "#E0C0A9",
        fontSize: 14,
        lineHeight: 20,
    },

    // Quantity
    quantityContainer: {
        marginTop: 15,
    },

    quantityControl: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 5,
    },

    quantityButton: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#EDE0CF",
        borderWidth: 1,
        borderColor: "#6A4731",
        alignItems: "center",
        justifyContent: "center",
    },

    quantityButtonText: {
        color: "#3B210A",
        fontSize: 22,
        fontWeight: "bold",
    },

    quantityNumberContainer: {
        width: 50,
        alignItems: "center",
    },

    quantityNumber: {
        color: "#EDE0CF",
        fontSize: 18,
        fontWeight: "bold",
    },

    // Button
    button: {
        backgroundColor: "#3B210A",
        padding: 14,
        borderRadius: 10,
        marginTop: 20,
    },

    buttonText: {
        color: "#EDE0CF",
        textAlign: "center",
        fontSize: 17,
        fontWeight: "bold",
    },

    // Loading
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

    emptyText: {
        color: "#3B210A",
        fontSize: 18,
        fontWeight: "bold",
    },

});