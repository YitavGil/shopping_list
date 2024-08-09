import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories, fetchItems, saveItem, updateItemQuantity, deleteItemFromServer, saveOrder } from '../services/api';
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

export const fetchItemsAsync = createAsyncThunk(
  'shopping/fetchItems',
  async () => {
    const response = await fetchItems();
    return response;
  }
);

export const addItemAsync = createAsyncThunk(
  'shopping/addItem',
  async (item: Omit<Item, 'id'>) => {
    const response = await saveItem(item);
    return response;
  }
);

export const updateItemAsync = createAsyncThunk(
  'shopping/updateItem',
  async ({ id, quantity }: { id: number; quantity: number }) => {
    const response = await updateItemQuantity(id, quantity);
    return response;
  }
);

export const deleteItemAsync = createAsyncThunk(
  'shopping/deleteItem',
  async (id: number) => {
    await deleteItemFromServer(id);
    return id;
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
      .addCase(fetchItemsAsync.fulfilled, (state, action) => {
        state.items = action.payload;
        state.totalItems = action.payload.reduce((total: number, item: Item) => total + item.quantity, 0);
      })
      .addCase(addItemAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.totalItems += action.payload.quantity;
      })
      .addCase(updateItemAsync.fulfilled, (state, action: PayloadAction<Item>) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          const oldQuantity = state.items[index].quantity;
          state.items[index] = action.payload;
          state.totalItems += action.payload.quantity - oldQuantity;
        }
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload);
        if (index !== -1) {
          state.totalItems -= state.items[index].quantity;
          state.items.splice(index, 1);
        }
      })
      .addCase(saveOrderAsync.fulfilled, (state) => {
        state.items = [];
        state.totalItems = 0;
      });
  },
});

export const { clearOrder } = shoppingSlice.actions;
export default shoppingSlice.reducer;