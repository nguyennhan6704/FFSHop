import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import AuthViewModels from "../viewmodels/AuthViewModels";

export default function AuthScreen() {
    const [isLogin, setIsLogin] = useState(true);
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
        //Khung tổng
        <View style={styles.container}>

            {/* Khung nổi */}
            <View style={styles.card}>

                {/* Logo */}
                <Image
                    source={require("../assets/img/dark_bg.jpg")}
                    style={styles.logo}
                />

                {/* Tên App */}
                <Text style={styles.appName}>Yurineko</Text>

                {/* Tab Login/Register */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity onPress={() => setIsLogin(true)}>
                        <Text style={[styles.tabText, isLogin && styles.activeTab]}>Đăng nhập</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setIsLogin(false)}>
                        <Text style={[styles.tabText, !isLogin && styles.activeTab]}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>

                {/* Email */}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none" />

                {/* Password */}
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    autoCapitalize="none"
                    value={password}
                    onChangeText={setPassword} />

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
                            onValueChange={setAgree} />

                        <Text style={{ marginLeft: 10 }}>
                            Tôi đã đọc và đồng ý Điều Khoản Dịch Vụ & Chính Sách Về Quyền Riêng Tư
                        </Text>
                    </View>
                }

                {/* Quên mật khẩu */}
                {
                    isLogin &&
                    <TouchableOpacity
                        onPress={handleResetPassword}>
                        <Text style={styles.forgotPassword}>
                            Quên mật khẩu?
                        </Text>
                    </TouchableOpacity>

                }

                {/* Button */}
                <TouchableOpacity
                    style={styles.button}
                    disabled={loading}
                    onPress={isLogin ? handleLogin : handleRegister}>
                    <Text style={styles.buttonText}>
                        {
                            loading ? "Đang xử lý" : isLogin ? "Đăng nhập" : "Đăng ký"
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0c0a9'
    },

    card: {
        width: "90%",
        backgroundColor: "#9c7055",
        borderRadius: 20,
        padding: 20,
        elevation: 10
    },

    logo: {
        width: "100%",
        height: 100,
        borderRadius: 10,
        alignSelf: "center",
    },

    appName: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20,
        color: "#ede0cf"
    },

    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom: 20,
        backgroundColor: "white",
        borderRadius: 90
    },

    tabText: {
        fontSize: 18,
        color: "gray",
    },

    activeTab: {
        color: "#2196F3",
        fontWeight: "bold",
        textDecorationLine: "underline",
    },

    input: {
        borderWidth: 1,
        borderColor: "#cccccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 15
    },

    genderContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15
    },

    genderButton: {
        borderWidth: 1,
        borderColor: "#2196F3",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 18
    },

    genderSelected: {
        backgroundColor: "#90CAF9"
    },

    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15
    },

    forgotPassword: {
        color: "#2196F3",
        textAlign: "right",
        marginBottom: 20
    },

    button: {
        backgroundColor: "#2196F3",
        padding: 15,
        borderRadius: 10
    },

    buttonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18
    }
})