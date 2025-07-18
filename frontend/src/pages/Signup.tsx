import React, { useState } from "react";
import ImageSlider from "../components/ImageSlider";
import { register } from "../api";
import { useNavigate } from "react-router-dom";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await register(name, email, password);
    if (res.message && res.message.toLowerCase().includes("success")) {
      setSuccess("Registration successful! Please login.");
      setTimeout(() => navigate("/"), 1200);
    } else {
      setError(res.message || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#181A20] overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-bl from-[#23272F] via-[#23272F]/80 to-transparent" />
        <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-br from-[#23272F] via-[#23272F]/80 to-transparent" />
        <div className="absolute right-0 bottom-0 w-2/5 h-2/5 bg-gradient-radial from-[#A3E635]/60 via-transparent to-transparent opacity-90" />
      </div>
      {/* Main container */}
      <div className="relative z-10 flex flex-col w-full max-w-5xl mx-auto rounded-3xl shadow-2xl overflow-hidden border border-[#2A2D34] bg-[#181A20]/90 backdrop-blur-md shadow-[#A3E635]/10">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-[#23272F] bg-[#181A20]/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-lg">&#60;/&#62;</span>
            </div>
            <span className="text-white text-lg font-semibold">levitation <span className="text-xs font-light">infotech</span></span>
          </div>
          <a href="/" className="px-5 py-1 rounded border border-[#A3E635] text-[#A3E635] text-xs font-medium bg-transparent hover:bg-[#A3E635] hover:text-[#23272F] transition shadow-md shadow-[#A3E635]/30">Login</a>
        </div>
        {/* Content */}
        <div className="flex flex-col md:flex-row w-full">
          {/* Left: Signup Form */}
          <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 md:p-16">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Sign up to begin journey</h1>
            <p className="text-gray-300 mb-6 text-base">This is basic signup page which is used for levitation assignment purpose.</p>
            <form className="flex flex-col gap-4 w-full max-w-md" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-300 mb-1">Enter your name</label>
                <input type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} className="border border-[#23272F] rounded-lg px-4 py-2 w-full bg-[#23272F] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#A3E635]" />
                <span className="text-xs text-gray-400">This name will be displayed with your inquiry</span>
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Email Address</label>
                <input type="email" placeholder="Enter Email ID" value={email} onChange={e => setEmail(e.target.value)} className="border border-[#23272F] rounded-lg px-4 py-2 w-full bg-[#23272F] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#A3E635]" />
                <span className="text-xs text-gray-400">This email will be displayed with your inquiry</span>
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Password</label>
                <input type="password" placeholder="Enter the Password" value={password} onChange={e => setPassword(e.target.value)} className="border border-[#23272F] rounded-lg px-4 py-2 w-full bg-[#23272F] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#A3E635]" />
                <span className="text-xs text-gray-400">Any further updates will be forwarded on this Email ID</span>
              </div>
              {error && <div className="text-red-400 text-sm text-center">{error}</div>}
              {success && <div className="text-green-400 text-sm text-center">{success}</div>}
              <button type="submit" className="bg-[#A3E635] text-[#23272F] py-2 rounded-lg font-semibold hover:bg-[#B9FBC0] transition w-full mt-2 shadow-md">Register</button>
            </form>
            <div className="mt-6 text-gray-400 text-sm text-center w-full">
              Already have account ? <a href="/" className="text-[#A3E635] hover:underline">Login</a>
            </div>
          </div>
          {/* Right: Image Slider */}
          <div className="hidden md:flex w-1/2 items-center justify-center bg-black rounded-r-3xl overflow-hidden p-8">
            <div className="w-full h-full flex items-center justify-center">
              <ImageSlider rounded="rounded-r-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup; 