import { collection, updateDoc, doc, setDoc, deleteDoc, getDoc, getDocs, docs, increment } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default class CartViewModels {
    static async addToCart(userId, product, quantity) {
        const cartRef = doc(db, "Cart", userId, "items", product.id);

        const cartItemsSnapshot = await getDoc(cartRef);

        if (cartItemsSnapshot.exists()) {
            await updateDoc(cartRef, { quantity: increment(quantity), salePercent: product.salePercent });
        }
        else {
            await setDoc(cartRef, {
                productId: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity: quantity,
                salePercent: product.salePercent
            })
        }
    }

    static async getCart(userId) {
        const cartRef = collection(db, "Cart", userId, "items");

        const snapshot = await getDocs(cartRef);

        const cartItems = snapshot.docs.map(doc => ({
            id: doc.id, ...doc.data()
        }))
        return cartItems;
    }

    static async deleteFromCart(userId, productId) {
        const cartRef = doc(db, "Cart", userId, "items", productId);
        await deleteDoc(cartRef);
    }

    static async deleteAllCart(userId) {
        const cartRef = collection(db, "Cart", userId, "items");

        const cartItems = await getDocs(cartRef);

        for (let items of cartItems.docs) {
            await deleteDoc(items.ref);
        }
    }

    static async decreaseQuantity(userId, productId) {
        const cartRef = doc(db, "Cart", userId, "items", productId);

        await updateDoc(cartRef, { quantity: increment(-1) });
    }

    static async increaseQuantity(userId, productId) {
        const cartRef = doc(db, "Cart", userId, "items", productId);

        await updateDoc(cartRef, { quantity: increment(1) });
    }
}