import { Category } from '../models';

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
      const [category, created] = await Category.findOrCreate({
        where: { name: categoryName },
        defaults: { name: categoryName }
      });
      
      if (created) {
        console.log(`Category ${categoryName} created`);
      } else {
        console.log(`Category ${categoryName} already exists`);
      }
    } catch (error) {
      console.error(`Error seeding category ${categoryName}:`, error);
    }
  }
  console.log('Categories seeded successfully');
}