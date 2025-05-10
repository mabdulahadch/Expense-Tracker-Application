import express from 'express';
const router = express.Router();

import { setBudget, getBudgets } from '../Controller/Budget.js';

router.post('/', setBudget);
router.get('/', getBudgets);


export default router;