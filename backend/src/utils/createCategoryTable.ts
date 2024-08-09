import { sql } from '../config/database';

export async function createCategoriesTable() {
  try {
    // Check if the table exists
    const tableExists = await sql.query`
      IF EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Categories')
      SELECT 1 AS TableExists
      ELSE
      SELECT 0 AS TableExists
    `;

    if (tableExists.recordset[0].TableExists === 0) {
      // Table doesn't exist, so create it
      await sql.query`
        CREATE TABLE Categories (
          id INT PRIMARY KEY IDENTITY(1,1),
          name NVARCHAR(100) NOT NULL
        )
      `;
      console.log('Categories table created successfully');
    } else {
      console.log('Categories table already exists');
    }
  } catch (error) {
    console.error('Error checking/creating Categories table:', error);
  }
}