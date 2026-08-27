import React, { useEffect, useState } from "react";

import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useIsFocused } from "@react-navigation/native";
import ProductViewModel from "../viewmodels/ProductViewModel";

export default function SearchScreen({ navigation }) {

    const isFocused = useIsFocused();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            setLoading(true);
            const data = await ProductViewModel.getAllProducts();
            setProducts(data);
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

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.productCard}
                onPress={() => {
                    navigation.navigate("ProductDetail", { productId: item.id });
                }}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                />
                <View style={styles.productInfo}>

                    <Text style={styles.productName}>
                        {item.name}
                    </Text>
                    <Text style={styles.productPrice}>
                        {item.salePercent > 0
                            ? (item.price * (1 - item.salePercent / 100)).toLocaleString()
                            : item.price.toLocaleString()}đ
                    </Text>
                </View>
            </TouchableOpacity>
        )
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
            <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>
                    🔍
                </Text>
                <TextInput placeholder="Tìm món bạn muốn"
                    placeholderTextColor="#9C7055"
                    style={styles.searchInput}
                    onChangeText={async (value) => {
                        const data = await ProductViewModel.searchProducts(value);
                        setProducts(data);
                    }} />
            </View>
            <Text style={styles.resultTitle}>
                Kết quả tìm kiếm
            </Text>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    //Safe Area
    safeArea: {
        flex: 1,
        backgroundColor: "#EDE0CF",
        marginTop: 20
    },

    //Khung search
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#FFFFFF",

        marginHorizontal: 15,
        paddingHorizontal: 12,

        height: 50,

        borderRadius: 12,
    },
    searchIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#3B210A",
    },

    //Text Ket qua
    resultTitle: {
        fontSize: 18,
        fontWeight: "bold",

        color: "#3B210A",

        marginTop: 20,
        marginLeft: 15,
    },

    //Danh sach ket qua
    list: {
        padding: 15,
    },

    //Render Item
    productCard: {

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#9C7055",

        padding: 10,

        borderRadius: 12,

        marginBottom: 12,
    },
    productImage: {

        width: 70,
        height: 70,

        borderRadius: 10,
    },
    productInfo: {

        marginLeft: 12,

        flex: 1,
    },
    productName: {

        color: "#EDE0CF",

        fontSize: 17,

        fontWeight: "bold",
    },
    productPrice: {

        color: "#FFFFFF",

        marginTop: 6,

        fontSize: 15,
    },

    //loading
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
})