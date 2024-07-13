# Playtorium Test by Gevalin Wongweerakit

## Description
Playtorium is a TypeScript-based project designed to handle JSON data for an itemized shopping cart. This project includes features to apply discounts efficiently.

## Features
- Load item data from a JSON file.
- Apply various discount types, including coupon, on-top and season discounts.

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Playtorium

2. **Install dependencies**
   npm install

## Usage
1. **Set the JSON filename in the fileName variable**
2. **Run the project using the following command:**
   npm run dev

## Example JSON File
{
  "items": [
    { "name": "T-Shirt", "category": "clothing", "price": 350, "quantity": 1 },
    { "name": "Hat", "category": "accessories", "price": 250, "quantity": 1 },
    { "name": "Belt", "category": "accessories", "price": 230, "quantity": 1 }
  ],
  "coupon": { "type": "Percentage", "percentage": 10 },
  "onTop": { "type": "Category", "category": "accessories", "amount": 15 },
  "season": { "type": "Special", "everyX": 300, "discountY": 40 }
}

