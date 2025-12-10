import {
  useEffect,
  useReducer,
  type FC,
  type ReactElement,
  type ReactNode,
} from "react";
import type { Product, Promo } from "@/types";
import {
  CartContext,
  type CartState,
} from "@/providers/cartContext";

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "SET_QUANTITY"; payload: { productId: number; quantity: number } }
  | { type: "APPLY_PROMO"; payload: Promo }
  | { type: "CLEAR_PROMO" }
  | { type: "CLEAR_CART" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "SET_QUANTITY": {
      const { productId, quantity } = action.payload;
      if (quantity < 1) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== productId),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [], appliedPromo: null };
    case "APPLY_PROMO":
      return { ...state, appliedPromo: action.payload };
    case "CLEAR_PROMO":
      return { ...state, appliedPromo: null };
    default:
      return state;
  }
};

const CART_STORAGE_KEY = "mini-madison/cart";

/**
 * Loads the initial cart state from localStorage if available, otherwise returns a default state.
 *
 * @returns {CartState} The initial cart state with any saved items and promo applied.
 */
const getInitialState = (): CartState => {
  if (typeof window === "undefined") return { items: [], appliedPromo: null };
  try {
    const stored = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return { items: [], appliedPromo: null };
    const parsed = JSON.parse(stored) as Partial<CartState>;
    if (!parsed?.items) return { items: [], appliedPromo: null };
    return {
      items: parsed.items,
      appliedPromo: parsed.appliedPromo ?? null,
    };
  } catch (error) {
    console.error("Failed to parse cart from storage", error);
    return { items: [], appliedPromo: null };
  }
};

export const CartProvider: FC<{ children: ReactNode }> = ({
  children,
}): ReactElement => {
  const [state, dispatch] = useReducer(cartReducer, undefined, getInitialState);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addItem = (product: Product) =>
    dispatch({ type: "ADD_ITEM", payload: product });

  const removeItem = (productId: number) =>
    dispatch({ type: "REMOVE_ITEM", payload: productId });

  const setQuantity = (productId: number, quantity: number) =>
    dispatch({ type: "SET_QUANTITY", payload: { productId, quantity } });

  const applyPromo = (promo: Promo) =>
    dispatch({ type: "APPLY_PROMO", payload: promo });

  const clearPromo = () => dispatch({ type: "CLEAR_PROMO" });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        setQuantity,
        applyPromo,
        clearPromo,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
