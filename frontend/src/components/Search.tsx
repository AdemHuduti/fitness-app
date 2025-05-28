import React, { useState } from "react";

interface SearchInputProps {
    onSearch: (query: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
    const [searchQuery, setSearchQuery] = useState("");


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    return (
        <div className="search-input-container">
            <input
                type="text"
                placeholder="Search by title or description"
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
            />
        </div>
    );
};

export default SearchInput;
