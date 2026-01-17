"use client";

import Link from "next/link";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section avec vidéo de bannière */}
      <div className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Vidéo de bannière */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          >
            <source src="https://videos.pexels.com/video-files/3775155/3775155-hd_1920_1080_30fps.mp4" type="video/mp4" />
            {/* Fallback pour navigateurs qui ne supportent pas la vidéo */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
              }}
            ></div>
          </video>
        </div>
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/70 to-slate-900/80"></div>

        {/* Contenu */}
        <div className="relative z-10 w-full container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight px-4">
              Transformez votre
              <br />
              <span className="text-primary-200">corps et votre esprit</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-primary-100 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto px-4">
              Rejoignez une communauté de passionnés du fitness. Accédez à des programmes d'entraînement personnalisés, suivez vos progrès en temps réel et atteignez vos objectifs avec l'aide de coachs experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link
                href="/signup"
                className="px-6 py-3 sm:px-8 sm:py-4 bg-primary-600 text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
              >
                Commencer maintenant
              </Link>
              <Link
                href="/signin"
                className="px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-white hover:text-primary-700 transition-all text-center"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* rate section */}
      <div className="flex w-full justify-center px-4">
        <div className="flex w-full max-w-4xl bg-white border border-gray-200 mt-8 md:mt-12 shadow-sm dark:bg-gray-800/30 dark:border-gray-700 min-h-[4rem] md:h-auto items-center justify-around md:justify-between rounded-xl p-4 md:p-6 gap-4 md:gap-0 flex-wrap md:flex-nowrap">
          <div className="flex flex-col items-center min-w-[80px]">
            <h1 className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">50k+</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center">
              Membres
            </p>
          </div>
          <div className="flex flex-col items-center min-w-[80px]">
            <h1 className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">120+</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center">
              Programmes
            </p>
          </div>
          <div className="flex flex-col items-center min-w-[80px]">
            <h1 className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">98%</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 text-center">
              Satisfaction
            </p>
          </div>
        </div>
      </div>

      {/* Section Carrousel Infini */}
      <div className="py-12 md:py-20 bg-gray-100 dark:bg-gray-800/50 overflow-hidden">
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Rejoignez notre communauté
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Découvrez les succès de nos membres
          </p>
        </div>
        <div className="relative w-full">
          {/* Container du carrousel */}
          <div className="flex animate-infinite-scroll gap-8">
            {/* Première série d'éléments */}
            {[
              { name: "Marie L.", result: "Perdu 15kg", image: "👤" },
              { name: "Thomas D.", result: "+10kg muscle", image: "💪" },
              { name: "Sophie M.", result: "Marathon réussi", image: "🏃" },
              { name: "Lucas P.", result: "Abdos définis", image: "🔥" },
              { name: "Emma D.", result: "Flexibilité ++", image: "🧘" },
              { name: "Pierre M.", result: "Force doublée", image: "⚡" },
              { name: "Julie R.", result: "Endurance +50%", image: "🌟" },
              { name: "Marc T.", result: "Vélo 100km", image: "🚴" },
            ].map((member, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 w-64 md:w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-2xl">
                    {member.image}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{member.name}</h3>
                    <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{member.result}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  "Grâce à FitApp, j'ai atteint mes objectifs plus rapidement que prévu !"
                </p>
              </div>
            ))}
            {/* Duplication pour effet infini */}
            {[
              { name: "Marie L.", result: "Perdu 15kg", image: "👤" },
              { name: "Thomas D.", result: "+10kg muscle", image: "💪" },
              { name: "Sophie M.", result: "Marathon réussi", image: "🏃" },
              { name: "Lucas P.", result: "Abdos définis", image: "🔥" },
              { name: "Emma D.", result: "Flexibilité ++", image: "🧘" },
              { name: "Pierre M.", result: "Force doublée", image: "⚡" },
              { name: "Julie R.", result: "Endurance +50%", image: "🌟" },
              { name: "Marc T.", result: "Vélo 100km", image: "🚴" },
            ].map((member, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 w-64 md:w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center text-2xl">
                    {member.image}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{member.name}</h3>
                    <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{member.result}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  "Grâce à FitApp, j'ai atteint mes objectifs plus rapidement que prévu !"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          <div className="bg-white border border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700 rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Programmes personnalisés
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Des entraînements adaptés à votre niveau et à vos objectifs
            </p>
          </div>
          <div className="bg-white border border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700 rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Suivi des progrès
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Visualisez votre évolution avec des statistiques détaillées
            </p>
          </div>
          <div className="bg-white border border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700 rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">👨‍🏫</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Coachs experts
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Bénéficiez des conseils de professionnels certifiés
            </p>
          </div>
        </div>
      </div>

      {/* Section Témoignages */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 text-center mb-8 md:mb-12 px-4">
          Ce que disent nos membres
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          <div className="bg-white border border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-100 text-primary-700 dark:bg-primary-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-xl">👤</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Marie L.</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Membre depuis 2 ans</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              "J'ai perdu 15kg grâce aux programmes personnalisés. Les coachs sont incroyables !"
            </p>
          </div>
          <div className="bg-white border border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-100 text-primary-700 dark:bg-primary-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-xl">👤</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Thomas D.</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Membre depuis 1 an</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              "Le suivi des progrès m'aide à rester motivé. Je recommande à 100% !"
            </p>
          </div>
          <div className="bg-white border border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-100 text-primary-700 dark:bg-primary-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-xl">👤</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">Sophie M.</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Membre depuis 6 mois</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              "Les vidéos d'entraînement sont parfaites pour s'entraîner à la maison."
            </p>
          </div>
        </div>
      </div>

      {/* Section Programmes populaires */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 text-center mb-3 md:mb-4 px-4">
          Programmes populaires
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto px-4 text-sm sm:text-base">
          Découvrez nos programmes les plus suivis par la communauté
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          <div className="bg-white border border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700 rounded-xl p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Musculation complète
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Programme de 12 semaines pour développer votre masse musculaire
            </p>
            <Link
              href="/exercices"
              className="text-primary-600 dark:text-primary-300 hover:text-primary-700 dark:hover:text-gray-100 font-medium"
            >
              En savoir plus →
            </Link>
          </div>
          <div className="bg-white border border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700 rounded-xl p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
            <div className="text-4xl mb-4">🏃</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Perte de poids
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Programme cardio et nutrition pour perdre du poids efficacement
            </p>
            <Link
              href="/exercices"
              className="text-primary-600 dark:text-primary-300 hover:text-primary-700 dark:hover:text-gray-100 font-medium"
            >
              En savoir plus →
            </Link>
          </div>
          <div className="bg-white border border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700 rounded-xl p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all">
            <div className="text-4xl mb-4">🧘</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Yoga & Bien-être
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Programme de relaxation et de renforcement en douceur
            </p>
            <Link
              href="/coaching"
              className="text-primary-600 dark:text-primary-300 hover:text-primary-700 dark:hover:text-gray-100 font-medium"
            >
              En savoir plus →
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto bg-white border border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700 rounded-2xl p-6 md:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-4">
            Prêt à commencer votre transformation ?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 md:mb-8 text-sm sm:text-base px-4">
            Rejoignez des milliers de membres qui ont déjà atteint leurs
            objectifs
          </p>
          <Link
            href="/signup"
            className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-white dark:bg-gray-700 text-primary-700 dark:text-gray-100 rounded-lg font-semibold text-base sm:text-lg hover:bg-primary-50 dark:hover:bg-gray-600 transition-colors shadow-lg"
          >
            Commencer maintenant
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}


