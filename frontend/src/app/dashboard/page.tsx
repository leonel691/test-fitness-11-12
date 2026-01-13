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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-gray-800 dark:text-gray-100">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Bienvenue sur votre tableau de bord !
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Votre compte est {user?.isVerified ? "vérifié" : "non vérifié"}.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-6">
                <h3 className="font-semibold text-primary-700 dark:text-primary-300 mb-2">
                  Mes entraînements
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Accédez à vos programmes personnalisés
                </p>
              </div>
              <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-6">
                <h3 className="font-semibold text-primary-700 dark:text-primary-300 mb-2">
                  Mes progrès
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Suivez votre évolution
                </p>
              </div>
              <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-6">
                <h3 className="font-semibold text-primary-700 dark:text-primary-300 mb-2">
                  Mon profil
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Gérez vos informations
                </p>
              </div>
              {user?.role === "admin" && (
                <div className="bg-primary-50 dark:bg-primary-900/30 rounded-lg p-6">
                  <h3 className="font-semibold text-primary-700 dark:text-primary-300 mb-2">
                    Administration
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Gérer les activités et les coachs
                  </p>
                  <Link
                    href="/admin"
                    className="mt-3 inline-block text-primary-700 dark:text-primary-300 font-medium hover:text-primary-800 dark:hover:text-primary-200"
                  >
                    Accéder au dashboard admin →
                  </Link>
                </div>
              )}
            </div>
            <div className="mt-8">
              <Link
                href="/"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
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


