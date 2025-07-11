import React, { useEffect, useState } from "react";
import { useInvoice } from "../context/InvoiceContext";
import { useNavigate } from "react-router-dom";
import { createInvoice } from "../api";

function formatDate(dateStr: string) {
  const [month, day, year] = new Date(dateStr).toLocaleDateString().split("/");
  if (Number(month) > 12) {
    return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
  } else {
    return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
  }
}

const InvoicePreview: React.FC = () => {
  const { invoiceData } = useInvoice();
  const navigate = useNavigate();
  const [apiStatus, setApiStatus] = useState<string>("");

  useEffect(() => {
    if (invoiceData && invoiceData.products.length > 0) {
      setApiStatus("");
      createInvoice(invoiceData.products)
        .then(res => {
          if (res._id) {
            setApiStatus("Invoice saved to backend.");
          } else {
            setApiStatus("Failed to save invoice to backend.");
          }
        })
        .catch(() => setApiStatus("Failed to save invoice to backend."));
    }
  }, [invoiceData]);

  if (!invoiceData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A20] py-12">
        <div className="text-white text-xl mb-4">No invoice data found.</div>
        <button className="px-6 py-2 rounded-xl bg-[#23272F] text-[#A3E635] font-semibold text-lg shadow-md shadow-[#A3E635]/20 hover:bg-[#A3E635] hover:text-[#23272F] transition" onClick={() => navigate("/add-products")}>Go to Add Products</button>
      </div>
    );
  }

  const { name, email, date, products, gst, total, grandTotal } = invoiceData;
  const formattedDate = formatDate(date);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#181A20] py-12">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8 flex flex-col items-center">
        {/* Header */}
        <div className="flex justify-between items-center w-full mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">&#60;/&#62;</span>
            </div>
            <span className="text-black text-lg font-semibold">Levitation <span className="text-xs font-light">infotech</span></span>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 font-semibold">INVOICE GENERATOR</div>
          </div>
        </div>
        {/* Name/Email/Date */}
        <div className="flex justify-between items-center w-full bg-gradient-to-r from-[#23272F] via-[#23272F] to-[#A3E635] rounded-lg px-6 py-3 mb-4">
          <div className="text-white font-semibold">
            <div className="text-xs text-gray-300">Name</div>
            <div className="text-lg font-bold">{name}</div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-xs text-gray-300">Date : {formattedDate}</div>
            <div className="bg-white text-black px-4 py-1 rounded-lg font-semibold text-sm mt-1">{email}</div>
          </div>
        </div>
        {/* Product Table */}
        <table className="w-full mb-6 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-[#23272F] text-white">
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4 text-left">Qty</th>
              <th className="py-2 px-4 text-left">Rate</th>
              <th className="py-2 px-4 text-left">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                <td className="py-2 px-4 italic">({p.name})</td>
                <td className="py-2 px-4">{p.quantity}</td>
                <td className="py-2 px-4">₹ {p.price}</td>
                <td className="py-2 px-4">₹ {p.price * p.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Totals */}
        <div className="flex justify-end w-full mb-8">
          <div className="bg-white border rounded-lg p-4 w-64">
            <div className="flex justify-between mb-2 text-gray-700">
              <span>Total Charges</span>
              <span>₹ {total}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-700">
              <span>GST (18%)</span>
              <span>₹ {gst}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total Amount</span>
              <span className="text-blue-600">₹ {grandTotal}</span>
            </div>
          </div>
        </div>
        {/* Footer note */}
        <div className="w-full flex justify-center mt-8">
          <div className="bg-[#23272F] text-white rounded-full px-8 py-3 text-xs text-center max-w-xl">
            We are pleased to provide any further information you may require and look forward to assisting with your next order. Best assured, it will receive our prompt and dedicated attention.
          </div>
        </div>
        {/* Date at bottom */}
        <div className="w-full text-xs text-gray-400 mt-4 text-left">Date: {formattedDate}</div>
        {apiStatus && <div className="text-green-500 text-sm mt-4">{apiStatus}</div>}
      </div>
      {/* Download PDF Button */}
      <button className="mt-8 px-8 py-3 rounded-xl bg-[#23272F] text-[#A3E635] font-semibold text-lg shadow-md shadow-[#A3E635]/20 hover:bg-[#A3E635] hover:text-[#23272F] transition">
        Download as PDF
      </button>
    </div>
  );
};

export default InvoicePreview; 