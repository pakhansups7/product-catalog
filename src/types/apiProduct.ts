
export type ApiProduct = {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    thumbnail: string;
    rating: number;
    stock: number;
}

export type ProductsResponse = {
    products: ApiProduct[];
}