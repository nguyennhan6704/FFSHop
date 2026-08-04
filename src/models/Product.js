export default class Product {
    constructor(data) {
        this.id = data.id ?? '';
        this.name = data.name ?? '';
        this.category = data.category ?? '';
        this.image = data.image ?? '';
        this.description = data.description ?? '';

        this.price = Number(data.price) || 0;
        this.salePercent = Number(data.salePercent) || 0;
        this.rating = Number(data.rating) || 0;
        this.reviewsCount = Number(data.reviewsCount) || 0;

        this.createdAt = data.createdAt ?? null;
    }

    get finalPrice() {
        if (this.salePercent > 0 && this.salePercent <= 100) {
            return this.price * (1 - this.salePercent / 100);
        }
        return this.price;
    }
}