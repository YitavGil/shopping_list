import express from 'express';
import { connectDB } from './config/database';
import categoryRoutes from './routes/categoryRoutes';
import itemRoutes from './routes/itemRoutes';
import cors from 'cors';
import { seedCategories } from './utils/seedCategory';
import { createCategoriesTable } from './utils/createCategoryTable';
import { createItemsTable } from './utils/createItemsTable';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes);

const initializeDatabase = async () => {
  try {
    await connectDB();
    console.log('Database connected successfully');
    await createCategoriesTable();
    await createItemsTable();  
    await seedCategories();
    console.log('Database initialization and seeding completed');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await initializeDatabase();
  } catch (error) {
    console.error('Error initializing application:', error);
  }
});