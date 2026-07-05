import type { ProductsResponse } from "../types/apiProduct";
import type { Product } from "../types/product";
import { mapApiProductToProduct } from "../utils/productMappers";

const BASE_URL = "https://dummyjson.com/products";

export async function fetchProducts(): Promise<Product[]> {

    const response = await fetch(`${BASE_URL}`);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const data: ProductsResponse = await response.json();

    return data.products.map((apiProduct) => mapApiProductToProduct(apiProduct));
}