import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";

import CartScreen from "../views/CartScreen";
import ProfileScreen from "../views/ProfileScreen";
import HomeStack from "./HomeStack";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarLabelStyle: { fontSize: 14 }
            }}
        >
            <Tab.Screen
                name="Trang chủ"
                component={HomeStack}
                options={{
                    tabBarIcon: () => <Text style={{ fontSize: 25 }}>🏠</Text>,
                }}
            />

            <Tab.Screen
                name="Tìm kiếm"
                component={HomeStack}
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