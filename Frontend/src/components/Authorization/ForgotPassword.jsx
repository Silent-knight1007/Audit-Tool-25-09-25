import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Password reset link sent to your email.", { position: "top-center" });
      } else {
        toast.error(data.message || "Error sending reset link.", { position: "top-center" });
      }
    } catch (error) {
      toast.error("Network error. Please try again.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-white p-4 pt-24">
      <div className="w-full max-w-md mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-red-800 p-8 rounded-2xl shadow-xl w-full"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-red-700">Forgot Password</h2>

          <div className="mb-3">
            <label htmlFor="email" className="block text-red-700 mb-1 font-bold">
              Enter your registered email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded text-black font-bold border border-red-700 focus:outline-none focus:border-red-700 transition bg-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-700 text-lg hover:bg-red-500 text-white font-bold py-2 rounded transition shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
