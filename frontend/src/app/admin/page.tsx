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
          <h1 className="text-2xl font-bold text-primary-700">Admin FitApp</h1>
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

      <div className="container mx-auto px-4 py-10 space-y-8">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Activités récentes</h2>
              <p className="text-gray-500 text-sm">
                Les 200 dernières actions enregistrées.
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2 pr-4">Email</th>
                  <th className="py-2 pr-4">Description</th>
                  <th className="py-2 pr-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id} className="border-b last:border-0">
                    <td className="py-2 pr-4 font-medium">{activity.type}</td>
                    <td className="py-2 pr-4">{activity.email || "-"}</td>
                    <td className="py-2 pr-4">{activity.description}</td>
                    <td className="py-2 pr-4">
                      {new Date(activity.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {activities.length === 0 && (
                  <tr>
                    <td className="py-4 text-gray-500" colSpan={4}>
                      Aucune activité pour le moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Créer un coach</h2>
            <form className="space-y-4" onSubmit={handleCreateCoach}>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Mot de passe</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Doit contenir majuscules, minuscules, chiffre et caractère spécial.
                </p>
              </div>
              <button
                type="submit"
                className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Ajouter
              </button>
              {feedback && <p className="text-sm text-gray-700">{feedback}</p>}
            </form>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Coachs</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Statut</th>
                    <th className="py-2 pr-4">Créé</th>
                  </tr>
                </thead>
                <tbody>
                  {coaches.map((coach) => (
                    <tr key={coach._id} className="border-b last:border-0">
                      <td className="py-2 pr-4">{coach.email}</td>
                      <td className="py-2 pr-4">
                        {coach.isVerified ? "Vérifié" : "Non vérifié"}
                      </td>
                      <td className="py-2 pr-4">
                        {new Date(coach.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {coaches.length === 0 && (
                    <tr>
                      <td className="py-4 text-gray-500" colSpan={3}>
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
          <Link href="/dashboard" className="text-primary-600 hover:text-primary-700">
            ← Retour au tableau de bord
          </Link>
        </div>
      </div>
    </div>
  );
}
