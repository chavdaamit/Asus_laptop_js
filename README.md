# ASUS Shop  (Frontend Clone)

A responsive, front-end e-commerce landing page inspired by ASUS India's laptop store. Built with **HTML5, CSS3, Bootstrap 5, and vanilla JavaScript**, featuring a fully working shopping cart powered by `localStorage`.

## 🚀 Features

- **Responsive Navbar** with quick links to Vivobook, Zenbook, All-in-One, Accessories, Tower PCs, and Chromebook categories
- **Hero Carousel** (Bootstrap carousel) showcasing featured laptops
- **Product Sections**:
  - Top Deals on Laptops
  - Shop by Budget (under ₹40k, ₹40k–70k, ₹70k–100k, above ₹100k)
  - Shop by Processor (Intel, AMD, Snapdragon)
  - AI Laptops
  - Everyday Laptops
  - Creator Laptops
  - Business Laptops
  - All-in-One PCs
  - New & Trending
- **Shopping Cart System** (`cart.js`)
  - Add to Cart / Buy Now buttons on every product card
  - Cart persists across page reloads via `localStorage`
  - Increase/decrease quantity, remove items, clear cart
  - Live cart item count badge and total price
  - Toast notifications on add-to-cart
  - Offcanvas slide-in cart panel with demo checkout flow
- **Scroll Animations** using [AOS (Animate on Scroll)](https://michalsnik.github.io/aos/)
- **Hover Effects** on product cards (scale + colored border) for visual feedback

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|--------------------------------------|
| Markup     | HTML5                                |
| Styling    | CSS3, Bootstrap 5.3.8                |
| Animations | AOS.js                                |
| Scripting  | Vanilla JavaScript (ES6)             |
| Fonts      | Google Fonts (Open Sans)             |
| Storage    | Browser `localStorage`               |

## 📁 Project Structure

```
├── index.html      # Main page markup (navbar, carousel, product sections, cart offcanvas)
├── style.css       # Custom styles (cards, hover effects, cart UI)
├── cart.js         # Cart logic: add/remove/update items, render cart, checkout
└── img/            # Product images, banners, and icons
```
<img width="1920" height="8121" alt="Asus_all_laptop" src="https://github.com/user-attachments/assets/dfdd4422-745c-4b0e-9d2f-d57b8e1a450c" />


## ▶️ Getting Started

1. Clone or download this repository.
2. Make sure the `img/` folder is present alongside `index.html`, `style.css`, and `cart.js`.
3. Open `index.html` directly in any modern browser — no build step or server required.

```bash
# Optional: serve locally for a cleaner experience
npx serve .
```

## 🛒 How the Cart Works

Each product card carries `data-*` attributes (`data-product-id`, `data-product-name`, `data-product-price`, `data-product-img`) that `cart.js` reads when a button is clicked:

- **Add to Cart** → adds/updates the item quantity and shows a toast
- **Buy Now** → adds the item and opens the cart panel directly
- **Checkout** → shows an order summary alert and clears the cart *(demo only — no real payment gateway is connected)*

## ⚠️ Notes

- This is a **static front-end demo/clone** for learning or portfolio purposes — it is not affiliated with or endorsed by ASUS.
- The checkout flow is simulated; integrate a real payment gateway (Razorpay, Stripe, etc.) before using this in production.
- All product links point to the original ASUS India store pages for reference.

## 📄 License

This project is intended for educational/demo purposes only. Product names, images, and brand assets belong to their respective owners (ASUS).
