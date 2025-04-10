import React from 'react';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';


const Wishlist = ({ wishlist, toggleWishlist }) => {
  return (
    <Card className="fixed top-4">
      <CardContent>
        <Typography variant="h6" className="flex items-center gap-2 mb-4">
          <FavoriteIcon color="error"/> Wishlist ({wishlist.length})
        </Typography>
        
        {wishlist.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Your wishlist is empty
          </Typography>
        ) : (
          <List>
            {wishlist.map((car, index) => (
              <React.Fragment key={car.id}>
                <ListItem 
                  secondaryAction={
                    <Button
                      size="small" 
                      color="error"
                      onClick={() => toggleWishlist(car)}
                    >
                      Remove
                    </Button>
                  }
                >
                  <ListItemText
                    primary={`${car.brand} ${car.model}`}
                    secondary={
                      <>
                        <span className="block">${car.price.toLocaleString()}</span>
                        <Chip label={car.fuelType} size="small" className="mt-1" />
                      </>
                    }
                  />
                </ListItem>
                {index < wishlist.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default Wishlist;