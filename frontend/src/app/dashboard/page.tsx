"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authApi } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await authApi.getMe();
        setUser(response.user);
      } catch (err) {
        localStorage.removeItem("token");
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-700">FitApp</h1>
          <div className="flex gap-4 items-center">
            <span className="text-gray-600">
              {user?.email} ({user?.role})
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Bienvenue sur votre tableau de bord !
            </h2>
            <p className="text-gray-600 mb-6">
              Votre compte est {user?.isVerified ? "vérifié" : "non vérifié"}.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="font-semibold text-primary-700 mb-2">
                  Mes entraînements
                </h3>
                <p className="text-gray-600 text-sm">
                  Accédez à vos programmes personnalisés
                </p>
              </div>
              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="font-semibold text-primary-700 mb-2">
                  Mes progrès
                </h3>
                <p className="text-gray-600 text-sm">
                  Suivez votre évolution
                </p>
              </div>
              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="font-semibold text-primary-700 mb-2">
                  Mon profil
                </h3>
                <p className="text-gray-600 text-sm">
                  Gérez vos informations
                </p>
              </div>
            </div>
            <div className="mt-8">
              <Link
                href="/"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                ← Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

