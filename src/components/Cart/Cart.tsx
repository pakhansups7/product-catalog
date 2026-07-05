import type { CartItem as CartItemType } from "../../types/cart";
import { CartItem } from "../CartItem/CartItem";
import "./Cart.css"

type CartProps = {
    cartItems: CartItemType[];
    onRemoveFromCart: (productId: number) => void;
    onIncreaseQuantity: (productId: number) => void;
    onDecreaseQuantity: (productId: number) => void;
    onClearCart: () => void;
};

export function Cart({ cartItems, onRemoveFromCart, onIncreaseQuantity, onDecreaseQuantity, onClearCart }: CartProps) {
    if (cartItems.length === 0) {
        return <p className="cart__empty">Your cart is empty</p>;
    }

    const cartTotal = cartItems.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
    }, 0);

    const totalQuantity = cartItems.reduce((acc, item) => {
        return acc + item.quantity;
    }, 0);

    return (
        <div className="cart">
            <h2 className="cart__title">Cart</h2>

            <ul className="cart__list">
                {cartItems.map((item) => (
                    <CartItem
                        key={item.product.id}
                        cartItem={item}
                        onRemoveFromCart={onRemoveFromCart}
                        onIncreaseQuantity={onIncreaseQuantity}
                        onDecreaseQuantity={onDecreaseQuantity}
                    />
                ))}
            </ul>

            <p className="cart__summary">Unique products: {cartItems.length}</p>
            <p className="cart__summary-row">Total quantity: {totalQuantity}</p>
            <p className="cart__summary-total">Total: ${cartTotal.toFixed(2)}</p>

            <button className="cart__clear-button" type="button" onClick={onClearCart}>
                Clear cart
            </button>
        </div>
    );
}