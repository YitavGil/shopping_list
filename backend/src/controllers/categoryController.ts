import { Request, Response } from 'express';
import { CategoryModel } from '../models';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findByPk(Number(id));
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newCategory = await CategoryModel.create(name);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const [updated, categories] = await CategoryModel.update(Number(id), name);
    if (updated > 0) {
      res.json(categories[0]);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await CategoryModel.destroy(Number(id));
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};