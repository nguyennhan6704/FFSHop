import { db } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp, query, orderBy, where, getDocs, updateDoc, doc } from "firebase/firestore";

export default class OrderViewModels {
    static async createOrder(userId, userName, phoneNo, address, note, cart, totalPrice, shippingFee, total) {
        const orderRef = collection(db, "Orders");

        await addDoc(orderRef, {
            userId: userId,
            userName: userName,
            phoneNo: phoneNo,
            address: address,
            note: note,
            items: cart,
            totalPrice: totalPrice,
            shippingFee: shippingFee,
            total: total,
            paymentMethod: "COD",
            status: "Đang xử lý",
            createdAt: serverTimestamp()
        });
    }

    static async getOrders(userId) {
        const orderRef = collection(db, "Orders");

        const q = query(orderRef, where("userId", "==", userId), orderBy("createdAt", "desc"));

        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
    }

    static async updateStatus(orderId, status) {
        const orderRef = doc(db, "Orders", orderId);

        await updateDoc(orderRef, {
            status: status
        })
    }
}