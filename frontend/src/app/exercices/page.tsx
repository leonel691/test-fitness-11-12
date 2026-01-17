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
      {/* Hero Section avec image motivante */}
      <div 
        className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-900/70"></div>
        
        {/* Contenu hero */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg">
            Exercices
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Explorez notre bibliothèque d'exercices pour tous les groupes musculaires
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="max-w-6xl mx-auto">

          {/* Filtres par catégorie */}
          <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
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
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {categoryExercices.map((exercice) => (
                      <div key={exercice.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
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

          <div className="text-center mt-6 md:mt-8">
            <Link
              href="/signin"
              className="inline-block px-6 py-2.5 sm:px-8 sm:py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors shadow-lg"
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

