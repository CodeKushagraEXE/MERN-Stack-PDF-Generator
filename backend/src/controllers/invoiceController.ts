import { Request, Response } from 'express';
import Invoice from '../models/Invoice';
import { AuthRequest } from '../middlewares/auth';
import { generateInvoicePDF } from '../utils/pdf';

export const createInvoice = async (req: AuthRequest, res: Response) => {
  try {
    const { products } = req.body;
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Products are required' });
    }
    // Calculate totals
    const total = products.reduce((sum, p) => sum + (p.qty * p.rate), 0);
    const gst = +(total * 0.18).toFixed(2);
    const grandTotal = +(total + gst).toFixed(2);
    const invoice = await Invoice.create({
      user: req.user.id,
      products: products.map((p: any) => ({ ...p, total: p.qty * p.rate })),
      total,
      gst,
      grandTotal,
    });
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getInvoices = async (req: AuthRequest, res: Response) => {
  try {
    const invoices = await Invoice.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getInvoicePDF = async (req: AuthRequest, res: Response) => {
  try {
    const invoice = await Invoice.findOne({ _id: req.params.id, user: req.user.id }).populate('user');
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });
    const pdfBuffer = await generateInvoicePDF(invoice);
    res.set({ 'Content-Type': 'application/pdf', 'Content-Disposition': 'attachment; filename=invoice.pdf' });
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
