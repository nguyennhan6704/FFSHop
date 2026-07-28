import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet, SafeAreaView, ScrollView, Platform } from "react-native";
import Checkbox from "expo-checkbox";
import AuthViewModels from "../viewmodels/AuthViewModels";

export default function AuthScreen() {
    const [isLogin, setIsLogin] = useState(true);
    const [isForgot, setIsForgot] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [gender, setGender] = useState("");
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = () => {
        if (email.trim() === "") {
            Alert.alert("Lỗi", "Vui lòng nhập email.");
            return false;
        }
        if (password.trim() === "") {
            Alert.alert("Lỗi", "Vui lòng nhập mật khẩu.");
            return false;
        }

        if (!isLogin) {
            if (rePassword.trim() === "") {
                Alert.alert("Lỗi", "Vui lòng nhập lại mật khẩu.");
                return false;
            }
            if (password !== rePassword) {
                Alert.alert("Lỗi", "Mật khẩu không khớp.");
                return false;
            }
            if (gender === "") {
                Alert.alert("Lỗi", "Vui lòng chọn giới tính.");
                return false;
            }
            if (!agree) {
                Alert.alert("Lỗi", "Bạn phải đồng ý điều khoản.");
                return false;
            }
        }
        return true;
    };

    const handleLogin = async () => {
        if (!validate())
            return;
        try {
            setLoading(true);
            await AuthViewModels.login(email, password);
            Alert.alert("Thành công", "Đăng nhập thành công");
            setEmail("");
            setPassword("");
        }
        catch (error) {
            Alert.alert(
                "Lỗi",
                error.message
            );
        }
        finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        if (!validate())
            return;
        try {
            setLoading(true);
            await AuthViewModels.register({
                email, password, avatar: "", username: email.split("@")[0],
                address: "", phoneNo: "", createdAt: new Date(), gender
            });
            Alert.alert(
                "Thành công",
                "Đăng ký thành công.\nVui lòng kiểm tra email để xác thực."
            );
            setEmail("");
            setPassword("");
            setRePassword("");
            setIsLogin(true);
        }
        catch (error) {
            Alert.alert(
                "Lỗi",
                error.message
            );
        }
        finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (email.trim() === "") {
            Alert.alert("Thông báo", "Vui lòng nhập email.");
            return;
        }
        try {
            await AuthViewModels.resetPassword(email);
            Alert.alert(
                "Thành công",
                "Đã gửi email đặt lại mật khẩu."
            );
        }
        catch (error) {
            Alert.alert(
                "Lỗi",
                error.message
            );
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                {/* Khung nổi */}
                <View style={styles.card}>

                    {/* Logo */}
                    <Image
                        source={require("../../assets/img/logo.png")}
                        style={styles.logo}
                    />

                    {
                        isForgot &&
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => { setIsForgot(false); setEmail(""); }}>
                            <Text style={styles.textBack}>← Quay lại</Text>
                        </TouchableOpacity>
                    }

                    {/* Tab Login/Register */}
                    {
                        !isForgot &&
                        <View style={styles.tabContainer}>
                            <TouchableOpacity style={[styles.tabButton, isLogin && styles.activeTabLogin]} onPress={() => setIsLogin(true)}>
                                <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Đăng nhập</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.tabButton, !isLogin && styles.activeTabRegister]} onPress={() => setIsLogin(false)}>
                                <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Đăng ký</Text>
                            </TouchableOpacity>
                        </View>
                    }

                    {/* Email */}
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none" />

                    {/* Password */}
                    {
                        !isForgot &&
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            autoCapitalize="none"
                            value={password}
                            onChangeText={setPassword} />
                    }

                    {/* Re Password */}
                    {
                        !isLogin &&
                        <TextInput
                            style={styles.input}
                            placeholder="Re-Password"
                            secureTextEntry
                            autoCapitalize="none"
                            value={rePassword}
                            onChangeText={setRePassword} />
                    }

                    {/* Gender */}
                    {
                        !isLogin &&
                        <View style={styles.genderContainer}>
                            <TouchableOpacity style={[styles.genderButton, gender === "Nam" && styles.genderSelected]}
                                onPress={() => setGender("Nam")}>
                                <Text>
                                    Nam
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.genderButton, gender === "Nữ" && styles.genderSelected]}
                                onPress={() => setGender("Nữ")}>
                                <Text>
                                    Nữ
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.genderButton, gender === "Khác" && styles.genderSelected]}
                                onPress={() => setGender("Khác")}>
                                <Text>
                                    Khác
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }

                    {/* Checkbox */}
                    {
                        !isLogin &&
                        <View style={styles.checkboxContainer}>
                            <Checkbox value={agree}
                                onValueChange={setAgree}
                                color="#3B210A"
                                style={styles.checkbox} />

                            <Text
                                style={{
                                    marginLeft: 10,
                                    color: "#EDE0CF"
                                }}
                            >
                                Tôi đã đọc và đồng ý Điều Khoản Dịch Vụ & Chính Sách Về Quyền Riêng Tư
                            </Text>
                        </View>
                    }

                    {/* Quên mật khẩu */}
                    {
                        isLogin && !isForgot &&
                        <TouchableOpacity
                            onPress={() => [setIsForgot(true)]}>
                            <Text style={styles.forgotPassword}>
                                Quên mật khẩu?
                            </Text>
                        </TouchableOpacity>

                    }

                    {/* Button */}
                    <TouchableOpacity
                        style={styles.button}
                        disabled={loading}
                        onPress={isForgot ? handleResetPassword : isLogin ? handleLogin : handleRegister}>
                        <Text style={styles.buttonText}>
                            {
                                loading ? "Đang xử lý" : isForgot ? "Gửi email khôi phục" : isLogin ? "Đăng nhập" : "Đăng ký"
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EDE0CF",
        paddingVertical: 30,
    },

    card: {
        width: "90%",
        backgroundColor: "#9C7055",
        borderRadius: 20,
        padding: 20,
        elevation: 8,
        shadowColor: "#3B210A",
    },

    logo: {
        width: "100%",
        height: 140,
        borderRadius: 18,
        marginBottom: 10,
    },

    //nuts back

    backButton: {
        alignSelf: "flex-start",
        padding: 10
    },

    textBack: {
        color: "#EDE0CF",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },

    //

    tabContainer: {
        flexDirection: "row",
        marginBottom: 20,
        backgroundColor: "#E0C0A9",
        borderRadius: 30,
        marginTop: 10,
        overflow: "hidden"
    },

    tabButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16,
    },

    activeTabLogin: {
        backgroundColor: "#3B210A",
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30
    },

    activeTabRegister: {
        backgroundColor: "#3B210A",
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30
    },

    tabText: {
        fontSize: 16,
        fontWeight: 600,
        color: "#6A4731",
        textAlign: "center"
    },

    activeTabText: {
        color: "#EDE0CF",
    },

    input: {
        backgroundColor: "#EDE0CF",
        borderWidth: 2,
        borderColor: "#6A4731",
        borderRadius: 12,
        paddingHorizontal: 18,
        paddingVertical: 16,
        marginBottom: 15,
        color: "#3B210A",
    },

    genderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15
    },

    genderButton: {
        borderWidth: 2,
        borderColor: "#6A4731",
        borderRadius: 14,
        paddingVertical: 10,
        paddingHorizontal: 18,
        backgroundColor: "#EDE0CF",
    },

    genderSelected: {
        backgroundColor: "#E0C0A9",
    },

    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15
    },

    checkbox: {
        borderColor: "#3B210A",
        borderWidth: 2,
        borderRadius: 100,
    },

    forgotPassword: {
        color: "#EDE0CF",
        textAlign: "right",
        marginBottom: 10,
        fontSize: 14
    },

    button: {
        marginTop: 10,
        backgroundColor: "#3B210A",
        padding: 15,
        borderRadius: 14,
    },

    buttonText: {
        color: "#EDE0CF",
        fontWeight: 600,
        textAlign: "center",
        fontSize: 18,
    },
})