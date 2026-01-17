"use client";

import Footer from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";

export default function VideosPage() {
  // Vidéos YouTube de test (IDs publics d'exemple)
  const videos = [
    {
      id: 1,
      titre: "Entraînement complet débutant",
      duree: "30 min",
      vues: "12k",
      categorie: "Débutant",
      youtubeId: "ml6cT4AZdqI",
    },
    {
      id: 2,
      titre: "HIIT Cardio intense",
      duree: "20 min",
      vues: "25k",
      categorie: "Avancé",
      youtubeId: "ml6cT4AZdqI",
    },
    {
      id: 3,
      titre: "Yoga matinal",
      duree: "45 min",
      vues: "18k",
      categorie: "Tous niveaux",
      youtubeId: "v7AYKMP6rOE",
    },
    {
      id: 4,
      titre: "Musculation jambes",
      duree: "40 min",
      vues: "15k",
      categorie: "Intermédiaire",
      youtubeId: "2L2lnxIcNmo",
    },
    {
      id: 5,
      titre: "Abdos express",
      duree: "15 min",
      vues: "30k",
      categorie: "Tous niveaux",
      youtubeId: "1919eTCoESo",
    },
    {
      id: 6,
      titre: "Étirements post-entraînement",
      duree: "25 min",
      vues: "10k",
      categorie: "Tous niveaux",
      youtubeId: "eC1pS-lGqwQ",
    },
    {
      id: 7,
      titre: "Full Body Workout",
      duree: "35 min",
      vues: "22k",
      categorie: "Intermédiaire",
      youtubeId: "ml6cT4AZdqI",
    },
    {
      id: 8,
      titre: "Pilates pour débutants",
      duree: "30 min",
      vues: "14k",
      categorie: "Débutant",
      youtubeId: "v7AYKMP6rOE",
    },
    {
      id: 9,
      titre: "Boxe fitness",
      duree: "25 min",
      vues: "20k",
      categorie: "Intermédiaire",
      youtubeId: "2L2lnxIcNmo",
    },
    {
      id: 10,
      titre: "Renforcement musculaire",
      duree: "28 min",
      vues: "16k",
      categorie: "Intermédiaire",
      youtubeId: "1919eTCoESo",
    },
    {
      id: 11,
      titre: "Stretching complet",
      duree: "20 min",
      vues: "11k",
      categorie: "Tous niveaux",
      youtubeId: "eC1pS-lGqwQ",
    },
    {
      id: 12,
      titre: "CrossFit WOD",
      duree: "35 min",
      vues: "19k",
      categorie: "Avancé",
      youtubeId: "ml6cT4AZdqI",
    },
  ];

  const categories = ["Tous", "Débutant", "Intermédiaire", "Avancé", "Tous niveaux"];
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredVideos =
    selectedCategory === "Tous"
      ? videos
      : videos.filter((video) => video.categorie === selectedCategory);

  const videosByCategory = {
    Débutant: videos.filter((v) => v.categorie === "Débutant"),
    Intermédiaire: videos.filter((v) => v.categorie === "Intermédiaire"),
    Avancé: videos.filter((v) => v.categorie === "Avancé"),
    "Tous niveaux": videos.filter((v) => v.categorie === "Tous niveaux"),
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Hero Section avec image motivante */}
      <div 
        className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      >
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-slate-900/70"></div>
        
        {/* Contenu hero */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 drop-shadow-lg">
            Vidéos d'entraînement
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
            Accédez à notre bibliothèque complète de vidéos d'entraînement pour tous les niveaux
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
            Object.entries(videosByCategory).map(([category, categoryVideos]) => (
              categoryVideos.length > 0 && (
                <div key={category} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">{category}</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {categoryVideos.map((video) => (
                      <div key={video.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                        <div className="aspect-video relative">
                          <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${video.youtubeId}`}
                            title={video.titre}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                          <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {video.duree}
                          </span>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded">
                              {video.categorie}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">{video.vues} vues</span>
                          </div>
                          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            {video.titre}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Entraînement complet pour progresser efficacement
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            ))
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
              {filteredVideos.map((video) => (
                <div key={video.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-video relative">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.titre}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duree}
                    </span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded">
                        {video.categorie}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{video.vues} vues</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                      {video.titre}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Entraînement complet pour progresser efficacement
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-6 md:mt-8">
            <Link
              href="/signin"
              className="inline-block px-6 py-2.5 sm:px-8 sm:py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg font-semibold text-sm sm:text-base hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors shadow-lg"
            >
              Voir plus de vidéos
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

