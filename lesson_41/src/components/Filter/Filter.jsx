import React from "react";
import './Filter.css'
import {FILTER_ALL, FILTER_MARRIED, FILTER_NOT_MARRIED} from "../../constants/filter";

export default function Filter({filter, setFilter}) {
    const handleChange = e => setFilter(e.target.value)
    return (
        <select onChange={handleChange} defaultValue={filter}>
            <option value={FILTER_ALL}>All</option>
            <option value={FILTER_MARRIED}>Married</option>
            <option value={FILTER_NOT_MARRIED}>Not married</option>
        </select>
    )
}