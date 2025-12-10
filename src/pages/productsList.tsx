import type { Product } from "@/types";
import ProductCard from "@/components/productCard";
import productsData from "../data/products.json";

// Cast the imported data to an array of Product
const products: Product[] = productsData as Product[];

/**
 * Displays the list of all products available for purchase.
 *
 * @returns {JSX.Element} The rendered products list page.
 */
const ProductsList = () => {
  return (
    <div className="px-4 md:px-0">
      <h1 className="text-3xl mb-4">Products</h1>
      <div className="md:px-0 grid md:grid-cols-2 grid-cols-1 gap-4">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsList
