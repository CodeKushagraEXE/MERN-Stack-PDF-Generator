import React, { useState } from "react";
import { useInvoice } from "../context/InvoiceContext";
import { useNavigate } from "react-router-dom";

const AddProducts: React.FC = () => {
  const { products, addProduct, removeProduct, setInvoiceData } = useInvoice();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !quantity) return;
    addProduct({ name, price: Number(price), quantity: Number(quantity) });
    setName("");
    setPrice("");
    setQuantity("");
  };

  const subTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const gst = +(subTotal * 0.18).toFixed(2);
  const grandTotal = +(subTotal + gst).toFixed(2);

  const handleGenerateInvoice = () => {
    setInvoiceData({
      name: "Person_name", // You can update this to get from user input
      email: "example@email.com", // You can update this to get from user input
      date: new Date().toLocaleDateString(),
      products,
      gst,
      total: subTotal,
      grandTotal,
    });
    navigate("/invoice-preview");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#181A20] overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-0 top-0 w-2/3 h-full bg-gradient-to-br from-[#23272F] via-[#23272F]/80 to-transparent" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-[#23272F] via-[#23272F]/80 to-transparent" />
        <div className="absolute left-0 bottom-0 w-2/5 h-2/5 bg-gradient-radial from-[#A3E635]/40 via-transparent to-transparent opacity-80" />
      </div>
      <div className="relative z-10 flex flex-col w-full max-w-6xl mx-auto rounded-3xl shadow-2xl overflow-hidden border border-[#2A2D34] bg-[#181A20]/90">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-[#23272F] bg-[#181A20]/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-lg">&#60;/&#62;</span>
            </div>
            <span className="text-white text-lg font-semibold">levitation <span className="text-xs font-light">infotech</span></span>
          </div>
          <button className="px-5 py-1 rounded border border-[#A3E635] text-[#23272F] text-xs font-medium bg-[#A3E635] hover:bg-[#23272F] hover:text-[#A3E635] transition shadow-md shadow-[#A3E635]/30">Logout</button>
        </div>
        {/* Content */}
        <div className="flex flex-col w-full p-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Add Products</h1>
          <p className="text-gray-300 mb-8 text-base">This is basic login page which is used for levitation assignment purpose.</p>
          {/* Product Entry Form */}
          <form className="flex flex-col md:flex-row gap-4 mb-8" onSubmit={handleAdd}>
            <input
              type="text"
              placeholder="Enter the product name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="flex-1 border border-[#23272F] rounded-lg px-4 py-2 bg-[#23272F] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
            />
            <input
              type="number"
              placeholder="Enter the price"
              value={price}
              onChange={e => setPrice(e.target.value)}
              className="flex-1 border border-[#23272F] rounded-lg px-4 py-2 bg-[#23272F] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
            />
            <input
              type="number"
              placeholder="Enter the Qty"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              className="flex-1 border border-[#23272F] rounded-lg px-4 py-2 bg-[#23272F] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-[#23272F] text-[#A3E635] border border-[#A3E635] rounded-lg font-semibold hover:bg-[#A3E635] hover:text-[#23272F] transition flex items-center gap-2"
            >
              Add Product <span className="text-lg">➕</span>
            </button>
          </form>
          {/* Product Table */}
          <div className="overflow-x-auto rounded-xl mb-8">
            <table className="min-w-full text-sm text-left text-gray-400">
              <thead className="bg-white text-gray-900">
                <tr>
                  <th className="px-6 py-3 rounded-tl-xl">Product name</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3">Total Price</th>
                  <th className="px-6 py-3 rounded-tr-xl"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-[#23272F]/60" : "bg-white/10"}>
                    <td className="px-6 py-3 italic">({p.name})</td>
                    <td className="px-6 py-3">{p.price}</td>
                    <td className="px-6 py-3">{p.quantity}</td>
                    <td className="px-6 py-3">INR {p.price * p.quantity}</td>
                    <td className="px-6 py-3">
                      <button onClick={() => removeProduct(i)} className="text-red-400 hover:underline">Remove</button>
                    </td>
                  </tr>
                ))}
                {/* Totals */}
                <tr className="bg-white">
                  <td colSpan={3} className="px-6 py-3 text-right font-semibold">Sub-Total</td>
                  <td className="px-6 py-3 font-semibold">INR {subTotal}</td>
                  <td></td>
                </tr>
                <tr className="bg-white">
                  <td colSpan={3} className="px-6 py-3 text-right font-semibold">Incl + GST 18%</td>
                  <td className="px-6 py-3 font-semibold">INR {grandTotal}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Generate PDF Invoice Button */}
          <button
            className="w-full py-3 rounded-xl bg-[#23272F] text-[#A3E635] font-semibold text-lg shadow-md shadow-[#A3E635]/20 hover:bg-[#A3E635] hover:text-[#23272F] transition disabled:opacity-50"
            disabled={products.length === 0}
            onClick={handleGenerateInvoice}
          >
            Generate PDF Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProducts; 