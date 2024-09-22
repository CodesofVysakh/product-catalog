import React, { useContext } from "react";

import styles from "./ProductList.module.css";

import { CartContext } from "../../../context/cartContext";

import ProductCard from "../ProductCard/ProductCard";
import FilterPanel from "../general/FilterPanel";

const ProductList = ({ filteredProducts, setFilteredProducts }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className={styles.mainContainer}>
            <div className={styles.productList}>
                {filteredProducts.length > 0 ? (
                    filteredProducts?.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            addToCart={addToCart}
                        />
                    ))
                ) : (
                    <div>No data found</div>
                )}
            </div>
            <FilterPanel onFilter={setFilteredProducts} />
        </div>
    );
};

export default ProductList;
