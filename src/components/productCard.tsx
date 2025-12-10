import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import type { Product } from "@/types";
import { useCart } from "@/hooks/useCart";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>${product.price.toFixed(2)}</CardDescription>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
          <Button type="button" className="w-full" onClick={handleAddToCart}>
            Add To Cart
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductCard;
