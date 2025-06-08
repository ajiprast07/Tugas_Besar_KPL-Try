const express = require('express');
const router = express.Router();
const TransactionController = require('../controllers/TransactionController');

const transactionController = new TransactionController();

router.get('/', (req, res) => transactionController.getAllTransactions(req, res));
router.post('/', (req, res) => transactionController.createTransaction(req, res));

module.exports = router;