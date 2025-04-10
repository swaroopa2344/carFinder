import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Chip, Grid } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CarList = ({ cars, wishlist, toggleWishlist }) => {
  return (
    <Grid container spacing={3}>
      {cars.length === 0 ? (
        <Grid item xs={12}>
          <Typography variant="h6" className="text-center py-12">
            No cars found matching your criteria
          </Typography>
        </Grid>
      ) : (
        cars.map(car => (
          <Grid item xs={12} sm={6} lg={4} key={car.id}>
            <Card className="h-full flex flex-col">
              <CardMedia
                component="img"
                height="200"
                image={car.image || 'https://via.placeholder.com/300x200?text=Car+Image'}
                alt={car.model}
                className="object-cover"
              />
              <CardContent className="flex-grow">
                <div className="flex justify-between items-start">
                  <Typography gutterBottom variant="h5" component="div">
                    {car.brand} {car.model}
                  </Typography>
                  <Chip label={`$${car.price.toLocaleString()}`} color="primary" />
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Typography variant="body2" color="text.secondary">
                    <strong>Year:</strong> {car.year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Fuel:</strong> {car.fuelType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Seats:</strong> {car.seatingCapacity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Mileage:</strong> {car.mileage} km
                  </Typography>
                </div>
              </CardContent>
              <CardActions className="justify-between">
                <Button size="small" color="primary">
                  View Details
                </Button>
                <Button 
                  size="small" 
                  color="secondary"
                  startIcon={
                    wishlist.some(item => item.id === car.id) ? 
                    <FavoriteIcon color="error" /> : 
                    <FavoriteBorderIcon />
                  }
                  onClick={() => toggleWishlist(car)}
                >
                  {wishlist.some(item => item.id === car.id) ? 'Saved' : 'Save'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default CarList;