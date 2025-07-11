import React from "react";

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-md flex flex-col items-center">
        {/* Logo Placeholder */}
        <div className="mb-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-2">
            PDF
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold mb-6 text-center text-gray-800 dark:text-white leading-tight">Sign in to your account</h1>
        <form className="flex flex-col gap-4 w-full">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition w-full mt-2 shadow-md"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-gray-500 dark:text-gray-400 text-sm text-center">
          Don&apos;t have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login; 