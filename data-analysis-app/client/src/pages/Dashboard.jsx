import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
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
  FiTrendingDown,
  FiPackage,
  FiDownload,
  FiCalendar,
  FiRefreshCw,
  FiClock,
  FiPercent,
  FiActivity,
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
  const { lastUpdate, subscribe } = useData();
  const [stats, setStats] = useState(null);
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  // Automatsko osvježavanje svakih 30 sekundi ako je uključeno
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      loadAllData();
    }, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Slušaj promjene podataka iz DataContext
  useEffect(() => {
    const unsubscribe = subscribe(() => {
      console.log("🔄 Auto-refresh triggered by data change");
      loadAllData();
    });
    return unsubscribe;
  }, [subscribe]);

  // Učitaj podatke kad se promijeni lastUpdate
  useEffect(() => {
    loadAllData();
  }, [lastUpdate]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      if (hasMinRole("menadjer")) {
        // Učitaj statistike i sirove podatke paralelno
        const [statsRes, dataRes] = await Promise.all([
          api.get("/data/stats"),
          api.get("/data"),
        ]);
        setStats(statsRes.data.stats);
        setRawData(dataRes.data.data);
        setLastRefresh(new Date());
      }
    } catch (error) {
      toast.error("Greška pri učitavanju podataka");
    } finally {
      setLoading(false);
    }
  };

  // Automatski izračunate metrike iz sirovih podataka
  const calculatedMetrics = useMemo(() => {
    if (!rawData.length) {
      return {
        todaySales: 0,
        weekSales: 0,
        monthSales: 0,
        todayCount: 0,
        avgDailySales: 0,
        bestDay: null,
        bestCategory: null,
        growthRate: 0,
        profitMargin: 0,
      };
    }

    const today = new Date().toISOString().split("T")[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    const twoMonthsAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    // Prodaja danas
    const todayData = rawData.filter((d) => d.date === today);
    const todaySales = todayData.reduce((sum, d) => sum + d.total, 0);
    const todayCount = todayData.length;

    // Prodaja ovaj tjedan
    const weekData = rawData.filter((d) => d.date >= weekAgo);
    const weekSales = weekData.reduce((sum, d) => sum + d.total, 0);

    // Prodaja ovaj mjesec
    const monthData = rawData.filter((d) => d.date >= monthAgo);
    const monthSales = monthData.reduce((sum, d) => sum + d.total, 0);

    // Prodaja prošli mjesec (za usporedbu)
    const lastMonthData = rawData.filter(
      (d) => d.date >= twoMonthsAgo && d.date < monthAgo
    );
    const lastMonthSales = lastMonthData.reduce((sum, d) => sum + d.total, 0);

    // Rast u odnosu na prošli mjesec
    const growthRate =
      lastMonthSales > 0
        ? ((monthSales - lastMonthSales) / lastMonthSales) * 100
        : monthSales > 0
          ? 100
          : 0;

    // Prosječna dnevna prodaja
    const uniqueDays = [...new Set(rawData.map((d) => d.date))].length;
    const avgDailySales =
      uniqueDays > 0
        ? rawData.reduce((sum, d) => sum + d.total, 0) / uniqueDays
        : 0;

    // Najbolji dan
    const salesByDay = rawData.reduce((acc, d) => {
      acc[d.date] = (acc[d.date] || 0) + d.total;
      return acc;
    }, {});
    const bestDayEntry = Object.entries(salesByDay).sort(
      (a, b) => b[1] - a[1]
    )[0];
    const bestDay = bestDayEntry
      ? { date: bestDayEntry[0], total: bestDayEntry[1] }
      : null;

    // Najbolja kategorija
    const salesByCat = rawData.reduce((acc, d) => {
      acc[d.category] = (acc[d.category] || 0) + d.total;
      return acc;
    }, {});
    const bestCatEntry = Object.entries(salesByCat).sort(
      (a, b) => b[1] - a[1]
    )[0];
    const bestCategory = bestCatEntry
      ? { name: bestCatEntry[0], total: bestCatEntry[1] }
      : null;

    return {
      todaySales,
      weekSales,
      monthSales,
      todayCount,
      avgDailySales,
      bestDay,
      bestCategory,
      growthRate,
      lastMonthSales,
    };
  }, [rawData]);

  // Trend podaci za mini grafikon
  const trendData = useMemo(() => {
    if (!rawData.length) return [];

    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];
      const dayTotal = rawData
        .filter((d) => d.date === date)
        .reduce((sum, d) => sum + d.total, 0);
      last7Days.push({ date, total: dayTotal });
    }
    return last7Days;
  }, [rawData]);

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
    }).format(amount || 0);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("hr-HR").format(num || 0);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("hr-HR", {
      day: "numeric",
      month: "short",
    });
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

  // Mini trend chart za kartice
  const miniTrendData = {
    labels: trendData.map((d) => formatDate(d.date)),
    datasets: [
      {
        data: trendData.map((d) => d.total),
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Učitavanje podataka...
          </p>
        </div>
      </div>
    );
  }

  // Prikaz za radnika
  if (!hasMinRole("menadjer")) {
    return (
      <div className="p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-4">
            <FiPackage className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            Dobrodošli, {user?.username}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Vaša uloga:{" "}
            <span className="font-semibold capitalize">{user?.role}</span>
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6">
            <p className="text-yellow-800 dark:text-yellow-200">
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
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <FiClock className="w-4 h-4" />
            Zadnje osvježavanje: {lastRefresh.toLocaleTimeString("hr-HR")}
            {loading && (
              <span className="ml-2 text-primary-600 animate-pulse">
                Osvježavam...
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Auto refresh toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Auto-refresh
            </span>
          </label>

          <div className="flex items-center gap-2">
            <FiCalendar className="text-gray-400" />
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, startDate: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
            <span className="text-gray-400">-</span>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, endDate: e.target.value })
              }
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            onClick={loadAllData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition disabled:opacity-50"
          >
            <FiRefreshCw
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            />{" "}
            Osvježi
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <FiDownload className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Live Stats Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold opacity-90">Danas</h2>
            <p className="text-3xl font-bold">
              {formatCurrency(calculatedMetrics.todaySales)}
            </p>
            <p className="text-sm opacity-75">
              {calculatedMetrics.todayCount} transakcija danas
            </p>
          </div>
          <div className="hidden md:block h-16 w-32">
            <Line
              data={miniTrendData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { display: false },
                  y: { display: false },
                },
              }}
            />
          </div>
          <div className="text-right">
            <p className="text-sm opacity-75">Ovaj tjedan</p>
            <p className="text-xl font-bold">
              {formatCurrency(calculatedMetrics.weekSales)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-75">Ovaj mjesec</p>
            <p className="text-xl font-bold">
              {formatCurrency(calculatedMetrics.monthSales)}
            </p>
            <p
              className={`text-sm flex items-center justify-end gap-1 ${calculatedMetrics.growthRate >= 0 ? "text-green-300" : "text-red-300"}`}
            >
              {calculatedMetrics.growthRate >= 0 ? (
                <FiTrendingUp />
              ) : (
                <FiTrendingDown />
              )}
              {calculatedMetrics.growthRate.toFixed(1)}% od prošlog mjeseca
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ukupna Prodaja"
          value={formatCurrency(stats?.totalSales || 0)}
          icon={FiDollarSign}
          color="blue"
          subtitle="Sveukupno"
        />
        <StatCard
          title="Broj Transakcija"
          value={formatNumber(stats?.transactionCount || 0)}
          icon={FiShoppingCart}
          color="green"
          subtitle={`Prosječno ${formatCurrency(avgTransaction)} po transakciji`}
        />
        <StatCard
          title="Prosječna Dnevna Prodaja"
          value={formatCurrency(calculatedMetrics.avgDailySales)}
          icon={FiActivity}
          color="purple"
          subtitle="Bazirano na svim podacima"
        />
        <StatCard
          title="Prodanih Jedinica"
          value={formatNumber(totalQuantity)}
          icon={FiPackage}
          color="orange"
          subtitle={`${stats?.salesByCategory?.length || 0} kategorija`}
        />
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {calculatedMetrics.bestDay && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <FiTrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Najbolji dan
                </p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {formatCurrency(calculatedMetrics.bestDay.total)}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(calculatedMetrics.bestDay.date).toLocaleDateString(
                    "hr-HR"
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {calculatedMetrics.bestCategory && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FiPackage className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Top kategorija
                </p>
                <p className="text-lg font-bold text-gray-800 dark:text-white">
                  {calculatedMetrics.bestCategory.name}
                </p>
                <p className="text-xs text-gray-400">
                  {formatCurrency(calculatedMetrics.bestCategory.total)}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <FiPercent className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Mjesečni rast
              </p>
              <p
                className={`text-lg font-bold ${calculatedMetrics.growthRate >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {calculatedMetrics.growthRate >= 0 ? "+" : ""}
                {calculatedMetrics.growthRate.toFixed(1)}%
              </p>
              <p className="text-xs text-gray-400">
                vs. prošli mjesec (
                {formatCurrency(calculatedMetrics.lastMonthSales)})
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
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

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
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
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
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

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
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
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {cat.category}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {formatCurrency(cat.total)} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors[index % colors.length]} rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatNumber(cat.quantity)} jedinica prodano
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Posljednje Transakcije
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 dark:text-gray-400 uppercase">
                <th className="pb-3">Proizvod</th>
                <th className="pb-3">Kategorija</th>
                <th className="pb-3">Količina</th>
                <th className="pb-3">Cijena</th>
                <th className="pb-3">Ukupno</th>
                <th className="pb-3">Datum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {rawData.slice(0, 5).map((item) => (
                <tr key={item.id} className="text-sm">
                  <td className="py-3 font-medium text-gray-800 dark:text-white">
                    {item.product_name}
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-1 text-xs bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600 dark:text-gray-400">
                    {item.quantity}
                  </td>
                  <td className="py-3 text-gray-600 dark:text-gray-400">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="py-3 font-semibold text-green-600 dark:text-green-400">
                    {formatCurrency(item.total)}
                  </td>
                  <td className="py-3 text-gray-500 dark:text-gray-400">
                    {new Date(item.date).toLocaleDateString("hr-HR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Komponenta za stat kartice
const StatCard = ({ title, value, icon: Icon, color, subtitle }) => {
  const colors = {
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    green:
      "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    purple:
      "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    orange:
      "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">
            {value}
          </p>
          {subtitle && <p className="text-xs text-gray-400 mt-2">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
