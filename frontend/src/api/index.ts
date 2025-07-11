const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5050/api";

export const register = async (name: string, email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
};

export const login = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const setToken = (token: string) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");

const authHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createInvoice = async (products: any[]) => {
  const headers = { "Content-Type": "application/json", ...authHeader() } as Record<string, string>;
  const res = await fetch(`${API_URL}/invoice`, {
    method: "POST",
    headers,
    body: JSON.stringify({ products }),
  });
  return res.json();
};

export const getInvoices = async () => {
  const headers = { ...authHeader() } as Record<string, string>;
  const res = await fetch(`${API_URL}/invoice`, {
    headers,
  });
  return res.json();
};

export const getInvoicePDF = async (id: string) => {
  const headers = { ...authHeader() } as Record<string, string>;
  const res = await fetch(`${API_URL}/invoice/${id}/pdf`, {
    headers,
  });
  return res;
}; 