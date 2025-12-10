import { useContext } from "react";
import { CartContext } from "@/providers/cartContext";

/**
 * Custom hook to access and manipulate the shopping cart state.
 *
 * @returns {import("@/providers/cartContext").CartContextValue}
 * An object containing the cart state and functions to operate on it.
 *
 * @throws {Error} If used outside of a CartProvider.
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
