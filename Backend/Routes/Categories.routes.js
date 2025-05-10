import express from 'express';
import * as categoryController from '../controller/Categories.js';

const router = express.Router();

// CRUD
router.post('/', categoryController.addCategory);
router.get('/', categoryController.getCategories);
router.put('/:id', categoryController.renameCategory);
router.put('/replace/:id', categoryController.findAndReplaceCategory);
router.delete('/:id', categoryController.deleteCategory);

// Index Operations
router.post('/index', categoryController.createCategoryNameIndex);
router.delete('/index', categoryController.dropCategoryNameIndex);
router.get('/index', categoryController.getCategoryIndexes);


export default router;
