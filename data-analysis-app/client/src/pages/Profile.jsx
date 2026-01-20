import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import toast from "react-hot-toast";
import { FiUser, FiMail, FiLock, FiSave, FiShield } from "react-icons/fi";

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Nove lozinke se ne podudaraju");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Nova lozinka mora imati najmanje 6 znakova");
      return;
    }

    setLoading(true);
    try {
      await api.put("/auth/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success("Lozinka uspješno promijenjena!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Greška pri promjeni lozinke"
      );
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: {
        color: "bg-red-100 text-red-700 border-red-200",
        label: "Administrator",
      },
      vlasnik: {
        color: "bg-purple-100 text-purple-700 border-purple-200",
        label: "Vlasnik",
      },
      menadjer: {
        color: "bg-blue-100 text-blue-700 border-blue-200",
        label: "Menadžer",
      },
      radnik: {
        color: "bg-gray-100 text-gray-700 border-gray-200",
        label: "Radnik",
      },
    };
    return badges[role] || badges.radnik;
  };

  const badge = getRoleBadge(user?.role);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Moj Profil</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Informacije o korisniku */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiUser className="text-primary-600" /> Informacije
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Korisničko ime
              </label>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FiUser className="text-gray-400" />
                <span className="font-medium text-gray-800">
                  {user?.username}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Email adresa
              </label>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FiMail className="text-gray-400" />
                <span className="font-medium text-gray-800">{user?.email}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Uloga u sistemu
              </label>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FiShield className="text-gray-400" />
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${badge.color}`}
                >
                  {badge.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Promjena lozinke */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiLock className="text-primary-600" /> Promjena Lozinke
          </h2>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trenutna lozinka
              </label>
              <input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nova lozinka
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                minLength={6}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Potvrdite novu lozinku
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
            >
              <FiSave /> {loading ? "Spremanje..." : "Spremi Lozinku"}
            </button>
          </form>
        </div>
      </div>

      {/* Statistika korisnika */}
      <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Vaše Dozvole
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <PermissionCard
            title="Dashboard"
            allowed={true}
            description="Pregled osnovnih informacija"
          />
          <PermissionCard
            title="Statistike"
            allowed={["admin", "vlasnik", "menadjer"].includes(user?.role)}
            description="Grafovi i analitika"
          />
          <PermissionCard
            title="Upravljanje podacima"
            allowed={["admin", "vlasnik"].includes(user?.role)}
            description="Dodavanje i brisanje"
          />
          <PermissionCard
            title="Administracija"
            allowed={user?.role === "admin"}
            description="Upravljanje korisnicima"
          />
        </div>
      </div>
    </div>
  );
};

const PermissionCard = ({ title, allowed, description }) => (
  <div
    className={`p-4 rounded-lg border-2 ${allowed ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"}`}
  >
    <div className="flex items-center gap-2 mb-1">
      <span
        className={`w-2 h-2 rounded-full ${allowed ? "bg-green-500" : "bg-gray-400"}`}
      ></span>
      <span className="font-medium text-gray-800">{title}</span>
    </div>
    <p className="text-xs text-gray-500">{description}</p>
  </div>
);

export default Profile;
