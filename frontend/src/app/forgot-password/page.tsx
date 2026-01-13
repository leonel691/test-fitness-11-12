"use client";

import { useState } from "react";
import Link from "next/link";
import { authApi } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await authApi.forgotPassword({ email });
      setMessage(
        response.message || "Email de réinitialisation envoyé !"
      );
      if (response.devToken) {
        setMessage(
          `Token de réinitialisation (dev): ${response.devToken} - Vérifiez aussi votre email`
        );
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Erreur lors de l'envoi de l'email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-400 mb-2">
              Mot de passe oublié
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Entrez votre email pour recevoir un lien de réinitialisation
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 rounded-lg">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                placeholder="votre@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 dark:bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Envoi..." : "Envoyer le lien"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/signin"
              className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              ← Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}





