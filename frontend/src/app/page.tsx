import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">FitApp</div>
        <div className="flex gap-4">
          <Link
            href="/signin"
            className="px-4 py-2 text-white hover:text-primary-200 transition-colors"
          >
            Connexion
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2 bg-white text-primary-700 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
          >
            Inscription
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Transformez votre corps,
            <br />
            <span className="text-primary-200">Transformez votre vie</span>
          </h1>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Accédez à des programmes d'entraînement personnalisés, suivez vos
            progrès et atteignez vos objectifs fitness avec notre application
            complète.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="px-8 py-4 bg-white text-primary-700 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors shadow-lg"
            >
              Essai gratuit
            </Link>
            <Link
              href="/signin"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-700 transition-colors"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">💪</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Programmes personnalisés
            </h3>
            <p className="text-primary-100">
              Des entraînements adaptés à votre niveau et à vos objectifs
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Suivi des progrès
            </h3>
            <p className="text-primary-100">
              Visualisez votre évolution avec des statistiques détaillées
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">👨‍🏫</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Coachs experts
            </h3>
            <p className="text-primary-100">
              Bénéficiez des conseils de professionnels certifiés
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à commencer votre transformation ?
          </h2>
          <p className="text-primary-100 mb-8">
            Rejoignez des milliers de membres qui ont déjà atteint leurs
            objectifs
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-white text-primary-700 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors shadow-lg"
          >
            Commencer maintenant
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-white/20">
        <div className="text-center text-primary-200">
          <p>&copy; 2024 FitApp. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

