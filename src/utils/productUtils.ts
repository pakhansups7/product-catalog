import type { Product } from "../types/product";
import type { SortOption } from "../types/sort";

export function filterProducts(products: Product[], searchQuery: string, selectedCategory: string): Product[] {
    return products.filter((product) => {
        const matchedProduct = product.title.toLowerCase().includes(searchQuery.toLowerCase());

        const matchedCategory =
            selectedCategory === "all" || product.category === selectedCategory;

        return matchedProduct && matchedCategory;
    });
}

export function sortProducts(products: Product[], sortOption: SortOption): Product[] {
    const sortedProducts = [...products];

    if (sortOption === "price-asc") {
        sortedProducts.sort((a, b) => a.price - b.price);
    }

    if (sortOption === "price-desc") {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    if (sortOption === "rating-desc") {
        sortedProducts.sort((a, b) => b.rating - a.rating);
    }

    if (sortOption === "title-asc") {
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sortedProducts;
}