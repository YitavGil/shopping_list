import { sql } from '../config/database';

export interface Category {
  id: number;
  name: string;
}

export class CategoryModel {
  static async findAll(): Promise<Category[]> {
    const result = await sql.query`SELECT * FROM Categories`;
    return result.recordset;
  }

  static async findByPk(id: number): Promise<Category | null> {
    const result = await sql.query`SELECT * FROM Categories WHERE id = ${id}`;
    return result.recordset[0] || null;
  }

  static async create(name: string): Promise<Category> {
    const result = await sql.query`INSERT INTO Categories (name) OUTPUT INSERTED.* VALUES (${name})`;
    return result.recordset[0];
  }

  static async update(id: number, name: string): Promise<[number, Category[]]> {
    const result = await sql.query`UPDATE Categories SET name = ${name} OUTPUT INSERTED.* WHERE id = ${id}`;
    return [result.rowsAffected[0], result.recordset];
  }

  static async destroy(id: number): Promise<number> {
    const result = await sql.query`DELETE FROM Categories WHERE id = ${id}`;
    return result.rowsAffected[0];
  }
}