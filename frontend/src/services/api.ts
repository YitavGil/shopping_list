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
  const response = await axios.put(`${API_BASE_URL}/items/${id}`, { quantity });
  return response.data;
};

export const deleteItemFromServer = async (id: number) => {
  await axios.delete(`${API_BASE_URL}/items/${id}`);
};

export const saveOrder = async (items: Item[]) => {
  const response = await axios.post(`${API_BASE_URL}/items/multiple`, items);
  return response.data;
};