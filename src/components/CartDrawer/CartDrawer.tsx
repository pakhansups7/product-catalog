import type { CartItem as CartItemType } from "../../types/cart";
import { Cart } from "../Cart/Cart";

type CartDrawerProps = {
    isOpen: boolean;
    cartItems: CartItemType[];
    onClose: () => void;
    onRemoveFromCart: (productId: number) => void;
    onIncreaseQuantity: (productId: number) => void;
    onDecreaseQuantity: (productId: number) => void;
    onClearCart: () => void;
};

export function CartDrawer({
                               isOpen,
                               cartItems,
                               onClose,
                               onRemoveFromCart,
                               onIncreaseQuantity,
                               onDecreaseQuantity,
                               onClearCart,
                           }: CartDrawerProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="cart-overlay"
            onClick={onClose}
        >
            <aside
                className="cart-drawer"
                role="dialog"
                aria-modal="true"
                aria-label="Shopping cart"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    aria-label="Close cart"
                    onClick={onClose}
                >
                    Close
                </button>

                <Cart
                    cartItems={cartItems}
                    onRemoveFromCart={onRemoveFromCart}
                    onIncreaseQuantity={onIncreaseQuantity}
                    onDecreaseQuantity={onDecreaseQuantity}
                    onClearCart={onClearCart}
                />
            </aside>
        </div>
    );
}