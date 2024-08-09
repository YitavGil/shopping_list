import { sql } from '../config/database';

export async function createItemsTable() {
  try {
    await sql.query`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Items' and xtype='U')
      CREATE TABLE Items (
        id INT PRIMARY KEY IDENTITY(1,1),
        name NVARCHAR(255) NOT NULL,
        categoryId INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        FOREIGN KEY (categoryId) REFERENCES Categories(id)
      )
    `;
    console.log('Items table created successfully');
  } catch (error) {
    console.error('Error creating Items table:', error);
  }
}