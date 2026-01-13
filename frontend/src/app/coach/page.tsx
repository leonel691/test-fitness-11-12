"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";

export default function CoachPage() {
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
        if (response.user?.role !== "coach") {
          router.push("/dashboard");
          return;
        }
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8">Espace Coach</h1>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Mes élèves</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Gérez vos élèves et leurs programmes</p>
              <button className="px-6 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors">
                Voir mes élèves
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Créer un programme</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Créez des programmes personnalisés</p>
              <button className="px-6 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors">
                Nouveau programme
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Statistiques</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">25</div>
                <div className="text-gray-600 dark:text-gray-300">Élèves actifs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">12</div>
                <div className="text-gray-600 dark:text-gray-300">Programmes créés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">98%</div>
                <div className="text-gray-600 dark:text-gray-300">Taux de satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
