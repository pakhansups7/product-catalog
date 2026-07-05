import type { ApiProduct } from "../types/apiProduct";
import type { Product } from "../types/product";

export function mapApiProductToProduct(apiProduct: ApiProduct): Product {
    return {
        id: apiProduct.id,
        title: apiProduct.title,
        description: apiProduct.description,
        price: apiProduct.price,
        category: apiProduct.category,
        imageUrl: apiProduct.thumbnail,
        rating: apiProduct.rating,
        stock: apiProduct.stock,
        inStock: apiProduct.stock > 0
    }
}