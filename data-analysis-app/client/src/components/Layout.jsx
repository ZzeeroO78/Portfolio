import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiHome, 
  FiDatabase, 
  FiUsers, 
  FiActivity, 
  FiLogOut, 
  FiMenu, 
  FiX,
  FiBarChart2 
} from 'react-icons/fi';
import { useState } from 'react';

const Layout = ({ children }) => {
  const { user, logout, hasMinRole, hasRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700';
      case 'vlasnik': return 'bg-purple-100 text-purple-700';
      case 'menadjer': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: FiHome, minRole: null },
    { path: '/data', label: 'Podaci', icon: FiDatabase, minRole: null },
    { path: '/users', label: 'Korisnici', icon: FiUsers, role: 'admin' },
    { path: '/logs', label: 'Aktivnosti', icon: FiActivity, role: 'admin' },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (item.role) return hasRole(item.role);
    if (item.minRole) return hasMinRole(item.minRole);
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiBarChart2 className="w-6 h-6 text-primary-600" />
          <span className="font-bold text-gray-800">Data Analysis</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          {sidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white shadow-lg transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <FiBarChart2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-gray-800">Data Analysis</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-semibold">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-800">{user?.username}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeColor(user?.role)}`}>
                  {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition
                    ${isActive 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="font-medium">Odjava</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
