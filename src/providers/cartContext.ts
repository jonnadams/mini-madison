import { createContext } from "react";
import type { CartItem, Product, Promo } from "@/types";

export type CartState = {
  items: CartItem[];
  appliedPromo: Promo | null;
};

export type CartContextValue = {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  applyPromo: (promo: Promo) => void;
  clearPromo: () => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextValue | undefined>(
  undefined
);
