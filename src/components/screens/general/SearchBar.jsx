import React from "react";

import styles from "./General.module.css";

import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSearch, searchTerm, setSearchTerm }) => {
    const navigate = useNavigate();

    const handleSearch = () => {
        onSearch(searchTerm);
        navigate("./");
    };

    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
