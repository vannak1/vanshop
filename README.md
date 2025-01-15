# E-Commerce React Native App

A sample **Expo** + **React Native** e-commerce application demonstrating:

- **Product Listing Page (PLP)** with mock data (fetched via React Query)  
- **Product Detail Page (PDP)** with variation selection  
- **Cart** and **Checkout** flows  
- **React Hook Form** for form handling and validation  
- **React Navigation** for screen-to-screen navigation  
- **Lottie** animation for post-checkout success

---

## Features

1. **Product Listing Page (PLP)**
   - Displays products from a **mock API** (`fetchProducts`) which reads from `data/products.json`.
   - Includes a **search** bar to filter products by name.
   - Each product tile/card has an image, title, price, and **Add to Cart** button.
     - **New Behavior**: When you tap **Add to Cart** on the listing, a modal appears allowing you to select the product variant (e.g., “New” vs “Pre-Owned”) before adding the item to the cart.
   - Tapping a product tile navigates to the **Product Detail** screen.

2. **Product Detail Page (PDP)**
   - Shows extended product info: title, description, price, image.
   - Variation selection based on product type (e.g., “New” vs “Pre-Owned”).
   - **Add to Cart** button which saves selected variation to the cart, then navigates to **Cart**.

3. **Cart**
   - Displays items previously added.
   - **Proceed to Checkout** button navigates to the **Checkout** screen.
   - A **Clear Cart** button to remove all items.
   - Links to return to the product listing.

4. **Checkout**
   - **React Hook Form** for handling user input:
     - Name, Phone, Shipping Address, Credit Card
     - With validation (e.g., required fields, credit card format, etc.).
   - **Place Order** triggers a **mock API** (`submitOrder`) using **React Query**’s `useMutation`.
   - Displays loading/spinner while submitting.
   - Upon success, shows a **Lottie** checkmark animation, then navigates to the **Confirmation** screen.

5. **Confirmation Screen**
   - Displays the **order ID** returned from the mock API.
   - Allows returning to the **Product List** page.

---

## Tech Stack

- **React Native** (with [Expo](https://docs.expo.dev/))
- **TypeScript**
- **React Navigation** (Stack Navigator)
- **React Hook Form** (form validation)
- **React Query** (data fetching and mutation)
- **Lottie** (for success animations)

---

## Getting Started

1. **Clone** or download this repository.
2. **Install dependencies**:

   ```bash
   yarn install
   ```
   *(Or `npm install` if you prefer npm.)*

3. **Start** the Expo development server:

   ```bash
   yarn start
   ```
   Then scan the QR code with the [Expo Go app](https://expo.dev/client) or launch in your simulator/emulator.

---

## Configuration

### 1. Mock Data & APIs

- **Products**: stored in `data/products.json`.  
- **`fetchProducts.ts`** simulates fetching product data via React Query.  
- **`submitOrder.ts`** simulates sending checkout data to a server (returns success + `orderId`).

---

## Usage

- **Product List**: You can search for products by typing in the search bar.
- **Add to Cart**:  
  - From the listing (PLP): Tapping “Add to Cart” opens a **modal** to choose the variant (if applicable), then adds the item to your cart.  
  - From the PDP: Select the desired variant and tap “Add to Cart.”
- **Cart**: Review your items. Tap “Proceed to Checkout” to move forward.
- **Checkout**:
  - Fill out the **Name**, **Phone**, **Shipping Address**, and **Credit Card** info.
  - Press **Place Order** to simulate an order submission (with loading animation).
  - On success, you see a Lottie check mark, then a **Confirmation Screen** with an Order ID.

---

## Additional Features / Extensions

- **Validation** with [React Hook Form](https://react-hook-form.com/) – Currently, we have basic rules (e.g., required, phone regex).
- **React Query** – Already used for both product fetching and order submission. Could be extended for caching or offline support.
- **Alias Imports** – If you need more aliases, add them in your `tsconfig.json` and `babel.config.js`.
- **FormInput** – Reusable text input component with label, placeholder, validation errors, etc.

---

## Questions / Contact

For any questions, feel free to reach out via GitHub issues or email.