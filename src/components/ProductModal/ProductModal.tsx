import type { Product } from "../../types/product";
import "./ProductModal.css";

type ProductModalProps = {
    product: Product;
    onClose: () => void;
    onAddToCart: (product: Product) => void;
};

export function ProductModal({
                                 product,
                                 onClose,
                                 onAddToCart,
                             }: ProductModalProps) {
    return (
        <div className="product-modal-overlay" onClick={onClose}>
            <div
                className="product-modal"
                role="dialog"
                aria-modal="true"
                aria-label={product.title}
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    className="product-modal__close-button"
                    type="button"
                    aria-label="Close product details"
                    onClick={onClose}
                >
                    Close
                </button>

                <img
                    className="product-modal__image"
                    src={product.imageUrl}
                    alt={product.title}
                />

                <div className="product-modal__content">
                    <p className="product-modal__category">
                        {product.category}
                    </p>

                    <h2 className="product-modal__title">
                        {product.title}
                    </h2>

                    <p className="product-modal__description">
                        {product.description}
                    </p>

                    <p className="product-modal__meta">
                        Rating: {product.rating}
                    </p>

                    <p className="product-modal__meta">
                        Stock: {product.stock}
                    </p>

                    <p className="product-modal__price">
                        ${product.price}
                    </p>

                    <button
                        className="product-modal__add-button"
                        type="button"
                        disabled={!product.inStock}
                        onClick={() => onAddToCart(product)}
                    >
                        {product.inStock ? "Add to cart" : "Out of stock"}
                    </button>
                </div>
            </div>
        </div>
    );
}