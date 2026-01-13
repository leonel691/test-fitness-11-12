"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { authApi } from "@/lib/api";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Pages où on ne veut pas afficher la navigation
  const hideOnPages = ["/signin", "/signup", "/forgot-password"];
  const shouldHide = hideOnPages.includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await authApi.getMe();
        setUser(response.user);
      } catch (err) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  if (shouldHide || loading) {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 shadow-sm border-b border-gray-200 dark:border-gray-700"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="relative flex justify-between items-center py-4">
          {/* Logo à gauche */}
          <Link href={user ? "/dashboard" : "/"} className="text-2xl font-bold text-primary-700 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors">
            FitApp
          </Link>

          {/* Onglets centrés */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-1 border-gray-200 dark:border-gray-700">
            <Link
              href="/"
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                pathname === "/"
                  ? "text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-400"
                  : "text-gray-600 dark:text-gray-300 border-transparent hover:text-primary-600 dark:hover:text-primary-400 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              Accueil
            </Link>
            <Link
              href="/videos"
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                pathname === "/videos"
                  ? "text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-400"
                  : "text-gray-600 dark:text-gray-300 border-transparent hover:text-primary-600 dark:hover:text-primary-400 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              Vidéos
            </Link>
            <Link
              href="/exercices"
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                pathname === "/exercices"
                  ? "text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-400"
                  : "text-gray-600 dark:text-gray-300 border-transparent hover:text-primary-600 dark:hover:text-primary-400 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              Exercices
            </Link>
            <Link
              href="/coaching"
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                pathname === "/coaching"
                  ? "text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-400"
                  : "text-gray-600 dark:text-gray-300 border-transparent hover:text-primary-600 dark:hover:text-primary-400 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              Coaching
            </Link>
            <Link
              href="/contact"
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                pathname === "/contact"
                  ? "text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-400"
                  : "text-gray-600 dark:text-gray-300 border-transparent hover:text-primary-600 dark:hover:text-primary-400 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              Nous contacter
            </Link>
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                    pathname === "/dashboard"
                      ? "text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-400"
                      : "text-gray-600 dark:text-gray-300 border-transparent hover:text-primary-600 dark:hover:text-primary-400 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  Dashboard
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                      pathname === "/admin"
                        ? "text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-400"
                        : "text-gray-600 dark:text-gray-300 border-transparent hover:text-primary-600 dark:hover:text-primary-400 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    Admin
                  </Link>
                )}
                {user.role === "coach" && (
                  <Link
                    href="/coach"
                    className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                      pathname === "/coach"
                        ? "text-primary-600 dark:text-primary-400 border-primary-600 dark:border-primary-400"
                        : "text-gray-600 dark:text-gray-300 border-transparent hover:text-primary-600 dark:hover:text-primary-400 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    Coach
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Actions à droite */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {user.email} ({user.role})
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition-colors font-medium"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="px-4 py-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors font-medium"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
