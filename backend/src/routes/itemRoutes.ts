import express from 'express';
import * as itemController from '../controllers/itemController';

const router = express.Router();

router.get('/', itemController.getItems);
router.get('/:id', itemController.getItemById);
router.post('/', itemController.createItem);
router.post('/multiple', itemController.createMultipleItems);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);

export default router;