import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  FiDollarSign,
  FiShoppingCart,
  FiTrendingUp,
  FiPackage,
  FiDownload,
  FiCalendar,
  FiRefreshCw,
} from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { user, hasMinRole } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      if (hasMinRole("menadjer")) {
        const res = await api.get("/data/stats");
        setStats(res.data.stats);
      }
    } catch (error) {
      toast.error("Greška pri učitavanju statistike");
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const params = new URLSearchParams();
      if (dateRange.startDate) params.append("startDate", dateRange.startDate);
      if (dateRange.endDate) params.append("endDate", dateRange.endDate);

      const response = await api.get(`/data/export?${params.toString()}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `sales_export_${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Podaci uspješno exportovani!");
    } catch (error) {
      toast.error("Greška pri exportu podataka");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("hr-HR", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("hr-HR").format(num);
  };

  // Chart data
  const categoryChartData = {
    labels: stats?.salesByCategory?.map((c) => c.category) || [],
    datasets: [
      {
        data: stats?.salesByCategory?.map((c) => c.total) || [],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
        ],
        borderWidth: 0,
      },
    ],
  };

  const monthlyChartData = {
    labels:
      stats?.salesByMonth?.map((m) => {
        const [year, month] = m.month.split("-");
        const monthNames = [
          "Sij",
          "Velj",
          "Ožu",
          "Tra",
          "Svi",
          "Lip",
          "Srp",
          "Kol",
          "Ruj",
          "Lis",
          "Stu",
          "Pro",
        ];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
      }) || [],
    datasets: [
      {
        label: "Prodaja po mjesecu",
        data: stats?.salesByMonth?.map((m) => m.total) || [],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const topProductsChartData = {
    labels: stats?.topProducts?.map((p) => p.product_name) || [],
    datasets: [
      {
        label: "Prihod",
        data: stats?.topProducts?.map((p) => p.total) || [],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#F59E0B",
          "#EF4444",
          "#8B5CF6",
        ],
        borderRadius: 8,
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Prikaz za radnika
  if (!hasMinRole("menadjer")) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-4">
            <FiPackage className="w-10 h-10 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Dobrodošli, {user?.username}!
          </h2>
          <p className="text-gray-600 mb-4">
            Vaša uloga:{" "}
            <span className="font-semibold capitalize">{user?.role}</span>
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <p className="text-yellow-800">
              Za pristup statistikama i izvještajima potrebna je uloga{" "}
              <strong>Menadžer</strong> ili viša.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Izračunaj dodatne metrike
  const avgTransaction =
    stats?.transactionCount > 0 ? stats.totalSales / stats.transactionCount : 0;

  const totalQuantity =
    stats?.salesByCategory?.reduce((sum, c) => sum + c.quantity, 0) || 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header sa akcijama */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Pregled prodajnih statistika</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <FiCalendar className="text-gray-400" />
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, startDate: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
            />
            <span className="text-gray-400">-</span>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, endDate: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            onClick={loadStats}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            <FiRefreshCw className="w-4 h-4" /> Osvježi
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <FiDownload className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ukupna Prodaja"
          value={formatCurrency(stats?.totalSales || 0)}
          icon={FiDollarSign}
          color="blue"
          trend="+12.5%"
        />
        <StatCard
          title="Broj Transakcija"
          value={formatNumber(stats?.transactionCount || 0)}
          icon={FiShoppingCart}
          color="green"
          trend="+8.2%"
        />
        <StatCard
          title="Prosječna Transakcija"
          value={formatCurrency(avgTransaction)}
          icon={FiTrendingUp}
          color="purple"
          trend="+4.1%"
        />
        <StatCard
          title="Prodanih Jedinica"
          value={formatNumber(totalQuantity)}
          icon={FiPackage}
          color="orange"
          trend="+15.3%"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Trend Prodaje
          </h3>
          <Line
            data={monthlyChartData}
            options={{
              maintainAspectRatio: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: { color: "rgba(0,0,0,0.05)" },
                },
                x: {
                  grid: { display: false },
                },
              },
            }}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Prodaja po Kategoriji
          </h3>
          <div className="h-64 flex items-center justify-center">
            <Doughnut
              data={categoryChartData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { padding: 20 },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Top Products & Category Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Top 5 Proizvoda
          </h3>
          <Bar
            data={topProductsChartData}
            options={{
              indexAxis: "y",
              maintainAspectRatio: true,
              plugins: {
                legend: { display: false },
              },
              scales: {
                x: { grid: { color: "rgba(0,0,0,0.05)" } },
                y: { grid: { display: false } },
              },
            }}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Pregled po Kategorijama
          </h3>
          <div className="space-y-4">
            {stats?.salesByCategory?.map((cat, index) => {
              const colors = [
                "bg-blue-500",
                "bg-green-500",
                "bg-yellow-500",
                "bg-red-500",
                "bg-purple-500",
              ];
              const percentage =
                stats.totalSales > 0 ? (cat.total / stats.totalSales) * 100 : 0;
              return (
                <div key={cat.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">
                      {cat.category}
                    </span>
                    <span className="text-gray-500">
                      {formatCurrency(cat.total)} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors[index % colors.length]} rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponenta za stat kartice
const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          {trend && (
            <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
              <FiTrendingUp className="w-3 h-3" /> {trend} od prošlog mjeseca
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
