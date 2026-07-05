import { ProductControls } from "../ProductControls/ProductControls";
import type { SortOption } from "../../types/sort";

type AppHeaderProps = {
    searchQuery: string;
    selectedCategory: string;
    categories: string[];
    sortOption: SortOption;
    totalQuantity: number;
    onSearchQueryChange: (query: string) => void;
    onSelectedCategoryChange: (category: string) => void;
    onSortOptionChange: (option: SortOption) => void;
    onCartOpen: () => void;
};

export function AppHeader({
                              searchQuery,
                              selectedCategory,
                              categories,
                              sortOption,
                              totalQuantity,
                              onSearchQueryChange,
                              onSelectedCategoryChange,
                              onSortOptionChange,
                              onCartOpen,
                          }: AppHeaderProps) {
    return (
        <header className="app-header">
            <h1>Product Catalog</h1>

            <ProductControls
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                categories={categories}
                sortOption={sortOption}
                onSearchQueryChange={onSearchQueryChange}
                onSelectedCategoryChange={onSelectedCategoryChange}
                onSortOptionChange={onSortOptionChange}
            />

            <button
                type="button"
                aria-label={`Open cart with ${totalQuantity} items`}
                onClick={onCartOpen}
            >
                🛒 Cart: {totalQuantity}
            </button>
        </header>
    );
}