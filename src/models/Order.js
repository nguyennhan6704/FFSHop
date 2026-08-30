export default class Order {
    constructor(
        id,
        userId,
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