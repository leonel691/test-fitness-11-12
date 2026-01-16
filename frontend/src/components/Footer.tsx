import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-950 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FitApp</h3>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Votre partenaire fitness pour atteindre vos objectifs et transformer votre corps.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-400 dark:text-gray-500">
              <li>
                <Link href="/" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/videos" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                  Vidéos
                </Link>
              </li>
              <li>
                <Link href="/exercices" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                  Exercices
                </Link>
              </li>
              <li>
                <Link href="/coaching" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                  Coaching
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Ressources</h4>
            <ul className="space-y-2 text-sm text-gray-400 dark:text-gray-500">
              <li>
                <Link href="/contact" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                  Nous contacter
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white dark:hover:text-gray-200 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            {/* <Link
              href="/contact"
              className="font-semibold bg-black">
              Contact
            </Link> */}
            <ul className="space-y-2 text-sm text-gray-400 dark:text-gray-500">
              <li><a href="mailto:contact@fitapp.com">contact@fitapp.com </a></li>
              <li><a href="tel:+237 691161721">+237 691161721</a></li>
              <li>Universite de yaounde1</li>
              <li>Yaounde, cameroun</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400 dark:text-gray-500">
          <p>&copy; 2026 FitApp. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

