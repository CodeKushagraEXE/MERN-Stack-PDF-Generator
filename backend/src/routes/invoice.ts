import express from 'express';
import { createInvoice, getInvoices, getInvoicePDF } from '../controllers/invoiceController';
import { protect } from '../middlewares/auth';

const router = express.Router();

router.post('/', protect, createInvoice);
router.get('/', protect, getInvoices);
router.get('/:id/pdf', protect, getInvoicePDF);

export default router;
