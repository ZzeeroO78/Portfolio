import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, minRole, roles }) => {
  const { user, loading, hasMinRole, hasRole } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Provjera minimalne uloge
  if (minRole && !hasMinRole(minRole)) {
    return <Navigate to="/dashboard" />;
  }

  // Provjera specifične uloge
  if (roles && !hasRole(...roles)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PrivateRoute;
