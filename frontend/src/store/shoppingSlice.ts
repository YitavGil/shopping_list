import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { saveOrder, fetchCategories } from '../services/api';
import { ShoppingState, Item, Category } from './types';

const initialState: ShoppingState = {
  items: [],
  categories: [],
  totalItems: 0,
};

export const fetchCategoriesAsync = createAsyncThunk(
  'shopping/fetchCategories',
  async () => {
    const response = await fetchCategories();
    return response;
  }
);

export const saveOrderAsync = createAsyncThunk(
  'shopping/saveOrder',
  async (_, { getState }) => {
    const state = getState() as { shopping: ShoppingState };
    await saveOrder(state.shopping.items);
  }
);

const shoppingSlice = createSlice({
  name: 'shopping',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<Item, 'id'>>) => {
      const newItem = {
        ...action.payload,
        id: Date.now(), // Use a temporary ID
      };
      state.items.push(newItem);
      state.totalItems += 1;
    },
    updateItem: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        const diff = action.payload.quantity - item.quantity;
        item.quantity = action.payload.quantity;
        state.totalItems += diff;
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.totalItems -= state.items[index].quantity;
        state.items.splice(index, 1);
      }
    },
    clearOrder: (state) => {
      state.items = [];
      state.totalItems = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(saveOrderAsync.fulfilled, (state) => {
        state.items = [];
        state.totalItems = 0;
      });
  },
});

export const { addItem, updateItem, deleteItem, clearOrder } = shoppingSlice.actions;
export default shoppingSlice.reducer;