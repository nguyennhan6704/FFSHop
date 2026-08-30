import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";

import CartScreen from "../views/CartScreen";
import ProfileScreen from "../views/ProfileScreen";
import SearchScreen from "../views/SearchScreen";
import HomeScreen from "../views/HomeScreen";
import ProductDetailScreen from "../views/ProductDetailScreen";
import InformationScreen from "../views/InformationScreen"
import CheckoutScreen from "../views/CheckoutScreen";
import OrderScreen from "../views/OrderScreen";
import OrderDetailScreen from "../views/OrderDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarLabelStyle: { fontSize: 14 },
                tabBarStyle: {
                    backgroundColor: "#EDE0CF",
                },
                tabBarActiveTintColor: "#3B210A",
                tabBarInactiveTintColor: "#9C7055",
            }}
        >
            <Tab.Screen
                name="Trang chủ"
                component={HomeScreen}
                options={{
                    tabBarIcon: () => <Text style={{ fontSize: 25 }}>🏠</Text>,
                }}
            />

            <Tab.Screen
                name="Tìm kiếm"
                component={SearchScreen}
                options={{
                    tabBarIcon: () => <Text style={{ fontSize: 25 }}>🔍</Text>,
                }}
            />

            <Tab.Screen
                name="Giỏ hàng"
                component={CartScreen}
                options={{
                    tabBarIcon: () => <Text style={{ fontSize: 25 }}>🛒</Text>,
                }}
            />
            <Tab.Screen
                name="Cá nhân"
                component={ProfileScreen}
                options={{
                    tabBarIcon: () => <Text style={{ fontSize: 25 }}>👤</Text>,
                }}
            />
        </Tab.Navigator>
    );
}

export default function MainNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={MainTabs}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{
                    title: "Chi tiết sản phẩm"
                    ,
                    headerStyle: {
                        backgroundColor: "#EDE0CF",
                    },

                    // Màu chữ tiêu đề
                    headerTintColor: "#3B210A",

                    // Kiểu chữ tiêu đề
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
            />

            <Stack.Screen
                name="InformationScreen"
                component={InformationScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="CheckoutScreen"
                component={CheckoutScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="OrderScreen"
                component={OrderScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="OrderDetailScreen"
                component={OrderDetailScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}