import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchProducts } from "./api/productsApi";
import type { Product } from "./types/product";
import type { SortOption } from "./types/sort";
import { filterProducts, sortProducts } from "./utils/productUtils";
import { useCart } from "./hooks/useCart";
import { StatusMessage } from "./components/StatusMessage/StatusMessage";
import { ProductModal } from "./components/ProductModal/ProductModal";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { ProductsSection } from "./components/ProductsSection/ProductsSection";
import { CartDrawer } from "./components/CartDrawer/CartDrawer";
import { Notification } from "./components/Notification/Notification";
import "./App.css";

function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOption, setSortOption] = useState<SortOption>("default");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    const {
        cartItems,
        handleAddToCart,
        handleRemoveFromCart,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleClearCart,
    } = useCart();

    const loadProducts = useCallback(async () => {
        try {
            const productsFromApi = await fetchProducts();
            setProducts(productsFromApi);
            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    }, []);

    function handleRetry() {
        setLoading(true);
        setError(null);
        void loadProducts();
    }

    function handleResetFilters() {
        setSearchQuery("");
        setSelectedCategory("all");
        setSortOption("default");
    }

    function handleAddToCartWithNotification(product: Product) {
        const wasAdded = handleAddToCart(product);

        if (wasAdded) {
            setNotification(`${product.title} added to cart`);
            return;
        }

        if (!product.inStock) {
            setNotification(`${product.title} is out of stock`);
            return;
        }

        setNotification(`Maximum stock reached for ${product.title}`);
    }

    useEffect(() => {
        void loadProducts();
    }, [loadProducts]);

    useEffect(() => {
        if (!isCartOpen && !selectedProduct) {
            return;
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsCartOpen(false);
                setSelectedProduct(null);
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isCartOpen, selectedProduct]);

    useEffect(() => {
        if (!isCartOpen && !selectedProduct) {
            return;
        }

        const originalOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isCartOpen, selectedProduct]);

    useEffect(() => {
        if (!notification) {
            return;
        }

        const timeoutId = setTimeout(() => {
            setNotification(null);
        }, 2000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [notification]);

    const totalQuantity = useMemo(() => {
        return cartItems.reduce((acc, item) => {
            return acc + item.quantity;
        }, 0);
    }, [cartItems]);

    const categories = useMemo(() => {
        return Array.from(
            new Set(products.map((product) => product.category))
        );
    }, [products]);

    const filteredProducts = useMemo(() => {
        return filterProducts(
            products,
            searchQuery,
            selectedCategory
        );
    }, [products, searchQuery, selectedCategory]);

    const sortedProducts = useMemo(() => {
        return sortProducts(filteredProducts, sortOption);
    }, [filteredProducts, sortOption]);

    const hasActiveFilters =
        searchQuery !== "" ||
        selectedCategory !== "all" ||
        sortOption !== "default";

    if (loading) {
        return (
            <StatusMessage
                title="Loading..."
                description="Please wait while we prepare the catalog."
            />
        );
    }

    if (error) {
        return (
            <StatusMessage
                title="Something went wrong"
                description={error}
                buttonText="Try again"
                onButtonClick={handleRetry}
            />
        );
    }

    return (
        <div className="app">
            <AppHeader
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                categories={categories}
                sortOption={sortOption}
                totalQuantity={totalQuantity}
                onSearchQueryChange={setSearchQuery}
                onSelectedCategoryChange={setSelectedCategory}
                onSortOptionChange={setSortOption}
                onCartOpen={() => setIsCartOpen(true)}
            />

            <ProductsSection
                products={sortedProducts}
                hasActiveFilters={hasActiveFilters}
                onResetFilters={handleResetFilters}
                onAddToCart={handleAddToCartWithNotification}
                onViewDetails={setSelectedProduct}
            />

            <CartDrawer
                isOpen={isCartOpen}
                cartItems={cartItems}
                onClose={() => setIsCartOpen(false)}
                onRemoveFromCart={handleRemoveFromCart}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
                onClearCart={handleClearCart}
            />

            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onAddToCart={handleAddToCartWithNotification}
                />
            )}

            <Notification message={notification} />
        </div>
    );
}

export default App;