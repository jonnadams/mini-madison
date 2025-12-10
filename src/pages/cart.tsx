import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import type { Promo } from "@/types";
import promosData from "../data/promos.json";

const Cart = () => {
  const { state, removeItem, clearCart, setQuantity, applyPromo, clearPromo } =
    useCart();
  const hasItems = state.items.length > 0;
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");
  const promos = promosData as Promo[];

  const getDiscountAmount = (subtotal: number, promo?: Promo | null) => {
    if (!promo) return 0;
    const value = promo.discount.trim();
    if (value.endsWith("%")) {
      const percent = Number.parseFloat(value.replace("%", ""));
      if (Number.isNaN(percent)) return 0;
      return (subtotal * percent) / 100;
    }
    if (value.startsWith("$")) {
      const amount = Number.parseFloat(value.replace("$", ""));
      if (Number.isNaN(amount)) return 0;
      return amount;
    }
    return 0;
  };

  const subtotal = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalItems = state.items.reduce(
    (count, item) => count + item.quantity,
    0
  );
  const discount = getDiscountAmount(subtotal, state.appliedPromo);
  const total = Math.max(subtotal - discount, 0);

  const handleApplyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setPromoError("Enter a promo code.");
      return;
    }
    const match = promos.find(
      (promo) => promo.code.toUpperCase() === code
    );
    if (!match) {
      setPromoError("Promo code not found.");
      return;
    }
    applyPromo(match);
    setPromoError("");
    setPromoInput(match.code);
  };

  const handleClearPromo = () => {
    clearPromo();
    setPromoError("");
  };

  return (
    <div className="space-y-4 px-4 md:px-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Cart</h1>
        {hasItems && (
          <Button variant="outline" onClick={clearCart}>
            Clear cart
          </Button>
        )}
      </div>

      {!hasItems ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          <div className="space-y-3">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border rounded p-3"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-muted-foreground" htmlFor={`qty-${item.id}`}>
                      Qty
                    </label>
                    <input
                      id={`qty-${item.id}`}
                      type="number"
                      min={1}
                      className="w-20 rounded border px-2 py-1"
                      value={item.quantity}
                      onChange={(e) => {
                        const next = Number(e.target.value);
                        if (Number.isNaN(next)) return;
                        setQuantity(item.id, next);
                      }}
                    />
                  </div>
                  <span className="font-semibold min-w-[80px] text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 rounded border p-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium" htmlFor="promo-code">
                Promo code
              </label>
              <div className="flex gap-2">
                <input
                  id="promo-code"
                  type="text"
                  className="flex-1 rounded border px-2 py-1"
                  placeholder="e.g. SAVE15"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                />
                <Button type="button" variant="outline" onClick={handleApplyPromo}>
                  Apply
                </Button>
                {state.appliedPromo && (
                  <Button type="button" variant="ghost" onClick={handleClearPromo}>
                    Remove
                  </Button>
                )}
              </div>
              {promoError && (
                <p className="text-sm text-red-600">{promoError}</p>
              )}
              {state.appliedPromo && (
                <p className="text-sm text-green-700">
                  Applied {state.appliedPromo.code} ({state.appliedPromo.discount})
                </p>
              )}
            </div>

            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {state.appliedPromo && (
              <div className="flex justify-between text-sm text-emerald-700">
                <span>Discount ({state.appliedPromo.code})</span>
                <span>- ${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button className="w-full" disabled={!hasItems}>
              Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
