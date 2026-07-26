import User from "../models/User";
import { auth } from "../firebaseConfig";
import { db } from "../firebaseConfig";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail, signOut
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

class AuthViewModel {
    async register(userData) {
        try {
            const user = new User(userData);

            const result = await createUserWithEmailAndPassword(auth, user.email, user.password);

            await setDoc(doc(db, "Users", result.user.uid), {
                email: user.email,

                username: user.username,

                avatar: user.avatar,

                address: user.address,

                phoneNo: user.phoneNo,

                gender: user.gender,

                createdAt: user.createdAt
            })

            await sendEmailVerification(result.user);

            return result;
        }
        catch (error) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    throw new Error("Email đã tồn tại.");

                case "auth/invalid-email":
                    throw new Error("Email không hợp lệ.");

                case "auth/weak-password":
                    throw new Error("Mật khẩu phải từ 6 ký tự.");

                default:
                    throw new Error(error.message);

            }
        }
    }

    async login(email, password) {
        try {
            const user = new User({ email, password });

            const result = await signInWithEmailAndPassword(
                auth,
                user.email,
                user.password
            );

            if (!result.user.emailVerified) {

                await signOut(auth);

                throw new Error("Vui lòng xác thực email trước khi đăng nhập.");

            }

            return result;
        }
        catch (error) {
            switch (error.code) {

                case "auth/invalid-credential":
                    throw new Error("Sai email hoặc mật khẩu.");

                default:
                    throw new Error(error.message);

            }
        }
    }

    async resetPassword(email) {
        return await sendPasswordResetEmail(auth, email);
    }

    async logout() {
        return await signOut(auth);
    }
}

export default new AuthViewModel();