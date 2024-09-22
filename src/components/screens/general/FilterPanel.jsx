import React, { useState } from "react";

import styles from "./General.module.css";

import ProductsData from "../../../catalog.json";

const FilterPanel = ({ onFilter }) => {
    const [selectedFilters, setSelectedFilters] = useState({
        gender: [],
        color: [],
        priceRange: "",
        type: [],
    });

    const getPriceRange = (price) => {
        if (price <= 300) return "Low";
        if (price > 300 && price <= 400) return "Medium";
        return "High";
    };

    const handleFilterChange = (filterName, value) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
    };

    const handleCheckboxFilterChange = (filterName, option) => {
        setSelectedFilters((prevFilters) => {
            const selectedOptions = prevFilters[filterName];
            const isOptionSelected = selectedOptions.includes(option);
            return {
                ...prevFilters,
                [filterName]: isOptionSelected
                    ? selectedOptions.filter((item) => item !== option)
                    : [...selectedOptions, option],
            };
        });
    };

    const handleFilter = () => {
        const newFilteredProducts = ProductsData.filter((product) => {
            const priceRange = getPriceRange(product.price);
            return (
                (selectedFilters.gender.length === 0 ||
                    selectedFilters.gender.includes(product.gender)) &&
                (selectedFilters.color.length === 0 ||
                    selectedFilters.color.includes(product.color)) &&
                (!selectedFilters.priceRange ||
                    priceRange === selectedFilters.priceRange) &&
                (selectedFilters.type.length === 0 ||
                    selectedFilters.type.includes(product.type))
            );
        });

        onFilter(newFilteredProducts);
    };

    const filterOptions = {
        gender: ["Men", "Women"],
        color: ["Black", "Blue", "Pink", "Green", "Red", "Grey", "Purple", "White", "Yellow"],
        priceRange: ["Low", "Medium", "High"],
        type: ["Polo", "Hoodie", "Basic"],
    };

    return (
        <div className={styles.filterContainer}>
            <h3>Filters</h3>
            {Object.keys(filterOptions).map((filterName, index) => (
                <div key={filterName} className={styles.filterGroup}>
                    <h4 className={styles.filterName}>
                        {index + 1}. {filterName}
                    </h4>
                    <ul>
                        {filterOptions[filterName].map((option) => (
                            <li key={option}>
                                {filterName === "priceRange" ? (
                                    <label>
                                        <input
                                            type="radio"
                                            name={filterName}
                                            value={option}
                                            checked={
                                                selectedFilters[filterName] ===
                                                option
                                            }
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    filterName,
                                                    e.target.value
                                                )
                                            }
                                        />
                                        {option}
                                    </label>
                                ) : (
                                    <label>
                                        <input
                                            type="checkbox"
                                            name={filterName}
                                            value={option}
                                            checked={selectedFilters[
                                                filterName
                                            ].includes(option)}
                                            onChange={() =>
                                                handleCheckboxFilterChange(
                                                    filterName,
                                                    option
                                                )
                                            }
                                        />
                                        {option}
                                    </label>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
            <button
                className={styles.button}
                onClick={() =>{
                    setSelectedFilters({
                        gender: [],
                        color: [],
                        priceRange: "",
                        type: [],
                    });
                    onFilter(ProductsData);
                }}
            >
                Reset
            </button>
            <button className={styles.button} onClick={handleFilter}>
                Apply Filters
            </button>
        </div>
    );
};

export default FilterPanel;
