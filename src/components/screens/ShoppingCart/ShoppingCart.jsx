import React, { useContext } from "react";

import styles from "./ShoppingCart.module.css";

import { CartContext } from "../../../context/cartContext";

const ShoppingCart = () => {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
        useContext(CartContext);

    const calculateTotal = () => {
        return cart.reduce(
            (total, product) => total + product?.price * product?.quantity,
            0
        );
    };

    return (
        <div className={styles.shoppingCart}>
            <h2>Shopping Cart</h2>
            <ul>
                {cart.map((product, index) => (
                    <li key={product?.id}>
                        {index + 1}. {product?.name} - {product.currency}: {product?.price}
                        <span>
                            <button
                                className={styles.quantityButton}
                                onClick={() => increaseQuantity(product)}
                            >
                                +
                            </button>
                            {product?.quantity}
                            <button
                                className={styles.quantityButton}
                                onClick={() => decreaseQuantity(product)}
                            >
                                -
                            </button>
                        </span>
                    </li>
                ))}
            </ul>
            <p>Total: INR: {calculateTotal()}</p>
            {cart.length > 0 && (
                <button
                    onClick={removeFromCart}
                    className={styles.removeButton}
                >
                    Remove All
                </button>
            )}
        </div>
    );
};

export default ShoppingCart;
