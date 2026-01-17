# FitApp - Application de Fitness

Application complète de fitness avec authentification JWT, vérification OTP, et gestion des rôles (admin, coach, utilisateur).

## 🚀 Technologies

### Backend
- **Node.js** avec **Express**
- **TypeScript**
- **MongoDB** avec **Mongoose**
- **JWT** pour l'authentification
- **Bcrypt** pour le hachage des mots de passe
- **Nodemailer** pour l'envoi d'emails (OTP, réinitialisation)

### Frontend
- **Next.js 14** avec **App Router**
- **React 18**
- **TypeScript**
- **Tailwind CSS 3**
- **Axios** pour les appels API

## 📋 Prérequis

- Node.js (v18 ou supérieur)
- MongoDB (local ou distant)
- npm ou yarn

## 🔧 Installation

### Backend

```bash
cd backend
npm install
cp env.example .env
# Éditez .env avec vos configurations
npm run dev
```

Le backend sera accessible sur `http://localhost:4000`

### Frontend

```bash
cd frontend
npm install
# Créez .env.local avec NEXT_PUBLIC_API_URL=http://localhost:4000
npm run dev
```

Le frontend sera accessible sur `http://localhost:3000`

## 📝 Configuration

### Variables d'environnement Backend (.env)

```env
MONGO_URI=mongodb://localhost:27017/fitness-app
JWT_SECRET=votre_secret_jwt
PORT=4000
CLIENT_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre_email@gmail.com
SMTP_PASS=votre_mot_de_passe_app
```

### Variables d'environnement Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## 🎯 Fonctionnalités

### Authentification
- ✅ Inscription avec validation de mot de passe fort
- ✅ Vérification OTP par email
- ✅ Connexion avec JWT
- ✅ Réinitialisation de mot de passe
- ✅ Gestion des rôles (admin, coach, user)

### Pages Frontend
- 🏠 **Page d'accueil** : Landing page avec présentation de l'application
- 🔐 **Connexion** : Page de signin
- 📝 **Inscription** : Page de signup avec vérification OTP
- 🔑 **Mot de passe oublié** : Réinitialisation de mot de passe
- 📊 **Dashboard** : Tableau de bord utilisateur (après connexion)

## 🏗️ Structure du Projet

```
fit cursor/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Contrôleurs (logique métier)
│   │   ├── routes/          # Routes API
│   │   ├── models/           # Modèles Mongoose
│   │   ├── middleware/      # Middleware (auth, roles)
│   │   ├── services/        # Services (email, etc.)
│   │   ├── utils/           # Utilitaires (password, OTP)
│   │   └── config/           # Configuration
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── app/             # Pages Next.js (App Router)
    │   │   ├── page.tsx     # Page d'accueil
    │   │   ├── signin/      # Page de connexion
    │   │   ├── signup/      # Page d'inscription
    │   │   └── dashboard/   # Tableau de bord
    │   └── lib/             # Utilitaires (API, etc.)
    └── package.json
```

## 🔐 Rôles

- **user** : Utilisateur standard
- **coach** : Coach avec accès étendu
- **admin** : Administrateur avec tous les droits

## 📡 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/request-otp` - Demander un nouveau code OTP
- `POST /api/auth/verify-otp` - Vérifier le code OTP
- `POST /api/auth/login` - Connexion
- `POST /api/auth/forgot-password` - Demander réinitialisation
- `POST /api/auth/reset-password` - Réinitialiser le mot de passe
- `GET /api/auth/me` - Obtenir les infos de l'utilisateur connecté

## 🎨 Design

L'interface utilise **Tailwind CSS 3** avec un thème personnalisé basé sur des couleurs primaires (bleu). Le design est moderne, responsive et optimisé pour l'expérience utilisateur.

## 🚦 Démarrage rapide

1. **Démarrer MongoDB** (si local)
2. **Backend** : `cd backend && npm run dev`
3. **Frontend** : `cd frontend && npm run dev`
4. Ouvrir `http://localhost:3000`

## 📄 Licence

ISC







