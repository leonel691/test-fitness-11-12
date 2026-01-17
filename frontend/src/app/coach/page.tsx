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
      {/* Hero Section avec image motivante */}
      <div 
        className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1598971639058-99f9d0b5d43f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-900/70"></div>
        
        {/* Contenu hero */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg">
            Espace Coach
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Gérez vos élèves et créez des programmes personnalisés
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 md:mb-4">Mes élèves</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 md:mb-4">Gérez vos élèves et leurs programmes</p>
              <button className="px-4 py-2 sm:px-6 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors text-sm sm:text-base">
                Voir mes élèves
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-3 md:mb-4">Créer un programme</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3 md:mb-4">Créez des programmes personnalisés</p>
              <button className="px-4 py-2 sm:px-6 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors text-sm sm:text-base">
                Nouveau programme
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Statistiques</h2>
            <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
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


