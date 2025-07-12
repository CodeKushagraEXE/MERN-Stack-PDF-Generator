import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddProducts from "./pages/AddProducts";
import InvoicePreview from "./pages/InvoicePreview";
import Invoices from "./pages/Invoices";
import { InvoiceProvider } from "./context/InvoiceContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <InvoiceProvider>
      <Router>
        {/* Show Navbar on all pages except Login and Signup */}
        {window.location.pathname !== "/" && window.location.pathname !== "/signup" && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/invoice-preview" element={<InvoicePreview />} />
          <Route path="/invoices" element={<Invoices />} />
        </Routes>
      </Router>
    </InvoiceProvider>
  );
}

export default App;
