import { useEffect, useState } from "react";
import type { CartItem } from "../types/cart";
import { loadCartItems, saveCartItems } from "../utils/cartStorage";
import type { Product } from "../types/product";

export function useCart() {
    const [cartItems, setCartItems] = useState<CartItem[]>(loadCartItems);

    useEffect(() => {
        saveCartItems(cartItems);
    }, [cartItems]);

    function handleAddToCart(product: Product): boolean {
        if (!product.inStock) {
            return false;
        }

        const existingCartItem = cartItems.find((item) => {
            return item.product.id === product.id;
        });

        if (existingCartItem) {
            if (existingCartItem.quantity >= product.stock) {
                return false;
            }

            const updatedCartItems = cartItems.map((item) => {
                if (item.product.id === product.id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }

                return item;
            });

            setCartItems(updatedCartItems);
            return true;
        }

        const newCartItem: CartItem = {
            product: product,
            quantity: 1,
        };

        setCartItems([...cartItems, newCartItem]);
        return true;
    }

    function handleRemoveFromCart(productId: number) {
        setCartItems((prevCartItems) => {
            return prevCartItems.filter((item) => item.product.id !== productId);
        });
    }

    function handleIncreaseQuantity(productId: number) {
        setCartItems((prevCartItems) => {
            return prevCartItems.map((item) => {
                if (item.product.id === productId) {
                    if (item.quantity >= item.product.stock) {
                        return item;
                    }

                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }

                return item;
            });
        });
    }

    function handleDecreaseQuantity(productId: number) {
        setCartItems((prevCartItems) => {
            const currentItem = prevCartItems.find((item) => {
                return item.product.id === productId;
            });

            if (!currentItem) {
                return prevCartItems;
            }

            if (currentItem.quantity === 1) {
                return prevCartItems.filter((item) => {
                    return item.product.id !== productId;
                });
            }

            return prevCartItems.map((item) => {
                if (item.product.id === productId) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                }

                return item;
            });
        });
    }

    function handleClearCart() {
        setCartItems(() => {
            return [];
        });
    }

    return {
        cartItems,
        handleAddToCart,
        handleRemoveFromCart,
        handleIncreaseQuantity,
        handleDecreaseQuantity,
        handleClearCart,
    };
}