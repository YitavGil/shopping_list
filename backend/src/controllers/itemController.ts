import { Request, Response } from 'express';
import { ItemModel } from '../models';

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await ItemModel.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await ItemModel.findByPk(Number(id));
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const { name, categoryId, quantity = 1 } = req.body;
    if (!name || !categoryId) {
      return res.status(400).json({ message: 'Name and categoryId are required' });
    }
    const newItem = await ItemModel.create(name, Number(categoryId), Number(quantity));
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ message: 'Error creating item' });
  }
};

export const createMultipleItems = async (req: Request, res: Response) => {
  try {
    const items = req.body;
    const createdItems = await ItemModel.bulkCreate(items);
    res.status(201).json(createdItems);
  } catch (error) {
    res.status(500).json({ message: 'Error creating items', error });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    
    if (quantity === undefined || isNaN(quantity) || quantity < 1) {
      return res.status(400).json({ message: 'Invalid quantity provided' });
    }

    const item = await ItemModel.findByPk(Number(id));
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const [updated, items] = await ItemModel.update(Number(id), item.name, item.categoryId, Number(quantity));
    
    if (updated > 0) {
      res.json(items[0]);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Error updating item', error });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await ItemModel.destroy(Number(id));
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
};