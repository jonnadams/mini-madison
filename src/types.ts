// Define a TypeScript type for the product
export type Product = {
  id: number;
  name: string;
  price: number;
};

export type CartItem = Product & {
  quantity: number;
};

export type Promo = {
  code: string;
  /**
   * Either a percent string like "15%" or a fixed amount like "$10".
   */
  discount: string;
};
