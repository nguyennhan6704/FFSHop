import { collection, getDocs, query, limit, doc, orderBy } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Product from "../models/Product";

export default class ProductViewModel {
    static async getNewProducts() {
        const productsRef = collection(db, 'Products');
        //chọn collection trên firestore

        const q = query(productsRef, orderBy('createdAt', 'desc'), limit(10));
        //giới hạn lấy ở collection trên là 10

        const snapshot = await getDocs(q);
        //lấy dữ liệu

        return snapshot.docs.map((doc) => {
            //trả về danh sách documents
            //map dùng để chuyển Firestore Document -> Product
            return new Product({
                id: doc.id,
                ...doc.data(),
                // ...doc.data() Nó lấy tất cả field trong Firebase
                // đưa vào object hiện tại.

                //kết hợp giữa 2 cái trên thì ta sẽ có
                //id: abc123
                //name: "Cappuccino",
                //price: 45000
            });
        });
    }
}