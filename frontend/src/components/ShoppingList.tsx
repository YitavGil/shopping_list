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
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { addItem, updateItem, deleteItem, fetchCategoriesAsync, saveOrderAsync } from '../store/shoppingSlice';
import { AppDispatch, RootState } from '../store/store';
import { Item, Category } from '../store/types';

const ShoppingList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [itemName, setItemName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const { categories, items } = useSelector((state: RootState) => state.shopping);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  const handleAddItem = () => {
    if (itemName && categoryId) {
      const newItem: Omit<Item, 'id'> = {
        name: itemName,
        categoryId: Number(categoryId),
        quantity: 1
      };
      dispatch(addItem(newItem));
      setItemName('');
      setCategoryId('');
    }
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateItem({ id, quantity }));
  };

  const handleDeleteItem = (id: number) => {
    dispatch(deleteItem(id));
  };

  const handleFinishOrder = () => {
    dispatch(saveOrderAsync());
  };

  const renderCategoryItems = (category: Category, categoryItems: Item[]) => (
    <React.Fragment key={category.id}>
      <ListItem>
        <ListItemText primary={category.name} style={{ fontWeight: 'bold' }} />
      </ListItem>
      {categoryItems.map((item) => (
        <ListItem key={item.id} style={{ paddingLeft: '2rem' }}>
          <ListItemText primary={item.name} />
          <IconButton onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}>
            <RemoveIcon />
          </IconButton>
          <Typography variant="body2" style={{ margin: '0 0.5rem' }}>
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
    </React.Fragment>
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        הוסף מוצר חדש
      </Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          label="שם המוצר"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          fullWidth
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>קטגוריה</InputLabel>
        <Select
        label="קטגוריה"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value as string)}
        >
          {categories.map((category: Category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleAddItem} fullWidth>
        הוסף מוצר
      </Button>

      <Typography variant="h6" gutterBottom style={{ marginTop: '2rem' }}>
        רשימת קניות
      </Typography>
      <List>
        {categories.map((category: Category) => {
          const categoryItems = items.filter(item => item.categoryId === category.id);
          return categoryItems.length > 0 ? renderCategoryItems(category, categoryItems) : null;
        })}
      </List>

      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleFinishOrder} 
        fullWidth
        style={{ marginTop: '2rem' }}
      >
        סיים הזמנה
      </Button>
    </Box>
  );
};

export default ShoppingList;