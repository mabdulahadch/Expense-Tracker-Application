import express from 'express';
const router = express.Router();
import { addCategory, getCategories, renameCategory, deleteCategory } from '../Controller/categories.js';


router.post('/',addCategory);
router.get('/', getCategories);
router.put('/:id',renameCategory);
router.delete('/:id',deleteCategory);


export default router;