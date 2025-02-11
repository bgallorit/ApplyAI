import React, { useState } from 'react';
import './Filters.css';

function Filters({ onFilterChange }) {
  const [searchParams, setSearchParams] = useState({
    search: '',
    location: '',
    type: [],
    degree: 'any',
  });

  // Handle change event for all form fields
  const handleChange = (name, value) => {
    let updatedValue = value;
    if (name === 'type') {
      updatedValue = searchParams.type.includes(value)
        ? searchParams.type.filter((t) => t !== value)
        : [...searchParams.type, value];
    }
    setSearchParams({ ...searchParams, [name]: updatedValue });
  };

  // Submit search filters
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    onFilterChange(searchParams);
  };

  // Clear search filters
  const handleClearFilters = () => {
    const resetParams = {
      search: '',
      location: '',
      type: [],
      degree: 'any',
    };
    setSearchParams(resetParams);
    onFilterChange(resetParams);
  };

  return (
    <form className="filters-container" onSubmit={handleSearch}>
      <h2>Filters</h2>
      <div className="form-group">
        <label htmlFor="search">Search</label>
        <input
          type="text"
          id="search"
          value={searchParams.search}
          onChange={(e) => handleChange('search', e.target.value)}
          placeholder="Job title, keywords, or company"
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={searchParams.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="City, state, or zip code"
        />
      </div>
      <div className="form-group">
        <label>Type</label>
        <div className="checkbox-group">
          {['On-Site', 'Remote', 'Hybrid'].map((type) => (
            <label key={type}>
              <input
                type="checkbox"
                value={type}
                checked={searchParams.type.includes(type)}
                onChange={(e) => handleChange('type', e.target.value)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="degree">Degree</label>
        <select
          id="degree"
          value={searchParams.degree}
          onChange={(e) => handleChange('degree', e.target.value)}
        >
          <option value="any">Any</option>
          <option value="associate">Associate</option>
          <option value="bachelor">Bachelor's</option>
          <option value="master">Master's</option>
          <option value="doctorate">Doctorate</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="search-button">Search</button>
        <button type="button" className="clear-button" onClick={handleClearFilters}>Clear Filters</button>
      </div>
    </form>
  );
}

export default Filters;
