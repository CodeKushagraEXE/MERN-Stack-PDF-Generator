import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/add-products", label: "Add Products" },
  { to: "/invoice-preview", label: "Invoice Preview" },
  { to: "/invoices", label: "Invoices" },
];

export default function Navbar() {
  const location = useLocation();
  // Dummy auth check (replace with real auth logic if available)
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="w-full bg-[#181B20] border-b border-[#23262B] px-8 py-3 flex items-center justify-between rounded-t-2xl">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="bg-[#23262B] rounded-full p-2">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="#A3E635" d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          </span>
          levitation <span className="text-xs font-normal text-gray-400 ml-1">infotech</span>
        </span>
      </div>
      <div className="flex items-center gap-6">
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`text-base font-medium px-3 py-1 rounded transition-colors duration-200 ${location.pathname === link.to ? "text-[#A3E635]" : "text-gray-200 hover:text-[#A3E635]"}`}
          >
            {link.label}
          </Link>
        ))}
        {!isLoggedIn ? (
          <>
            <Link to="/" className="text-base font-medium px-3 py-1 rounded text-gray-200 hover:text-[#A3E635]">Login</Link>
            <Link to="/signup" className="text-base font-medium px-3 py-1 rounded text-gray-200 hover:text-[#A3E635]">Signup</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-1 bg-[#A3E635] text-[#181B20] font-semibold rounded hover:bg-[#baff39] transition-colors duration-200"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
} 