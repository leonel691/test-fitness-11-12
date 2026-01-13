"use client";

import { useState } from "react";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi du formulaire
    alert("Message envoyé ! Nous vous répondrons bientôt.");
    setFormData({ nom: "", email: "", sujet: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">Nous contacter</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Une question ? Une suggestion ? N'hésitez pas à nous écrire !
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="nom"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="sujet" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  id="sujet"
                  value={formData.sujet}
                  onChange={(e) => setFormData({ ...formData, sujet: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg font-semibold hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
              >
                Envoyer le message
              </button>
            </form>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-2">📧</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Email</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">contact@fitapp.com</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Téléphone</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">+33 1 23 45 67 89</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-2">📍</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Adresse</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">123 Rue du Fitness, Paris</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
