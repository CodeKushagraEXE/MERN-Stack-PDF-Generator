import React, { useEffect, useState } from "react";
import { getInvoices, getInvoicePDF } from "../api";

interface Invoice {
  _id: string;
  products: any[];
  total: number;
  gst: number;
  grandTotal: number;
  createdAt: string;
}

const Invoices: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getInvoices()
      .then(res => {
        if (Array.isArray(res)) {
          setInvoices(res);
        } else {
          setError(res.message || "Failed to fetch invoices");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch invoices");
        setLoading(false);
      });
  }, []);

  const handleDownloadPDF = async (id: string) => {
    const res = await getInvoicePDF(id);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "invoice.pdf";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A20] py-12">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-[#23272F]">Your Invoices</h2>
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : invoices.length === 0 ? (
          <div className="text-gray-500">No invoices found.</div>
        ) : (
          <table className="w-full mb-6 rounded-xl overflow-hidden text-sm">
            <thead>
              <tr className="bg-[#23272F] text-white">
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Products</th>
                <th className="py-2 px-4 text-left">Total</th>
                <th className="py-2 px-4 text-left">GST</th>
                <th className="py-2 px-4 text-left">Grand Total</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv._id} className="bg-white border-b last:border-b-0">
                  <td className="py-2 px-4">{new Date(inv.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{inv.products.length}</td>
                  <td className="py-2 px-4">₹ {inv.total}</td>
                  <td className="py-2 px-4">₹ {inv.gst}</td>
                  <td className="py-2 px-4 font-bold">₹ {inv.grandTotal}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button className="px-3 py-1 rounded bg-[#23272F] text-[#A3E635] hover:bg-[#A3E635] hover:text-[#23272F] transition" onClick={() => handleDownloadPDF(inv._id)}>
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Invoices; 