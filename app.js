"use strict";
const hello = (name) => {
    console.log(`Hello, ${name}!`);
};
hello("World");
const categoryPromotion = {
    clothing: 20,
    accessories: 15,
    electronics: 10,
};
function applyDiscounts(cart) {
    let total = cart.items.reduce((acc, item) => acc + item.price * item.amount, 0);
    const coupon = cart.coupon;
    const onTop = cart.onTop;
    const season = cart.season;
    if (coupon) {
        if (coupon.type === "Fixed") {
            total -= coupon.amount;
        }
        else if (coupon.type === "Percentage") {
            total -= total * (coupon.percentage / 100);
        }
    }
    if (onTop) {
        if (onTop.type === "Category") {
            const discount = cart.items.reduce((acc, item) => acc +
                item.price * item.amount * (categoryPromotion[item.category] / 100), 0);
            total -= discount;
        }
        else if (onTop.type === "Points") {
            const maxDiscount = total * (20 / 100);
            const pointsDiscount = Math.min(onTop.points, maxDiscount);
            total -= pointsDiscount;
        }
    }
    if (season) {
        if (season.type === "Special") {
            const count = Math.floor(total / season.everyX);
            total -= count * season.discountY;
        }
    }
    total = ((total * 100) | 0) / 100;
    return total;
}
const cart = {
    items: [
        { name: "T-Shirt", category: "clothing", price: 350, amount: 1 },
        { name: "Hat", category: "accessories", price: 250, amount: 1 },
        { name: "Belt", category: "accessories", price: 230, amount: 1 },
    ],
    coupon: { type: "Fixed", amount: 50 },
    onTop: { type: "Category", category: "Clothing" },
    season: { type: "Special", everyX: 300, discountY: 40 },
};
console.log(`Total price after discounts: ${applyDiscounts(cart)} THB`);
