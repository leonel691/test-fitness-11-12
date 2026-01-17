"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { adminApi, authApi } from "@/lib/api";

interface Activity {
  _id: string;
  type: string;
  email?: string;
  description: string;
  createdAt: string;
}

interface UserRow {
  _id: string;
  email: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [coaches, setCoaches] = useState<UserRow[]>([]);
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signin");
      return;
    }

    const load = async () => {
      try {
        const me = await authApi.getMe();
        if (me.user?.role !== "admin") {
          router.push("/dashboard");
          return;
        }
        setUser(me.user);
        const [activityRes, coachRes] = await Promise.all([
          adminApi.getActivities(),
          adminApi.getCoaches(),
        ]);
        setActivities(activityRes.activities || []);
        setCoaches(coachRes.users || []);
      } catch (err) {
        localStorage.removeItem("token");
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [router]);

  const handleCreateCoach = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    try {
      const res = await adminApi.createCoach(form);
      setFeedback(res.message || "Coach créé");
      setForm({ email: "", password: "" });
      const coachRes = await adminApi.getCoaches();
      setCoaches(coachRes.users || []);
      const activityRes = await adminApi.getActivities();
      setActivities(activityRes.activities || []);
    } catch (err: any) {
      const message = err?.response?.data?.message || "Erreur lors de la création";
      setFeedback(message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-gray-800 dark:text-gray-100">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-10 space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Activités récentes</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Les 200 dernières actions enregistrées.
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 dark:text-gray-400 border-b dark:border-gray-700">
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Description</th>
                  <th className="py-2 pr-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id} className="border-b dark:border-gray-700 last:border-0">
                    <td className="py-2 pr-4 font-medium text-gray-800 dark:text-gray-200">{activity.type}</td>
                    <td className="py-2 pr-4 text-gray-600 dark:text-gray-300">{activity.email || "-"}</td>
                    <td className="py-2 pr-4 text-gray-600 dark:text-gray-300">{activity.description}</td>
                    <td className="py-2 pr-4 text-gray-600 dark:text-gray-300">
                      {new Date(activity.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {activities.length === 0 && (
                  <tr>
                    <td className="py-4 text-gray-500 dark:text-gray-400" colSpan={4}>
                      Aucune activité pour le moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Créer un coach</h2>
            <form className="space-y-4" onSubmit={handleCreateCoach}>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Mot de passe</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors focus:outline-none"
                    aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Doit contenir majuscules, minuscules, chiffre et caractère spécial.
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 dark:bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
              >
                Ajouter
              </button>
              {feedback && <p className="text-sm text-gray-700 dark:text-gray-300">{feedback}</p>}
            </form>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Coachs</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600 dark:text-gray-400 border-b dark:border-gray-700">
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Statut</th>
                    <th className="py-2 pr-4">Créé</th>
                  </tr>
                </thead>
                <tbody>
                  {coaches.map((coach) => (
                    <tr key={coach._id} className="border-b dark:border-gray-700 last:border-0">
                      <td className="py-2 pr-4 text-gray-800 dark:text-gray-200">{coach.email}</td>
                      <td className="py-2 pr-4 text-gray-600 dark:text-gray-300">
                        {coach.isVerified ? "Vérifié" : "Non vérifié"}
                      </td>
                      <td className="py-2 pr-4 text-gray-600 dark:text-gray-300">
                        {new Date(coach.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {coaches.length === 0 && (
                    <tr>
                      <td className="py-4 text-gray-500 dark:text-gray-400" colSpan={3}>
                        Aucun coach enregistré.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="text-sm">
          <Link href="/dashboard" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
            ← Retour au tableau de bord
          </Link>
        </div>
      </div>
    </div>
  );
}



