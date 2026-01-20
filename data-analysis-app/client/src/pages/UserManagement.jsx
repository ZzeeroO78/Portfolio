import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { FiUser, FiShield, FiTrash2 } from 'react-icons/fi';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const roles = [
    { value: 'admin', label: 'Admin', color: 'red' },
    { value: 'vlasnik', label: 'Vlasnik', color: 'purple' },
    { value: 'menadjer', label: 'Menadžer', color: 'blue' },
    { value: 'radnik', label: 'Radnik', color: 'gray' }
  ];

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data.users);
    } catch (error) {
      toast.error('Greška pri učitavanju korisnika');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/users/${userId}/role`, { role: newRole });
      toast.success('Uloga uspješno promijenjena');
      loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Greška pri promjeni uloge');
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm('Jeste li sigurni da želite obrisati ovog korisnika?')) return;
    try {
      await api.delete(`/users/${userId}`);
      toast.success('Korisnik uspješno obrisan');
      loadUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Greška pri brisanju');
    }
  };

  const getRoleColor = (role) => {
    const found = roles.find(r => r.value === role);
    switch (found?.color) {
      case 'red': return 'bg-red-100 text-red-700';
      case 'purple': return 'bg-purple-100 text-purple-700';
      case 'blue': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
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
            <FiShield className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-bold text-gray-800">Upravljanje Korisnicima</h2>
          </div>
          <p className="text-gray-500 mt-2">Upravljajte korisnicima i njihovim ulogama</p>
        </div>

        {/* Role Legend */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <p className="text-sm font-medium text-gray-700 mb-2">Hijerarhija uloga:</p>
          <div className="flex flex-wrap gap-2">
            {roles.map(role => (
              <span key={role.value} className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(role.value)}`}>
                {role.label}
              </span>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Korisnik</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uloga</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registriran</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Akcije</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <FiUser className="w-5 h-5 text-primary-600" />
                      </div>
                      <span className="font-medium text-gray-900">{user.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium border-0 cursor-pointer ${getRoleColor(user.role)}`}
                    >
                      {roles.map(role => (
                        <option key={role.value} value={role.value}>{role.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {new Date(user.created_at).toLocaleDateString('hr-HR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                      title="Obriši korisnika"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nema korisnika za prikaz</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
