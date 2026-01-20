import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FiActivity, FiUser, FiClock } from 'react-icons/fi';

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const res = await api.get('/data/logs');
      setLogs(res.data.logs);
    } catch (error) {
      toast.error('Greška pri učitavanju aktivnosti');
    } finally {
      setLoading(false);
    }
  };

  const getActionBadge = (action) => {
    switch (action) {
      case 'LOGIN': return 'bg-green-100 text-green-700';
      case 'REGISTER': return 'bg-blue-100 text-blue-700';
      case 'DATA_ADD': return 'bg-purple-100 text-purple-700';
      case 'DATA_UPDATE': return 'bg-yellow-100 text-yellow-700';
      case 'DATA_DELETE': return 'bg-red-100 text-red-700';
      case 'ROLE_CHANGE': return 'bg-orange-100 text-orange-700';
      case 'USER_DELETE': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatAction = (action) => {
    const actions = {
      'LOGIN': 'Prijava',
      'REGISTER': 'Registracija',
      'DATA_ADD': 'Dodavanje',
      'DATA_UPDATE': 'Ažuriranje',
      'DATA_DELETE': 'Brisanje',
      'ROLE_CHANGE': 'Promjena uloge',
      'USER_DELETE': 'Brisanje korisnika'
    };
    return actions[action] || action;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FiActivity className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold text-gray-800">Evidencija Aktivnosti</h2>
          </div>
          <p className="text-gray-500 mt-2">Pregled svih aktivnosti u sistemu</p>
        </div>

        <div className="divide-y divide-gray-200">
          {logs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-gray-50 transition">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiUser className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-gray-900">
                      {log.username || 'Nepoznat'}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getActionBadge(log.action)}`}>
                      {formatAction(log.action)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{log.details}</p>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mt-2">
                    <FiClock className="w-3 h-3" />
                    <span>{new Date(log.created_at).toLocaleString('hr-HR')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {logs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nema aktivnosti za prikaz</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLogs;
