import type { Product } from "../../types/product";
import { ProductList } from "../ProductList/ProductList";

type ProductsSectionProps = {
    products: Product[];
    hasActiveFilters: boolean;
    onResetFilters: () => void;
    onAddToCart: (product: Product) => void;
    onViewDetails: (product: Product) => void;
};

export function ProductsSection({
                                    products,
                                    hasActiveFilters,
                                    onResetFilters,
                                    onAddToCart,
                                    onViewDetails,
                                }: ProductsSectionProps) {
    return (
        <main className="app-main">
            <section className="products-section">
                <div className="products-section__header">
                    <p className="products-section__count">
                        Showing {products.length} products
                    </p>

                    {hasActiveFilters && (
                        <button
                            className="products-section__reset-button"
                            type="button"
                            onClick={onResetFilters}
                        >
                            Reset filters
                        </button>
                    )}
                </div>

                <ProductList
                    products={products}
                    onAddToCart={onAddToCart}
                    onViewDetails={onViewDetails}
                />
            </section>
        </main>
    );
}