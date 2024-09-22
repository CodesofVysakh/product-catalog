import React, { createContext, useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import ProductsData from "../catalog.json";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const notifyOutOfStock = () => {
        toast.error("Sorry! No more stock available.", {
            position: "bottom-right",
        });
    };

    const addToCart = (product) => {
        if (product?.quantity <= 0) {
            notifyOutOfStock();
            return;
        }

        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
            if (existingProduct.quantity < product.quantity) {
                setCart((prevCart) =>
                    prevCart.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                );
            } else {
                notifyOutOfStock();
            }
        } else {
            setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
        }
    };
    const removeFromCart = () => {
        setCart([]);
    };

    const increaseQuantity = (product) => {
        const originalProduct = ProductsData.find(
            (item) => item.id === product.id
        );

        if (product.quantity < originalProduct.quantity) {
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            notifyOutOfStock();
        }
    };

    const decreaseQuantity = (product) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
            }}
        >
            {children}
            <ToastContainer />
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
