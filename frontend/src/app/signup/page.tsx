"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authApi } from "@/lib/api";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState<"register" | "verify">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    // Vérification de la force du mot de passe
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    if (!hasUpper || !hasLower || !hasDigit || !hasSpecial) {
      setError(
        "Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.register({ email, password });
      setMessage(
        response.message || "Inscription réussie ! Vérifiez votre email pour le code OTP."
      );
      if (response.devOtp) {
        setMessage(
          `Code OTP (dev): ${response.devOtp} - Vérifiez aussi votre email`
        );
      }
      setStep("verify");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Erreur lors de l'inscription"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authApi.verifyOtp({ email, otp });
      setMessage("Compte vérifié avec succès !");
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Code OTP invalide");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    setLoading(true);
    try {
      await authApi.requestOtp(email);
      setMessage("Code OTP renvoyé ! Vérifiez votre email.");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-400 mb-2">
              {step === "register" ? "Inscription" : "Vérification"}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {step === "register"
                ? "Créez votre compte FitApp"
                : "Entrez le code reçu par email"}
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

          {step === "register" ? (
            <form onSubmit={handleRegister} className="space-y-6">
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

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Min. 8 caractères, majuscule, minuscule, chiffre et caractère spécial
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Confirmer le mot de passe
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 dark:bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Inscription..." : "S'inscrire"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Code OTP
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  required
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition text-center text-2xl tracking-widest"
                  placeholder="000000"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-center">
                  Entrez le code à 6 chiffres reçu par email
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 dark:bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Vérification..." : "Vérifier"}
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={loading}
                className="w-full text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium text-sm disabled:opacity-50"
              >
                Renvoyer le code
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            {step === "register" ? (
              <p className="text-gray-600 dark:text-gray-300">
                Déjà un compte ?{" "}
                <Link
                  href="/signin"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
                >
                  Se connecter
                </Link>
              </p>
            ) : (
              <button
                onClick={() => setStep("register")}
                className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
              >
                ← Retour
              </button>
            )}
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}





