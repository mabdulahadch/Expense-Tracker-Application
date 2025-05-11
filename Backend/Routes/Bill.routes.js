import express from 'express';
import * as billController from '../Controller/Bill.js';


const router = express.Router();


// Basic CRUD
router.post('/', billController.addBill);
router.get('/', billController.getBills);
router.delete('/:id', billController.deleteBill);
router.get('/spending', billController.getSpendingByCategory);
router.get('/single/:id', billController.getSingleBill);
//http://localhost:5000/api/bills/single/681f63ff151c46dccb7507c1

router.get('/recent', billController.getRecentBills);
router.get('/count/expenses', billController.countExpenses);
router.get('/distinct/amount', billController.getDistinctBillAmount);
// http://localhost:5000/api/bills/distinct/amount


router.post('/bulk', billController.addBillsBulk);
router.get('/paged', billController.getPagedBills);
router.post('/bulk-write', billController.importBills);

// Admin/debug/test only
router.post('/rename-collection', billController.renameBillsCollection);
router.delete('/drop-collection', billController.dropBills);
router.get('/list-collections', billController.listCollections);



export default router;
