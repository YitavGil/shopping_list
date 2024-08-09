import { sql } from '../config/database';

export interface Item {
  id: number;
  name: string;
  categoryId: number;
  quantity: number;
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

  static async create(name: string, categoryId: number, quantity: number = 1): Promise<Item> {
    try {
      const result = await sql.query`
        INSERT INTO Items (name, categoryId, quantity) 
        OUTPUT INSERTED.* 
        VALUES (${name}, ${categoryId}, ${quantity})
      `;
      return result.recordset[0];
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
    table.columns.add('quantity', sql.Int, {nullable: false});
    
    items.forEach(item => {
      table.rows.add(item.name, item.categoryId, item.quantity);
    });

    await sql.query`INSERT INTO Items (name, categoryId, quantity) SELECT name, categoryId, quantity FROM ${table}`;
    
    return this.findAll();
  }

  static async update(id: number, name: string, categoryId: number, quantity: number): Promise<[number, Item[]]> {
    const result = await sql.query`
      UPDATE Items 
      SET name = ${name}, categoryId = ${categoryId}, quantity = ${quantity} 
      OUTPUT INSERTED.* 
      WHERE id = ${id}
    `;
    return [result.rowsAffected[0], result.recordset];
  }

  static async destroy(id: number): Promise<number> {
    const result = await sql.query`DELETE FROM Items WHERE id = ${id}`;
    return result.rowsAffected[0];
  }
}