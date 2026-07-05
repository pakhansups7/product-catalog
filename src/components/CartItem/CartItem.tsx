import type { CartItem as CartItemType } from "../../types/cart";
import "./CartItem.css";

type CartItemProps = {
    cartItem: CartItemType;
    onRemoveFromCart: (productId: number) => void;
    onIncreaseQuantity: (productId: number) => void;
    onDecreaseQuantity: (productId: number) => void;
};

export function CartItem({
                             cartItem,
                             onRemoveFromCart,
                             onIncreaseQuantity,
                             onDecreaseQuantity,
                         }: CartItemProps) {
    const isMaxQuantity = cartItem.quantity >= cartItem.product.stock;

    return (
        <li className="cart-item">
            <img
                className="cart-item__image"
                src={cartItem.product.imageUrl}
                alt={cartItem.product.title}
            />

            <div className="cart-item__content">
                <h3 className="cart-item__title">{cartItem.product.title}</h3>

                <p className="cart-item__meta">
                    Price: ${cartItem.product.price}
                </p>

                <p className="cart-item__subtotal">
                    Subtotal: ${(cartItem.product.price * cartItem.quantity).toFixed(2)}
                </p>

                <div className="cart-item__controls">
                    <button
                        className="cart-item__button"
                        type="button"
                        aria-label={`Decrease quantity for ${cartItem.product.title}`}
                        onClick={() => onDecreaseQuantity(cartItem.product.id)}
                    >
                        -
                    </button>

                    <span className="cart-item__quantity">
                        {cartItem.quantity}
                    </span>

                    <button
                        className="cart-item__button"
                        type="button"
                        disabled={isMaxQuantity}
                        aria-label={`Increase quantity for ${cartItem.product.title}`}
                        onClick={() => onIncreaseQuantity(cartItem.product.id)}
                    >
                        +
                    </button>

                    <button
                        className="cart-item__button cart-item__button--remove"
                        type="button"
                        aria-label={`Remove ${cartItem.product.title} from cart`}
                        onClick={() => onRemoveFromCart(cartItem.product.id)}
                    >
                        Remove
                    </button>
                </div>

                {isMaxQuantity && (
                    <p className="cart-item__limit">
                        Max stock reached
                    </p>
                )}
            </div>
        </li>
    );
}