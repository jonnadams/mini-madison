# React + TypeScript + Vite

This project is a take-home test for Madison Reed.

It is a simple e-commerce proof of concept (POC) built with React, TypeScript, and Vite. State management (such as cart operations and promo code application) is handled using React Context and Reducers.

## Getting Started

You can view this project live at https://mini-madison.vercel.app/ or

To run this project locally:

1. **Clone the repository**
   ```
   git clone git@github.com:jonnadams/mini-madison.git
   cd mini-madison
   ```

2. **Install dependencies**
   ```
   npm install
   ```
   (or, if you use yarn: `yarn`)

3. **Start the development server**
   ```
   npm run dev
   ```
   (or: `yarn dev`)

4. **Open your browser**
   - Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) to see the app running.

---

You can browse products, add them to the cart, and apply promo codes. Cart state is managed globally via React Context and persists in local storage.
