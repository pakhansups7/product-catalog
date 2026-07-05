import type { SortOption } from "../../types/sort";
import "./ProductControls.css";

type ProductControlsProps = {
    searchQuery: string;
    selectedCategory: string;
    categories: string[];
    sortOption: SortOption;
    onSearchQueryChange: (query: string) => void;
    onSelectedCategoryChange: (category: string) => void;
    onSortOptionChange: (option: SortOption) => void;
};

export function ProductControls({
                                    searchQuery,
                                    selectedCategory,
                                    categories,
                                    sortOption,
                                    onSearchQueryChange,
                                    onSelectedCategoryChange,
                                    onSortOptionChange,
                                }: ProductControlsProps) {
    return (
        <div className="product-controls">
            <input
                className="product-controls__input"
                type="text"
                value={searchQuery}
                placeholder="Поиск товаров"
                aria-label="Search products"
                onChange={(event) => onSearchQueryChange(event.target.value)}
            />

            <select
                className="product-controls__select"
                value={selectedCategory}
                aria-label="Filter by category"
                onChange={(event) => onSelectedCategoryChange(event.target.value)}
            >
                <option value="all">All categories</option>

                {categories.map((category) => (
                    <option
                        key={category}
                        value={category}
                    >
                        {category}
                    </option>
                ))}
            </select>

            <select
                className="product-controls__select"
                value={sortOption}
                aria-label="Sort products"
                onChange={(event) => onSortOptionChange(event.target.value as SortOption)}
            >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
                <option value="title-asc">Title: A-Z</option>
            </select>
        </div>
    );
}