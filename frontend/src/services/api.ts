import axios from 'axios';
import { Item } from '../store/types';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  return response.data;
};

export const fetchItems = async () => {
  const response = await axios.get(`${API_BASE_URL}/items`);
  return response.data;
};

export const saveItem = async (item: Omit<Item, 'id'>) => {
  const response = await axios.post(`${API_BASE_URL}/items`, item);
  return response.data;
};

export const updateItemQuantity = async (id: number, quantity: number): Promise<Item> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/items/${id}`, { quantity });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error updating item quantity:', error.response?.data);
      throw new Error(`Failed to update item quantity: ${error.response?.data?.message || error.message}`);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export const deleteItemFromServer = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/items/${id}`);
};

export const saveOrder = async (items: Item[]) => {
  const response = await axios.post(`${API_BASE_URL}/items/multiple`, items);
  return response.data;
};