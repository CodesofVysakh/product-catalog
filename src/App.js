import React, { useState } from "react";

import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./context/cartContext";

import ProductList from "./components/screens/ProductList/ProductList";
import ShoppingCart from "./components/screens/ShoppingCart/ShoppingCart";
import Header from "./components/screens/Header/Header";

import ProductsData from "./catalog.json";

const App = () => {
    const [filteredProducts, setFilteredProducts] = useState(ProductsData);

    return (
        <CartProvider>
            <BrowserRouter>
				<Header filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} />	
                <Routes>
                    <Route path="/" element={<ProductList filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} />} />
                    <Route path="/cart" element={<ShoppingCart />} />
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
};

export default App;
