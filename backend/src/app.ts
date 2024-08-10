import express from 'express';
import sequelize from './config/database';
import categoryRoutes from './routes/categoryRoutes';
import itemRoutes from './routes/itemRoutes';
import cors from 'cors';
import { seedCategories } from './utils/seedCategory';

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
    await sequelize.sync(); 
    console.log('Database synchronized');
    await seedCategories();
    console.log('Database initialized and seeded');
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