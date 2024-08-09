import { sql } from '../config/database';

export interface Item {
  id: number;
  name: string;
  categoryId: number;
}

export class ItemModel {
  static async findAll(): Promise<Item[]> {
    const result = await sql.query`SELECT * FROM Items`;
    return result.recordset;
  }

  static async findByPk(id: number): Promise<Item | null> {
    const result = await sql.query`SELECT * FROM Items WHERE id = ${id}`;
    return result.recordset[0] || null;
  }

  static async create(name: string, categoryId: number): Promise<Item> {
    try {
      console.log('Attempting to create item:', { name, categoryId });
      const result = await sql.query`
        INSERT INTO Items (name, categoryId) 
        OUTPUT INSERTED.* 
        VALUES (${name}, ${categoryId})
      `;
      console.log('SQL query result:', result);
      if (result.recordset && result.recordset.length > 0) {
        return result.recordset[0];
      } else {
        throw new Error('Item was not inserted correctly');
      }
    } catch (error) {
      console.error('Error in ItemModel.create:', error);
      throw error;
    }
  }

  static async bulkCreate(items: Omit<Item, 'id'>[]): Promise<Item[]> {
    const table = new sql.Table('Items');
    table.create = true;
    table.columns.add('name', sql.VarChar(255), {nullable: false});
    table.columns.add('categoryId', sql.Int, {nullable: false});
    
    items.forEach(item => {
      table.rows.add(item.name, item.categoryId);
    });

    await sql.query`INSERT INTO Items (name, categoryId) SELECT name, categoryId FROM @${table}`;
    
    return this.findAll(); // Return all items after bulk insert
  }

  static async update(id: number, name: string, categoryId: number): Promise<[number, Item[]]> {
    const result = await sql.query`UPDATE Items SET name = ${name}, categoryId = ${categoryId} OUTPUT INSERTED.* WHERE id = ${id}`;
    return [result.rowsAffected[0], result.recordset];
  }

  static async destroy(id: number): Promise<number> {
    const result = await sql.query`DELETE FROM Items WHERE id = ${id}`;
    return result.rowsAffected[0];
  }
}