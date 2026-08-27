import React, { useEffect, useState } from "react";

import { Text, Image, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dimensions } from "react-native";

import ProductViewModel from "../viewmodels/ProductViewModel";

import AuthViewModels from "../viewmodels/AuthViewModels";
import { Carousel } from "react-native-reanimated-carousel";
import { useIsFocused } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {

    const isFocused = useIsFocused();

    const [relatedProducts, setRelatedProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [newsProducts, setNewsProducts] = useState([]);

    const [userName, setUserName] = useState("Khách");
    const [avatar, setAvatar] = useState("");
    const [loading, setLoading] = useState(true);

    const loadHomeData = async () => {
        try {
            setLoading(true);

            const userData = await AuthViewModels.getCurrentUserData();
            if (userData && userData.username) {
                setUserName(userData.username);
            }

            const [news, popular] = await Promise.all([
                ProductViewModel.getNewProducts(),
                ProductViewModel.getPopularProducts()
            ]);

            setPopularProducts(popular);
            setNewsProducts(news);
            setRelatedProducts(news);
        }
        catch (error) {
            console.log("Load home data error: ", error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isFocused) {
            loadHomeData();
        }
    }, [isFocused]);

    const bannerItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.bannerContainer}
                onPress={() => { navigation.navigate("ProductDetail", { productId: item.id }) }}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.bannerImage}
                />
                <View style={styles.bannerOverlay}>
                    <Text style={styles.bannerTitle} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                    <Text style={styles.bannerPrice} numberOfLines={1} ellipsizeMode="tail">{item.finalPrice.toLocaleString()}đ</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* Start Header */}
                <View style={styles.header}>
                    {avatar && <Image style={styles.userAvatar}
                        source={{ uri: avatar }} />}
                    {!avatar && <Image style={styles.userAvatar}
                        source={{ uri: "https://th.bing.com/th/id/OIP.4E7iaWZGvMGSfu91X-zJUQHaHa?w=201&h=200&c=7&r=0&o=7&pid=1.7&rm=3" }} />}
                    <Text style={styles.greeting}>Xin chào, </Text>
                    <Text style={styles.name}>{userName}</Text>
                </View>
                <View style={styles.divider} />
                {/* End Header */}

                {/* Start ImageSlider */}

                <View style={styles.carouselContainer}>
                    <Carousel
                        data={newsProducts}
                        autoplay
                        autoplayInterval={5000}
                        loop
                        renderItem={bannerItem} />
                </View>

                {/* End ImageSlider */}

                {/* Start Rating */}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#EDE0CF",
        flex: 1,
        paddingHorizontal: 20
    },


    //start Header
    header: {
        fontSize: 16,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        padding: 10,
    },

    greeting: {
        fontSize: 18,
        color: "#6A4731",
    },

    name: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#3B210A",
    },

    userAvatar: {
        width: 40,
        height: 40,
        marginRight: 10,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#9C7055"
    },

    divider: {
        height: 1,
        backgroundColor: "#9C7055",
    },
    //end Header

    //start Image Slider
    carouselContainer: {
        height: 180,
        marginTop: 20
    },

    bannerContainer: {
        width: width - 40,
        height: 180,
        borderRadius: 20,
        overflow: "hidden",
    },

    bannerImage: {
        width: "100%",
        height: "100%"
    },

    bannerOverlay: {
        position: "absolute",
        left: 15,
        bottom: 15
    },

    bannerTitle: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "bold",
    },

    bannerPrice: {
        color: "#FFFFFF",
        fontSize: 16,
        marginTop: 5,
    },
    //end Image Slider
})