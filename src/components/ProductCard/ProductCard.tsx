import type { Product } from "../../types/product";
import "./ProductCard.css";

type ProductCardProps = {
    product: Product;
    onAddToCart: (product: Product) => void;
    onViewDetails: (product: Product) => void;
};

export function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
    return (
        <div className="product-card">
            <img
                src={product.imageUrl}
                alt={product.title}
                className="product-card__image"
            />

            <h2 className="product-card__title">{product.title}</h2>

            <p className="product-card__description">
                {product.description}
            </p>

            <p className="product-card__category">
                Category: {product.category}
            </p>

            <p className="product-card__stock">
                {product.inStock ? `${product.stock} in stock` : "Out of stock"}
            </p>

            <p className="product-card__price">
                Price: ${product.price}
            </p>

            <p className="product-card__rating">
                Rating: {product.rating}
            </p>

            <div className="product-card__actions">
                <button
                    className="product-card__details-button"
                    type="button"
                    onClick={() => onViewDetails(product)}
                >
                    View details
                </button>

                <button
                    className="product-card__button"
                    type="button"
                    disabled={!product.inStock}
                    onClick={() => onAddToCart(product)}
                >
                    {product.inStock ? "Add to cart" : "Out of stock"}
                </button>
            </div>
        </div>
    );
}