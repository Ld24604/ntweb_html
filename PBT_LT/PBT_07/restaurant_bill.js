const items = [
    { name: "Phở bò", price: 65000, qty: 2 },
    { name: "Trà đá", price: 5000, qty: 3 },
    { name: "Bún chả", price: 55000, qty: 1 }
];

const isWednesday = true;
const includeTip = true;

let subtotal = 0;

console.log("===== HÓA ĐƠN =====");

items.forEach((item, index) => {

    const lineTotal = item.price * item.qty;

    subtotal += lineTotal;

    console.log(
        `${index + 1}. ${item.name} x${item.qty} = ${lineTotal.toLocaleString("vi-VN")}đ`
    );
});

let discountPercent = 0;

if (subtotal > 1000000) {
    discountPercent = 15;
} else if (subtotal > 500000) {
    discountPercent = 10;
}

if (isWednesday) {
    discountPercent += 5;
}

const discount = subtotal * discountPercent / 100;

const afterDiscount = subtotal - discount;

const vat = afterDiscount * 0.08;

const tip = includeTip
    ? afterDiscount * 0.05
    : 0;

const total =
    afterDiscount +
    vat +
    tip;

console.log("\nTổng cộng:", subtotal.toLocaleString("vi-VN"));
console.log("Giảm giá:", discount.toLocaleString("vi-VN"));
console.log("VAT:", vat.toLocaleString("vi-VN"));
console.log("Tip:", tip.toLocaleString("vi-VN"));
console.log("Thanh toán:", total.toLocaleString("vi-VN"));