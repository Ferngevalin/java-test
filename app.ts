import * as fs from "fs";

enum campaignType {
  FIXED = "Fixed",
  PERCENTAGE = "Percentage",
  CATEGORY = "Category",
  POINTS = "Points",
  SPECIAL = "Special",
}

interface Item {
  name: string;
  category: "clothing" | "accessories" | "electronics";
  price: number;
  amount: number; //quantity of item
}

type CouponCampaign =
  | { type: campaignType.FIXED; amount: number }
  | { type: campaignType.PERCENTAGE; percentage: number };

type OnTopCampaign =
  | { type: campaignType.CATEGORY; category: string; amount: number }
  | { type: campaignType.POINTS; points: number };

type SeasonCampaign = {
  type: campaignType.SPECIAL;
  everyX: number;
  discountY: number;
};

interface Cart {
  items: Item[];
  coupon?: CouponCampaign;
  onTop?: OnTopCampaign;
  season?: SeasonCampaign;
}

function applyDiscounts(filePath: string): number {
  var cart: Cart = importJson(filePath);
  let total = cart.items.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );

  total = couponDiscount(cart, total);
  total = onTopDiscount(cart, total);
  total = seasonDiscount(cart, total);

  return Math.round(total * 100) / 100;
}

function couponDiscount(cart: Cart, total: number): number {
  const { coupon, items } = cart;
  if (!coupon) return total;

  if (coupon.type === campaignType.FIXED) {
    total -= coupon.amount;
  } else if (coupon.type === campaignType.PERCENTAGE) {
    cart.items = items.map((item) => ({
      ...item,
      price: item.price * (1 - coupon.percentage / 100),
    }));
    const discount = total * (coupon.percentage / 100);
    total -= discount;
  }

  return total;
}

function onTopDiscount(cart: Cart, total: number): number {
  const { onTop, items } = cart;
  if (!onTop) return total;

  if (onTop.type === campaignType.CATEGORY) {
    const discount = items
      .filter((item) => item.category === onTop.category)
      .reduce(
        (acc, item) => acc + item.price * item.amount * (onTop.amount / 100),
        0
      );
    total -= discount;
  } else if (onTop.type === campaignType.POINTS) {
    const maxDiscount = total * 0.2;
    const pointsDiscount = Math.min(onTop.points, maxDiscount);
    total -= pointsDiscount;
  }

  return total;
}

function seasonDiscount(cart: Cart, total: number): number {
  const { season } = cart;
  if (!season) return total;

  if (season.type === campaignType.SPECIAL) {
    const count = Math.floor(total / season.everyX);
    total -= count * season.discountY;
  }

  return total;
}

function importJson(filePath: string) {
  const file = fs.readFileSync(filePath, "utf-8");
  try {
    const json = JSON.parse(file);
    return json;
  } catch (err) {
    throw new Error(`Error parsing JSON file: ${err}`);
  }
}

// local test
// const cart: Cart = {
//   items: [
//     { name: "T-Shirt", category: "clothing", price: 350, amount: 1 },
//     { name: "Hat", category: "accessories", price: 250, amount: 1 },
//     { name: "Belt", category: "accessories", price: 230, amount: 1 },
//   ],
//   coupon: { type: campaignType.PERCENTAGE, percentage: 10 },
//   onTop: { type: campaignType.CATEGORY, category: "clothing", amount: 15 },
//   season: { type: campaignType.SPECIAL, everyX: 300, discountY: 40 },
// };

console.log(
  `Total price after discounts: ${applyDiscounts("./data.json")} THB`
);
