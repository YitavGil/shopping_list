import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  List, 
  ListItem, 
  ListItemText, 
  Box, 
  IconButton,
  Typography,
  Divider,
  Grid,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { 
  fetchCategoriesAsync, 
  fetchItemsAsync, 
  addItemAsync, 
  updateItemAsync, 
  deleteItemAsync, 
  saveOrderAsync,
  clearOrder 
} from '../store/shoppingSlice';
import { AppDispatch, RootState } from '../store/store';
import { Item, Category } from '../store/types';
import OrderCompleteDialog from './OrderCompleteDialog';

const ShoppingList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [itemName, setItemName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const { categories, items, totalItems } = useSelector((state: RootState) => state.shopping);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchItemsAsync());
  }, [dispatch]);

  const handleAddItem = () => {
    if (itemName && categoryId) {
      const newItem: Omit<Item, 'id'> = {
        name: itemName,
        categoryId: Number(categoryId),
        quantity: 1
      };
      dispatch(addItemAsync(newItem));
      setItemName('');
      setCategoryId('');
    }
  };

  const handleUpdateQuantity = async (id: number, newQuantity: number) => {
    const item = items.find(item => item.id === id);
    if (item) {
      const updatedQuantity = Math.max(1, newQuantity);
      if (updatedQuantity !== item.quantity) {
        try {
          await dispatch(updateItemAsync({ id, quantity: updatedQuantity })).unwrap();
        } catch (error) {
          console.error('Failed to update item quantity:', error);
        
        }
      }
    }
  };

  const handleDeleteItem = (id: number) => {
    dispatch(deleteItemAsync(id));
  };

  const handleFinishOrder = () => {
    if (items.length > 0) {
      dispatch(saveOrderAsync());
      setDialogMessage('ההזמנה הושלמה!');
    } else {
      setDialogMessage('אין פריטים בהזמנה');
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    if (items.length > 0) {
      dispatch(clearOrder());
    }
  };

  const renderCategoryItems = (category: Category) => {
    const categoryItems = items.filter(item => item.categoryId === category.id);
    
    if (categoryItems.length === 0) {
      return null;
    }
  
    return (
      <Grid item xs={12} sm={6} md={4} key={category.id}>
        <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            {category.name}
          </Typography>
          <List>
            {categoryItems.map((item) => (
              <ListItem key={item.id} disableGutters>
                <ListItemText primary={item.name} />
                <IconButton 
                  onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body2" sx={{ mx: 1 }}>
                  {item.quantity}
                </Typography>
                <IconButton onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                  <AddIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    );
  };

  return (
    <Box sx={{ direction: 'rtl' }}>
      <Typography variant="h6" gutterBottom>
        הוסף מוצר חדש
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <TextField
              label="שם המוצר"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              fullWidth
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>קטגוריה</InputLabel>
            <Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value as string)}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleAddItem} 
        fullWidth 
        sx={{ mt: 2, mb: 4 }}
        disabled={!itemName || !categoryId}
      >
        הוסף מוצר
      </Button>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>
        פריטים ברשימה
      </Typography>
      <Grid container spacing={3}>
        {categories.map(renderCategoryItems)}
      </Grid>

      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleFinishOrder} 
        fullWidth
        sx={{ mt: 4 }}
      >
        סיים הזמנה
      </Button>

      <OrderCompleteDialog
        isOpen={isDialogOpen}
        message={dialogMessage}
        hasItems={items.length > 0}
        onClose={handleCloseDialog}
      />
    </Box>
  );
};

export default ShoppingList;