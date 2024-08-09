import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const fetchCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  return response.data;
};

export const saveOrder = async (items: { id: number; name: string; categoryId: number; quantity: number }[]) => {
  const response = await axios.post(`${API_BASE_URL}/items/multiple`, items);
  return response.data;
};