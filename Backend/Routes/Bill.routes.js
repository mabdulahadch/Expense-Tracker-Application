import express from 'express';
import * as billController from '../Controller/Bill.js';


const router = express.Router();


// Basic CRUD
router.post('/', billController.addBill);
router.get('/', billController.getBills);
router.delete('/:id', billController.deleteBill);
router.get('/spending', billController.getSpendingByCategory);
router.get('/single/:id', billController.getSingleBill);
//api/bills/single/681f63ff151c46dccb7507c1

router.get('/recent', billController.getRecentBills);
router.get('/count/expenses', billController.countExpenses);
router.get('/distinct/amount', billController.getDistinctBillAmount);
// api/bills/distinct/amount


router.post('/bulk', billController.addBillsBulk);
router.get('/paged', billController.getPagedBills);
router.post('/bulk-write', billController.importBills);
// api/bills/bulk-write

// Admin/debug/test only
router.post('/rename-collection', billController.renameBillsCollection);
// api/bills/rename-collection
router.delete('/drop-collection', billController.dropBills);
// api/bills/drop-collection
router.get('/list-collections', billController.listCollections);
// api/bills/list-collections


export default router;
