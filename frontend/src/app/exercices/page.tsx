"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

export default function ExercicesPage() {
  const exercices = [
    { id: 1, nom: "Squats", categorie: "Jambes", difficulte: "Débutant", muscles: "Quadriceps, Fessiers" },
    { id: 2, nom: "Pompes", categorie: "Haut du corps", difficulte: "Intermédiaire", muscles: "Pectoraux, Triceps" },
    { id: 3, nom: "Planche", categorie: "Abdos", difficulte: "Intermédiaire", muscles: "Abdominaux, Épaules" },
    { id: 4, nom: "Burpees", categorie: "Cardio", difficulte: "Avancé", muscles: "Tout le corps" },
    { id: 5, nom: "Développé couché", categorie: "Haut du corps", difficulte: "Intermédiaire", muscles: "Pectoraux, Triceps" },
    { id: 6, nom: "Fentes", categorie: "Jambes", difficulte: "Débutant", muscles: "Quadriceps, Fessiers" },
    { id: 7, nom: "Tractions", categorie: "Haut du corps", difficulte: "Avancé", muscles: "Dorsaux, Biceps" },
    { id: 8, nom: "Crunch", categorie: "Abdos", difficulte: "Débutant", muscles: "Abdominaux" },
    { id: 9, nom: "Mountain Climbers", categorie: "Cardio", difficulte: "Intermédiaire", muscles: "Abdominaux, Épaules" },
    { id: 10, nom: "Soulevé de terre", categorie: "Jambes", difficulte: "Avancé", muscles: "Fessiers, Ischio-jambiers, Dos" },
    { id: 11, nom: "Dips", categorie: "Haut du corps", difficulte: "Intermédiaire", muscles: "Triceps, Épaules" },
    { id: 12, nom: "Russian Twist", categorie: "Abdos", difficulte: "Intermédiaire", muscles: "Abdominaux obliques" },
    { id: 13, nom: "Saut à la corde", categorie: "Cardio", difficulte: "Débutant", muscles: "Mollets, Cardio" },
    { id: 14, nom: "Développé militaire", categorie: "Haut du corps", difficulte: "Intermédiaire", muscles: "Épaules, Triceps" },
    { id: 15, nom: "Leg Press", categorie: "Jambes", difficulte: "Débutant", muscles: "Quadriceps, Fessiers" },
    { id: 16, nom: "Rameur", categorie: "Cardio", difficulte: "Intermédiaire", muscles: "Dos, Épaules, Jambes" },
    { id: 17, nom: "Gainage latéral", categorie: "Abdos", difficulte: "Intermédiaire", muscles: "Abdominaux obliques" },
    { id: 18, nom: "Curl biceps", categorie: "Haut du corps", difficulte: "Débutant", muscles: "Biceps" },
  ];

  const categories = ["Tous", "Jambes", "Haut du corps", "Abdos", "Cardio"];
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const exercicesByCategory = {
    Jambes: exercices.filter((e) => e.categorie === "Jambes"),
    "Haut du corps": exercices.filter((e) => e.categorie === "Haut du corps"),
    Abdos: exercices.filter((e) => e.categorie === "Abdos"),
    Cardio: exercices.filter((e) => e.categorie === "Cardio"),
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto mt-[150px]">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Exercices</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Explorez notre bibliothèque d'exercices pour tous les groupes musculaires
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
            Object.entries(exercicesByCategory).map(([category, categoryExercices]) => (
              categoryExercices.length > 0 && (
                <div key={category} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">{category}</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryExercices.map((exercice) => (
                      <div key={exercice.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                            {exercice.nom}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            exercice.difficulte === "Débutant" 
                              ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                              : exercice.difficulte === "Intermédiaire"
                              ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                              : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                          }`}>
                            {exercice.difficulte}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          <span className="font-medium">Catégorie:</span> {exercice.categorie}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                          <span className="font-medium">Muscles:</span> {exercice.muscles}
                        </p>
                        <button className="w-full px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors">
                          Voir les détails
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {exercices
                .filter((e) => e.categorie === selectedCategory)
                .map((exercice) => (
                  <div key={exercice.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        {exercice.nom}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        exercice.difficulte === "Débutant" 
                          ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                          : exercice.difficulte === "Intermédiaire"
                          ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300"
                          : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                      }`}>
                        {exercice.difficulte}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      <span className="font-medium">Catégorie:</span> {exercice.categorie}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                      <span className="font-medium">Muscles:</span> {exercice.muscles}
                    </p>
                    <button className="w-full px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors">
                      Voir les détails
                    </button>
                  </div>
                ))}
            </div>
          )}

          <div className="text-center">
            <Link
              href="/signin"
              className="inline-block px-8 py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors shadow-lg"
            >
              Voir plus d'exercices
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

