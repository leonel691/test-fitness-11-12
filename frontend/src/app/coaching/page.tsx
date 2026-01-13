"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

export default function CoachingPage() {
  // Photos libres d'exemple (Unsplash) pour phase de test
  const coachs = [
    {
      id: 1,
      nom: "Jean Dupont",
      specialite: "Musculation",
      experience: "10 ans",
      note: 4.9,
      eleves: 150,
      photo:
        "https://images.unsplash.com/photo-1598971639058-99f9d0b5d43f?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      nom: "Marie Martin",
      specialite: "Yoga & Pilates",
      experience: "8 ans",
      note: 4.8,
      eleves: 120,
      photo:
        "https://images.unsplash.com/photo-1552053264-36ed963fd36d?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      nom: "Pierre Durand",
      specialite: "Cardio & Endurance",
      experience: "12 ans",
      note: 5.0,
      eleves: 200,
      photo:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      nom: "Sophie Bernard",
      specialite: "Perte de poids",
      experience: "6 ans",
      note: 4.7,
      eleves: 90,
      photo:
        "https://images.unsplash.com/photo-1552053264-36ed963fd36d?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      nom: "Lucas Moreau",
      specialite: "CrossFit",
      experience: "9 ans",
      note: 4.9,
      eleves: 180,
      photo:
        "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 6,
      nom: "Emma Dubois",
      specialite: "Stretching & Mobilité",
      experience: "5 ans",
      note: 4.8,
      eleves: 100,
      photo:
        "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const categories = ["Tous", "Musculation", "Yoga & Pilates", "Cardio & Endurance", "Perte de poids", "CrossFit", "Stretching & Mobilité"];
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const coachsByCategory = {
    Musculation: coachs.filter((c) => c.specialite === "Musculation"),
    "Yoga & Pilates": coachs.filter((c) => c.specialite === "Yoga & Pilates"),
    "Cardio & Endurance": coachs.filter((c) => c.specialite === "Cardio & Endurance"),
    "Perte de poids": coachs.filter((c) => c.specialite === "Perte de poids"),
    CrossFit: coachs.filter((c) => c.specialite === "CrossFit"),
    "Stretching & Mobilité": coachs.filter((c) => c.specialite === "Stretching & Mobilité"),
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Coaching</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Trouvez le coach parfait pour vous accompagner dans votre parcours fitness. Nos coachs certifiés sont là pour vous aider à atteindre vos objectifs.
          </p>

          {/* Filtres par catégorie */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary-600 dark:bg-primary-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Affichage par catégorie */}
          {selectedCategory === "Tous" ? (
            Object.entries(coachsByCategory).map(([category, categoryCoachs]) => (
              categoryCoachs.length > 0 && (
                <div key={category} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">{category}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {categoryCoachs.map((coach) => (
                      <div
                        key={coach.id}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={coach.photo}
                            alt={coach.nom}
                            className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                {coach.nom}
                              </h3>
                              <div className="flex items-center gap-1">
                                <span className="text-yellow-500 dark:text-yellow-400">⭐</span>
                                <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{coach.note}</span>
                              </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">
                              <span className="font-medium">Spécialité:</span> {coach.specialite}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">
                              <span className="font-medium">Expérience:</span> {coach.experience}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                              <span className="font-medium">{coach.eleves} élèves</span> actifs
                            </p>
                            <Link
                              href="/signin"
                              className="inline-block px-6 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
                            >
                              Contacter
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))
          ) : (
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {coachs
                .filter((c) => c.specialite === selectedCategory)
                .map((coach) => (
                  <div
                    key={coach.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={coach.photo}
                        alt={coach.nom}
                        className="w-20 h-20 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                            {coach.nom}
                          </h3>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500 dark:text-yellow-400">⭐</span>
                            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">{coach.note}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          <span className="font-medium">Spécialité:</span> {coach.specialite}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          <span className="font-medium">Expérience:</span> {coach.experience}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                          <span className="font-medium">{coach.eleves} élèves</span> actifs
                        </p>
                        <Link
                          href="/signin"
                          className="inline-block px-6 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
                        >
                          Contacter
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}

          <div className="bg-primary-50 dark:bg-gray-800 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Vous êtes coach ?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Rejoignez notre équipe de coachs experts et partagez votre passion avec notre communauté
            </p>
            <Link
              href="/signin"
              className="inline-block px-8 py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
            >
              Devenir coach
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
