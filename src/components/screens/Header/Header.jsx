import React, { useState } from "react";

import styles from "./Header.module.css";

import { useNavigate } from "react-router-dom";

import SearchBar from "../general/SearchBar";
import Logo from "../../assets/images/company-logo.png";

import ProductsData from "../../../catalog.json";

function Header({ setFilteredProducts}) {
	const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

	const handleSearch = () => {
        const newFilteredProducts = ProductsData.filter((product) => {
            return product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        });
        setFilteredProducts(newFilteredProducts);
    };


    return (
        <div className={styles.header}>
			<div className={styles.logo} onClick={() => navigate('/')}>
				<img src={Logo} alt="Logo" />
			</div>
            <SearchBar
                onSearch={handleSearch}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
			<button className={styles.button} onClick={() => navigate('/cart')}>
				Cart
			</button>
        </div>
    );
}

export default Header;
