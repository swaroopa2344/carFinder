import React from 'react';
import { TextField, MenuItem, Slider, Select, InputLabel, FormControl, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchFilters = ({ filters, onFilterChange, brands }) => {
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const seatingOptions = [2, 4, 5, 7, 8];

  return (
    <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <Typography variant="h6" className="mb-4">Search & Filter</Typography>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search Bar */}
        <TextField
          variant="outlined"
          placeholder="Search by model or brand"
          value={filters.searchQuery}
          onChange={(e) => onFilterChange('searchQuery', e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon className="mr-2" />,
          }}
        />

        {/* Brand Filter */}
        <FormControl fullWidth>
          <InputLabel>Brand</InputLabel>
          <Select
            value={filters.brand}
            onChange={(e) => onFilterChange('brand', e.target.value)}
            label="Brand"
          >
            <MenuItem value="">All Brands</MenuItem>
            {brands.map(brand => (
              <MenuItem key={brand} value={brand}>{brand}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Price Range */}
        <div>
          <Typography gutterBottom>Price Range</Typography>
          <div className="flex gap-4">
            <TextField
              label="Min Price"
              type="number"
              value={filters.minPrice}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
              fullWidth
            />
            <TextField
              label="Max Price"
              type="number"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              fullWidth
            />
          </div>
        </div>

        {/* Fuel Type */}
        <FormControl fullWidth>
          <InputLabel>Fuel Type</InputLabel>
          <Select
            value={filters.fuelType}
            onChange={(e) => onFilterChange('fuelType', e.target.value)}
            label="Fuel Type"
          >
            <MenuItem value="">All Fuel Types</MenuItem>
            {fuelTypes.map(type => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Seating Capacity */}
        <FormControl fullWidth>
          <InputLabel>Seating Capacity</InputLabel>
          <Select
            value={filters.seatingCapacity}
            onChange={(e) => onFilterChange('seatingCapacity', e.target.value)}
            label="Seating Capacity"
          >
            <MenuItem value="">Any</MenuItem>
            {seatingOptions.map(seats => (
              <MenuItem key={seats} value={seats}>{seats} seats</MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sort By */}
        <FormControl fullWidth>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            label="Sort By"
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="price-low-high">Price: Low to High</MenuItem>
            <MenuItem value="price-high-low">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default SearchFilters;