import React from "react";

import styles from "./ProductCard.module.css";

import DefaultImage from "../../assets/images/default.webp";

const ProductCard = ({ product, addToCart }) => {
    return (
        <div className={styles.productCard}>
            <img
                src={product.image ? product.image : DefaultImage}
                alt={product.name}
            />
            <h2>
                {product.name}, {product.gender}
            </h2>
            <p>
                Price: {product.currency}:{product.price}
            </p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;