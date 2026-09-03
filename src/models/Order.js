export default class Order {
    constructor(
        id,
        userId,
        userName,
        phoneNo,
        address,
        note,
        items,
        totalPrice,
        shippingFee,
        total,
        paymentMethod,
        status,
        createdAt
    ) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.phoneNo = phoneNo;
        this.address = address;
        this.note = note;
        this.items = items;
        this.totalPrice = totalPrice;
        this.shippingFee = shippingFee;
        this.total = total;
        this.paymentMethod = paymentMethod;
        this.status = status;
        this.createdAt = createdAt;
    }
}