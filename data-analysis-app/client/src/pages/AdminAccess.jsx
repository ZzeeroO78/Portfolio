import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";
import { FiShield, FiKey } from "react-icons/fi";

const AdminAccess = () => {
  const [masterKey, setMasterKey] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/admin-master", { masterKey });
      localStorage.setItem("token", res.data.token);
      toast.success("🔓 Master pristup odobren!");
      window.location.href = "/dashboard"; // Full reload da se učita user
    } catch (error) {
      toast.error(error.response?.data?.message || "Pristup odbijen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-8 border border-gray-700">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-900 rounded-full mb-4">
            <FiShield className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Pristup</h1>
          <p className="text-gray-400 mt-2">Unesite master ključ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Master Ključ
            </label>
            <div className="relative">
              <FiKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                value={masterKey}
                onChange={(e) => setMasterKey(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                placeholder="••••••••••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Provjera..." : "Pristupi"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-500 text-sm">
          ⚠️ Ova stranica je samo za administratora
        </p>
      </div>
    </div>
  );
};

export default AdminAccess;
