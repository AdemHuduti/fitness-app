import { useState } from "react";
import { AiOutlineFilter } from "react-icons/ai";

import "./styles/Filters.css";

interface FiltersProps {
    onFilterChange: (filters: any) => void;
    handleClearFilters: () => void;
    filtersApplied: boolean;
    filterMessage: string;
}

const Filters = ({ onFilterChange, handleClearFilters, filtersApplied, filterMessage }: FiltersProps) => {
    const [activityType, setActivityType] = useState("");
    const [date, setDate] = useState("");

    const handleFilterChange = () => {
        onFilterChange({ activityType, date });
    };

    const clearFilters = () => {
        setActivityType("");
        setDate("");
        handleClearFilters();
    };

    return (

        <div className="filters-container">
            <div className="filter-header">
                <h3>Filters</h3>
                <AiOutlineFilter />
            </div>
            <select
                onChange={(e) => setActivityType(e.target.value)}
                value={activityType}
                className="filter-select"
            >
                <option value="">Select Activity Type</option>
                <option value="run">Run</option>
                <option value="walk">Walk</option>
                <option value="hike">Hike</option>
                <option value="ride">Ride</option>
                <option value="swim">Swim</option>
                <option value="workout">Workout</option>
                <option value="HIIT">HIIT</option>
                <option value="other">Other</option>
            </select>

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="filter-date"
            />

            <div className="filter-actions">
                <button onClick={handleFilterChange} className="filter-btn">
                    Apply Filters
                </button>
                {
                    filtersApplied &&
                    <button onClick={clearFilters} className="clear-btn">
                        Clear Filters
                    </button>
                }

            </div>
            {filterMessage && <p className="filter-message">{filterMessage}</p>}
        </div>
    );
};

export default Filters;
