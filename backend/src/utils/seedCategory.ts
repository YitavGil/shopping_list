import { CategoryModel } from '../models';

const categories = [
  'מוצרי ניקיון',
  'גבינות',
  'ירקות ופירות',
  'בשר ודגים',
  'מאפים'
];

export async function seedCategories() {
  for (const categoryName of categories) {
    try {
      const existingCategory = await CategoryModel.findAll().then(
        cats => cats.find(cat => cat.name === categoryName)
      );
      
      if (!existingCategory) {
        await CategoryModel.create(categoryName);
      }
    } catch (error) {
      console.error(`Error seeding category ${categoryName}:`, error);
    }
  }
  console.log('Categories seeded successfully');
}