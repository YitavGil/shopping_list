import { Request, Response } from 'express';
import { Item } from '../models';

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await Item.findByPk(Number(id));
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
    const newItem = await Item.create({ name, categoryId: Number(categoryId), quantity: Number(quantity) });
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ message: 'Error creating item' });
  }
};

export const createMultipleItems = async (req: Request, res: Response) => {
  try {
    const items = req.body;
    const createdItems = await Item.bulkCreate(items);
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

    const [updated] = await Item.update({ quantity: Number(quantity) }, { where: { id: Number(id) } });
    
    if (updated > 0) {
      const updatedItem = await Item.findByPk(Number(id));
      res.json(updatedItem);
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
    const deleted = await Item.destroy({ where: { id: Number(id) } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item', error });
  }
};