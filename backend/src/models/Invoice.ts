import mongoose, { Document, Schema } from 'mongoose';

interface IProduct {
  name: string;
  qty: number;
  rate: number;
  total: number;
}

export interface IInvoice extends Document {
  user: mongoose.Types.ObjectId;
  products: IProduct[];
  total: number;
  gst: number;
  grandTotal: number;
  createdAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  rate: { type: Number, required: true },
  total: { type: Number, required: true },
});

const InvoiceSchema = new Schema<IInvoice>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [ProductSchema],
  total: { type: Number, required: true },
  gst: { type: Number, required: true },
  grandTotal: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IInvoice>('Invoice', InvoiceSchema);
