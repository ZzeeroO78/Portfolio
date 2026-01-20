import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
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
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { FiDollarSign, FiShoppingCart, FiTrendingUp, FiPackage } from 'react-icons/fi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user, hasMinRole } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      if (hasMinRole('menadjer')) {
        const res = await api.get('/data/stats');
        setStats(res.data.stats);
      }
    } catch (error) {
      toast.error('Greška pri učitavanju statistike');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('hr-HR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  // Chart data
  const categoryChartData = {
    labels: stats?.salesByCategory?.map(c => c.category) || [],
    datasets: [{
      data: stats?.salesByCategory?.map(c => c.total) || [],
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'],
      borderWidth: 0
    }]
  };

  const monthlyChartData = {
    labels: stats?.salesByMonth?.map(m => m.month) || [],
    datasets: [{
      label: 'Prodaja po mjesecu',
      data: stats?.salesByMonth?.map(m => m.total) || [],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4
    }]
  };

  const topProductsChartData = {
    labels: stats?.topProducts?.map(p => p.product_name) || [],
    datasets: [{
      label: 'Prihod',
      data: stats?.topProducts?.map(p => p.total) || [],
      backgroundColor: '#3B82F6'
    }]
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Prikaz za radnika
  if (!hasMinRole('menadjer')) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-4">
            <FiPackage className="w-10 h-10 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Dobrodošli, {user?.username}!</h2>
          <p className="text-gray-600 mb-4">Vaša uloga: <span className="font-semibold capitalize">{user?.role}</span></p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <p className="text-yellow-800">
              Za pristup statistikama i izvještajima potrebna je uloga <strong>Menadžer</strong> ili viša.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Ukupna Prodaja</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(stats?.totalSales || 0)}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FiDollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Broj Transakcija</p>
              <p className="text-2xl font-bold text-gray-800">{stats?.transactionCount || 0}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FiShoppingCart className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Prosječna Transakcija</p>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency((stats?.totalSales / stats?.transactionCount) || 0)}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <FiTrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Kategorija</p>
              <p className="text-2xl font-bold text-gray-800">{stats?.salesByCategory?.length || 0}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <FiPackage className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Prodaja po Mjesecu</h3>
          <Line data={monthlyChartData} options={{ maintainAspectRatio: true }} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Prodaja po Kategoriji</h3>
          <div className="h-64 flex items-center justify-center">
            <Doughnut data={categoryChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Top 5 Proizvoda</h3>
        <Bar 
          data={topProductsChartData} 
          options={{ 
            indexAxis: 'y',
            maintainAspectRatio: true 
          }} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
