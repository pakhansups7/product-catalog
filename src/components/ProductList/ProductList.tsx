import type { Product } from "../../types/product";
import { ProductCard } from "../ProductCard/ProductCard";
import "./ProductList.css";

type ProductListProps = {
    products: Product[];
    onAddToCart: (product: Product) => void;
    onViewDetails: (product: Product) => void;
};

export function ProductList({ products, onAddToCart, onViewDetails }: ProductListProps) {
    if (products.length === 0) {
        return <p className="product-list__empty">No products found</p>;
    }
    return (
        <ul className="product-list">
            {products.map((product) => (
                <li key={product.id} className="product-list__item">
                    <ProductCard
                        product={product}
                        onAddToCart={onAddToCart}
                        onViewDetails={onViewDetails}
                    />
                </li>
            ))}
        </ul>
    );
}