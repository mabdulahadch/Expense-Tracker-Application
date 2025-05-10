import express from 'express';
import {addBill, deleteBill, getBills, getSpendingByCategory} from '../Controller/Bill.js';


const router = express.Router();


router.post('/', addBill);
router.get('/', getBills);
router.delete('/:id', deleteBill);
router.get('/spending', getSpendingByCategory);


export default router;