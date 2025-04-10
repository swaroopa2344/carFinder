import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Switch, FormControlLabel, Grid } from '@mui/material';
import SearchFilters from './components/SearchFilters';
import CarList from './components/CarList';
import Wishlist from './components/WishList';

const API_URL = 'https://my-json-server.typicode.com/swaroopa2344/cars/cars'; 

const App = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    fuelType: '',
    seatingCapacity: '',
    sortBy: '',
    searchQuery: ''
  });

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('carWishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Fetch cars data
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setCars(response.data);
        setFilteredCars(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Apply filters whenever filters state changes
  useEffect(() => {
    applyFilters();
  }, [filters, cars]);

  const applyFilters = () => {
    let result = [...cars];

    // Apply search query filter
    if (filters.searchQuery) {
      result = result.filter(car =>
        car.model.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        car.brand.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Apply brand filter
    if (filters.brand) {
      result = result.filter(car => car.brand === filters.brand);
    }

    // Apply price range filter
    if (filters.minPrice) {
      result = result.filter(car => car.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(car => car.price <= parseInt(filters.maxPrice));
    }

    // Apply fuel type filter
    if (filters.fuelType) {
      result = result.filter(car => car.fuelType === filters.fuelType);
    }

    // Apply seating capacity filter
    if (filters.seatingCapacity) {
      result = result.filter(car => car.seatingCapacity === parseInt(filters.seatingCapacity));
    }

    // Apply sorting
    if (filters.sortBy === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredCars(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleWishlist = (car) => {
    const isInWishlist = wishlist.some(item => item.id === car.id);
    let updatedWishlist;

    if (isInWishlist) {
      updatedWishlist = wishlist.filter(item => item.id !== car.id);
    } else {
      updatedWishlist = [...wishlist, car];
    }

    setWishlist(updatedWishlist);
    localStorage.setItem('carWishlist', JSON.stringify(updatedWishlist));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Pagination logic
  const carsPerPage = 10;
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" className="py-8">
        <div className="flex justify-between items-center mb-8">
          <Typography variant="h3" component="h1" className="font-bold">
            Car Finder
          </Typography>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={toggleDarkMode} />}
            label="Dark Mode"
          />
        </div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={9}>
            <SearchFilters 
              filters={filters} 
              onFilterChange={handleFilterChange} 
              brands={[...new Set(cars.map(car => car.brand))]} 
            />
            
            {loading ? (
              <div className="text-center py-12">Loading cars...</div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">Error: {error}</div>
            ) : (
              <>
                <CarList 
                  cars={currentCars} 
                  wishlist={wishlist} 
                  toggleWishlist={toggleWishlist} 
                />
                
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Wishlist 
              wishlist={wishlist} 
              toggleWishlist={toggleWishlist} 
            />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;