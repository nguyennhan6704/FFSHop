import React from "react";
import { useState, useEffect } from "react";

import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    ActivityIndicator
} from "react-native";

import ProductViewModel from "../viewmodels/ProductViewModel";


export default function HomeScreen() {

    // =====================================================
    // STATE
    // =====================================================

    // Lưu danh sách Product lấy từ Firebase
    const [products, setProducts] = useState([]);

    // Kiểm tra trạng thái loading
    const [loading, setLoading] = useState(true);


    // =====================================================
    // LOAD PRODUCTS
    // =====================================================

    const loadProducts = async () => {

        try {

            setLoading(true);

            const result =
                await ProductViewModel.getNewProducts();

            setProducts(result);

        }
        catch (error) {

            console.log(
                "Load products error:",
                error
            );

        }
        finally {

            setLoading(false);
        }
    };


    // =====================================================
    // USE EFFECT
    // =====================================================

    useEffect(() => {

        // Khi HomeScreen được mở lần đầu
        // thì gọi loadProducts()
        loadProducts();

    }, []);


    // =====================================================
    // PRODUCT ITEM
    // =====================================================

    const productItem = ({ item }) => {

        return (

            <View style={styles.productCard}>

                <Image
                    source={{
                        uri: item.image
                    }}
                    style={styles.productImage}
                />

                <Text style={styles.productName}>
                    {item.name}
                </Text>

                <Text style={styles.productCategory}>
                    {item.category}
                </Text>

                <Text style={styles.productPrice}>
                    {item.finalPrice.toLocaleString()}đ
                </Text>

                {item.salePercent > 0 && (

                    <Text style={styles.saleText}>
                        Giảm {item.salePercent}%
                    </Text>

                )}

                <Text style={styles.rating}>
                    ⭐ {item.rating}
                    {" - "}
                    ({item.reviewsCount})
                </Text>

            </View>
        );
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <View style={styles.loadingContainer}>

                <ActivityIndicator
                    size="large"
                />

                <Text style={styles.loadingText}>
                    Đang tải sản phẩm...
                </Text>

            </View>
        );
    }


    // =====================================================
    // HOME UI
    // =====================================================

    return (

        <View style={styles.container}>

            {/* ================= HEADER ================= */}

            <View style={styles.header}>

                <View>

                    <Text style={styles.greeting}>
                        Chào mừng bạn 👋
                    </Text>

                    <Text style={styles.title}>
                        Coffe Oceaneko
                    </Text>

                </View>


                {/* Notification */}

                <View style={styles.notificationButton}>

                    <Text style={styles.notificationIcon}>
                        🔔
                    </Text>

                </View>

            </View>


            {/* ================= SUBTITLE ================= */}

            <Text style={styles.subtitle}>
                Khám phá những món cà phê yêu thích
            </Text>


            {/* ================= BANNER ================= */}

            <View style={styles.banner}>

                <View style={styles.bannerContent}>

                    <Text style={styles.bannerTitle}>
                        Coffee Time ☕
                    </Text>

                    <Text style={styles.bannerSubtitle}>
                        Thưởng thức ly cà phê tuyệt vời
                    </Text>

                    <View style={styles.bannerButton}>

                        <Text style={styles.bannerButtonText}>
                            Khám phá ngay
                        </Text>

                    </View>

                </View>

            </View>


            {/* ================= PRODUCT SECTION ================= */}

            <View style={styles.sectionHeader}>

                <Text style={styles.sectionTitle}>
                    Sản phẩm mới
                </Text>

                <Text style={styles.seeAll}>
                    Xem tất cả
                </Text>

            </View>


            {/* ================= PRODUCT LIST ================= */}

            <FlatList
                data={products}

                renderItem={productItem}

                keyExtractor={(item) => item.id}

                ListEmptyComponent={

                    <Text style={styles.emptyText}>
                        Chưa có sản phẩm nào
                    </Text>

                }

                contentContainerStyle={
                    styles.listContainer
                }

                showsVerticalScrollIndicator={false}
            />

        </View>
    );
}


// =====================================================
// STYLE
// =====================================================
//
// QUAN TRỌNG:
// styles nằm NGOÀI HomeScreen()
// =====================================================

const styles = StyleSheet.create({

    // =====================================================
    // CONTAINER
    // =====================================================

    container: {
        flex: 1,
        backgroundColor: "#EDE0CF",
        paddingTop: 20
    },


    // =====================================================
    // HEADER
    // =====================================================

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        paddingHorizontal: 20,
    },

    greeting: {
        fontSize: 14,
        color: "#6A4731",
        marginBottom: 3,
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#3B210A",
    },


    // =====================================================
    // NOTIFICATION
    // =====================================================

    notificationButton: {
        width: 45,
        height: 45,

        borderRadius: 23,

        backgroundColor: "#9C7055",

        justifyContent: "center",
        alignItems: "center",

        elevation: 4,
    },

    notificationIcon: {
        fontSize: 20,
    },


    // =====================================================
    // SUBTITLE
    // =====================================================

    subtitle: {
        marginHorizontal: 20,
        marginTop: 6,

        fontSize: 14,

        color: "#6A4731",
    },


    // =====================================================
    // BANNER
    // =====================================================

    banner: {
        marginHorizontal: 20,
        marginTop: 20,

        height: 165,

        borderRadius: 20,

        backgroundColor: "#9C7055",

        overflow: "hidden",

        elevation: 5,
    },

    bannerContent: {
        flex: 1,

        padding: 20,

        justifyContent: "center",
    },

    bannerTitle: {
        fontSize: 25,

        fontWeight: "bold",

        color: "#EDE0CF",
    },

    bannerSubtitle: {
        marginTop: 6,

        fontSize: 14,

        color: "#E0C0A9",

        maxWidth: "70%",
    },

    bannerButton: {
        marginTop: 15,

        alignSelf: "flex-start",

        paddingHorizontal: 15,
        paddingVertical: 8,

        borderRadius: 20,

        backgroundColor: "#EDE0CF",
    },

    bannerButtonText: {
        fontSize: 12,

        fontWeight: "bold",

        color: "#3B210A",
    },


    // =====================================================
    // SECTION HEADER
    // =====================================================

    sectionHeader: {
        flexDirection: "row",

        justifyContent: "space-between",

        alignItems: "center",

        marginHorizontal: 20,

        marginTop: 25,

        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 20,

        fontWeight: "bold",

        color: "#3B210A",
    },

    seeAll: {
        fontSize: 13,

        fontWeight: "600",

        color: "#6A4731",
    },


    // =====================================================
    // PRODUCT LIST
    // =====================================================

    listContainer: {
        paddingHorizontal: 20,

        paddingBottom: 30,
    },


    // =====================================================
    // PRODUCT CARD
    // =====================================================

    productCard: {
        marginBottom: 18,

        padding: 12,

        borderRadius: 18,

        backgroundColor: "#9C7055",

        elevation: 5,
    },


    // =====================================================
    // PRODUCT IMAGE
    // =====================================================

    productImage: {
        width: "100%",

        height: 190,

        borderRadius: 14,

        backgroundColor: "#E0C0A9",
    },


    // =====================================================
    // PRODUCT NAME
    // =====================================================

    productName: {
        marginTop: 11,

        fontSize: 18,

        fontWeight: "bold",

        color: "#EDE0CF",
    },


    // =====================================================
    // PRODUCT CATEGORY
    // =====================================================

    productCategory: {
        marginTop: 4,

        fontSize: 13,

        color: "#E0C0A9",
    },


    // =====================================================
    // PRICE
    // =====================================================

    productPrice: {
        marginTop: 8,

        fontSize: 17,

        fontWeight: "bold",

        color: "#EDE0CF",
    },


    // =====================================================
    // SALE
    // =====================================================

    saleText: {
        marginTop: 4,

        fontSize: 13,

        fontWeight: "bold",

        color: "#E0C0A9",
    },


    // =====================================================
    // RATING
    // =====================================================

    rating: {
        marginTop: 5,

        fontSize: 13,

        color: "#EDE0CF",
    },


    // =====================================================
    // LOADING
    // =====================================================

    loadingContainer: {
        flex: 1,

        justifyContent: "center",

        alignItems: "center",

        backgroundColor: "#EDE0CF",
    },

    loadingText: {
        marginTop: 10,

        fontSize: 15,

        color: "#3B210A",
    },


    // =====================================================
    // EMPTY
    // =====================================================

    emptyText: {
        marginTop: 30,

        textAlign: "center",

        fontSize: 15,

        color: "#6A4731",
    },

});