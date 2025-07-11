import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export interface InvoiceData {
  name: string;
  email: string;
  date: string;
  products: Product[];
  gst: number;
  total: number;
  grandTotal: number;
}

interface InvoiceContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (index: number) => void;
  clearProducts: () => void;
  invoiceData: InvoiceData | null;
  setInvoiceData: (data: InvoiceData) => void;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) throw new Error("useInvoice must be used within InvoiceProvider");
  return context;
};

export const InvoiceProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  const addProduct = (product: Product) => setProducts((prev) => [...prev, product]);
  const removeProduct = (index: number) => setProducts((prev) => prev.filter((_, i) => i !== index));
  const clearProducts = () => setProducts([]);

  return (
    <InvoiceContext.Provider
      value={{ products, addProduct, removeProduct, clearProducts, invoiceData, setInvoiceData }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}; 