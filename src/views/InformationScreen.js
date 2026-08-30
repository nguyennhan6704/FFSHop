import React, { useState, useEffect } from "react";

import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    Alert
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker"
import AuthViewModels from "../viewmodels/AuthViewModels";

export default function InformationScreen({ route, navigation }) {

    const { userId } = route.params;

    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);

    const [user, setUser] = useState(null);

    const [gender, setGender] = useState("");

    const [userName, setUserName] = useState("");

    const [phoneNo, setPhoneNo] = useState("");

    const [address, setAddress] = useState("");

    const [avatar, setAvatar] = useState("");

    const [isChangedAvatar, setIsChangedAvatar] = useState(false);

    const loadData = async () => {
        try {
            setLoading(true);

            const data = await AuthViewModels.getCurrentUserData();

            setUser(data);
            setGender(data.gender);
            setUserName(data.username);
            setPhoneNo(data.phoneNo ? data.phoneNo : "");
            setAddress(data.address ? data.address : "");
            setAvatar(data.avatar ? data.avatar : "https://th.bing.com/th/id/OIP.4E7iaWZGvMGSfu91X-zJUQHaHa?w=201&h=200&c=7&r=0&o=7&pid=1.7&rm=3")
        }
        catch (error) {
        }
        finally {
            setLoading(false);
        }
    }

    const validate = () => {
        if (userName === "") {
            Alert.alert("Lỗi", "Username không được trống.");
            return false;
        }
        if (phoneNo.length !== 10) {
            Alert.alert("Lỗi", "Số điện thoại phải đủ 10 số.");
            return false;
        }
        if (!/^0\d{9}$/.test(phoneNo)) {
            Alert.alert("Lỗi", "Số điện thoại không hợp lệ.");
            return false;
        }
        return true;
    }

    const pickImage = async () => {
        try {
            //Yêu cầu quyền tru cập thư viện
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
                alert("Bạn cần cấp quyền cho ứng dụng truy cập thư viện");
                return;
            }

            //Mở thư viện, chỉ lấy hình ảnh, cho phép chỉnh sửa, tỷ lệ 1:1, chất lượng 100%
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: "images",
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1
            })

            if (result.canceled) {
                return;
            }

            //Gắn URI của ảnh vào biến
            const imageUri = result.assets[0].uri;

            setAvatar(imageUri);

            setIsChangedAvatar(true);
        }
        catch (error) {

        }
    }

    const resetValue = () => {
        setGender(user.gender);
        setUserName(user.username);
        setPhoneNo(user.phoneNo ? user.phoneNo : "");
        setAddress(user.address ? user.address : "");
        setAvatar(user.avatar ? user.avatar : "https://th.bing.com/th/id/OIP.4E7iaWZGvMGSfu91X-zJUQHaHa?w=201&h=200&c=7&r=0&o=7&pid=1.7&rm=3")
        setIsChangedAvatar(false);
    }

    const updateInformation = async () => {
        setLoading(true);

        await AuthViewModels.updateUserInformation(userId, userName, phoneNo, address, gender, avatar, isChangedAvatar);

        await loadData();

        setIsEditing(false);

        setIsChangedAvatar(false);

        alert("Cập nhật thành công");
    }

    const handleUpdate = () => {
        if (!validate()) {
            return;
        }
        updateInformation();
    }

    useEffect(() => {
        loadData();
    }, [])

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.centerContainer}>

                    <ActivityIndicator
                        size="large"
                        color="#3B210A"
                    />

                    <Text style={styles.loadingText}>
                        {isEditing ? "Đang cập nhật thông tin..." : "Đang tải thông tin..."}
                    </Text>

                </View>
            </SafeAreaView>
        )
    }

    if (isEditing) {
        return (
            <SafeAreaView style={styles.safeArea}>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}
                >
                    {/* Avatar */}

                    <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
                        <Image
                            source={{
                                uri: avatar
                            }}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>

                    {/* ID */}
                    <Text style={styles.userId}>
                        ID: {userId}
                    </Text>

                    {/* Card thông tin */}
                    <View style={styles.infoCard}>

                        {/* Email */}
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>
                                Email
                            </Text>
                            <Text style={styles.value}>
                                {user.email}
                            </Text>
                        </View>

                        <View style={styles.divider} />

                        {/* Username */}
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>
                                Username
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập username"
                                placeholderTextColor="#9C7055"
                                value={userName}
                                onChangeText={setUserName}

                            />

                        </View>

                        <View style={styles.divider} />

                        {/* Số điện thoại */}
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>
                                Số điện thoại
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập số điện thoại"
                                placeholderTextColor="#9C7055"
                                keyboardType="phone-pad"
                                value={phoneNo}
                                onChangeText={setPhoneNo}
                            />
                        </View>

                        <View style={styles.divider} />

                        {/* Địa chỉ */}
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>
                                Địa chỉ
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập địa chỉ"
                                placeholderTextColor="#9C7055"
                                value={address}
                                onChangeText={setAddress}
                            />
                        </View>

                        <View style={styles.divider} />

                        {/* Gender */}
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>
                                Giới tính
                            </Text>
                            <View style={styles.genderContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.genderButton,
                                        gender === "Nam" && styles.genderSelected
                                    ]}
                                    onPress={() => setGender("Nam")}
                                >
                                    <Text style={styles.genderText}>
                                        Nam
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.genderButton,
                                        gender === "Nữ" && styles.genderSelected
                                    ]}
                                    onPress={() => setGender("Nữ")}
                                >
                                    <Text style={styles.genderText}>
                                        Nữ
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.genderButton,
                                        gender === "Khác" && styles.genderSelected
                                    ]}
                                    onPress={() => setGender("Khác")}
                                >
                                    <Text style={styles.genderText}>
                                        Khác
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        {/* Ngày tạo */}
                        <View style={styles.infoItem}>
                            <Text style={styles.label}>
                                Ngày tạo tài khoản
                            </Text>
                            <Text style={styles.value}>
                                {user.createdAt.toDate().toLocaleString()}
                            </Text>
                        </View>

                    </View>

                    {/* Button */}
                    <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => {
                                setIsEditing(false);
                                resetValue();
                            }}
                        >
                            <Text style={styles.backButtonText}>
                                Quay lại
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => {
                                handleUpdate();
                            }}
                        >
                            <Text style={styles.saveButtonText}>
                                Lưu thay đổi
                            </Text>

                        </TouchableOpacity>

                    </View>

                </ScrollView>

            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.safeArea}>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {/* Avatar */}

                <View style={styles.avatarContainer}>

                    <Image
                        source={{
                            uri: avatar
                        }}
                        style={styles.avatar}
                    />

                </View>

                {/* ID */}

                <Text style={styles.userId}>
                    ID: {userId}
                </Text>

                {/* Card thông tin */}

                <View style={styles.infoCard}>

                    {/* Email */}

                    <View style={styles.infoItem}>

                        <Text style={styles.label}>
                            Email
                        </Text>

                        <Text style={styles.value}>
                            {user.email}
                        </Text>

                    </View>

                    <View style={styles.divider} />

                    {/* Username */}

                    <View style={styles.infoItem}>

                        <Text style={styles.label}>
                            Username
                        </Text>

                        <Text style={styles.value}>
                            {user.username}
                        </Text>

                    </View>

                    <View style={styles.divider} />

                    {/* Phone */}

                    <View style={styles.infoItem}>

                        <Text style={styles.label}>
                            Số điện thoại
                        </Text>

                        <Text style={styles.value}>
                            {user.phoneNo
                                ? user.phoneNo
                                : "Chưa cập nhật"}
                        </Text>

                    </View>

                    <View style={styles.divider} />

                    {/* Địa chỉ */}

                    <View style={styles.infoItem}>

                        <Text style={styles.label}>
                            Địa chỉ
                        </Text>

                        <Text style={styles.value} numberOfLines={2}>
                            {user.address
                                ? user.address
                                : "Chưa điền địa chỉ"}
                        </Text>

                    </View>


                    <View style={styles.divider} />

                    {/* Gender */}

                    <View style={styles.infoItem}>

                        <Text style={styles.label}>
                            Giới tính
                        </Text>

                        <Text style={styles.value}>
                            {user.gender
                                ? user.gender
                                : "Chưa cập nhật"}
                        </Text>

                    </View>

                    <View style={styles.divider} />

                    {/* Ngày tạo */}

                    <View style={styles.infoItem}>

                        <Text style={styles.label}>
                            Ngày tạo tài khoản
                        </Text>

                        <Text style={styles.value}>
                            {user.createdAt.toDate().toLocaleString()}
                        </Text>

                    </View>

                </View>

                {/* Button */}

                <View style={styles.buttonContainer}>

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >

                        <Text style={styles.backButtonText}>
                            Quay lại
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => {
                            setIsEditing(true);
                        }}
                    >

                        <Text style={styles.saveButtonText}>
                            Chỉnh sửa
                        </Text>

                    </TouchableOpacity>

                </View>

            </ScrollView>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: "#EDE0CF",
    },

    scrollContainer: {
        alignItems: "center",
        paddingHorizontal: 15,
        paddingBottom: 30,
    },

    avatarContainer: {
        marginTop: 25,

        padding: 4,

        borderRadius: 70,

        backgroundColor: "#9C7055",
    },

    avatar: {
        width: 120,
        height: 120,

        borderRadius: 60,

        borderWidth: 3,
        borderColor: "#EDE0CF",
    },

    userId: {
        marginTop: 12,

        fontSize: 15,

        color: "#6A4731",
    },

    infoCard: {
        width: "100%",

        marginTop: 20,

        backgroundColor: "#F5E9DA",

        borderRadius: 18,

        paddingHorizontal: 18,

        elevation: 5,
    },

    infoItem: {
        paddingVertical: 16,
    },

    label: {
        fontSize: 14,

        color: "#9C7055",

        marginBottom: 6,

        fontWeight: "500",
    },

    value: {
        fontSize: 16,

        color: "#3B210A",

        fontWeight: "500",
    },

    divider: {
        height: 1,

        backgroundColor: "#D8C4B1",
    },

    input: {
        backgroundColor: "#EDE0CF",

        borderWidth: 1,

        borderColor: "#9C7055",

        borderRadius: 10,

        paddingHorizontal: 12,

        paddingVertical: 11,

        fontSize: 15,

        color: "#3B210A",
    },

    genderContainer: {
        flexDirection: "row",

        justifyContent: "space-between",

        marginTop: 5,
    },

    genderButton: {
        flex: 1,

        marginHorizontal: 4,

        borderWidth: 1,

        borderColor: "#9C7055",

        borderRadius: 10,

        paddingVertical: 11,

        alignItems: "center",

        backgroundColor: "#EDE0CF",
    },

    genderSelected: {
        backgroundColor: "#E0C0A9",

        borderColor: "#3B210A",
    },


    genderText: {
        color: "#3B210A",

        fontSize: 15,

        fontWeight: "500",
    },

    buttonContainer: {
        width: "100%",

        flexDirection: "row",

        marginTop: 20,

        gap: 10,
    },

    backButton: {
        flex: 1,

        paddingVertical: 14,

        borderRadius: 12,

        backgroundColor: "#D8C4B1",

        alignItems: "center",
    },


    backButtonText: {
        color: "#3B210A",

        fontSize: 16,

        fontWeight: "bold",
    },

    saveButton: {
        flex: 1,

        paddingVertical: 14,

        borderRadius: 12,

        backgroundColor: "#3B210A",

        alignItems: "center",
    },

    saveButtonText: {
        color: "#EDE0CF",

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