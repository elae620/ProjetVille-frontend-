# 🌍 ProjetVille - Frontend (Angular)

Application web de gestion des villes et des pays développée avec **Angular (v20)** dans le cadre du module **SOA (Architectures Orientées Services)**.

Ce frontend communique avec une architecture backend microservices Spring Boot sécurisée par **JWT (JSON Web Token)**.

---

## 🚀 Fonctionnalités

### 🔐 Authentification & Sécurité (Microservice Users)
- **Connexion sécurisée :** Authentification auprès du microservice `users-microservice` et stockage du token JWT dans le `localStorage`.
- **Inscription & Vérification d'Email :** Inscription avec formulaire réactif, envoi d'un code de vérification à 6 chiffres par e-mail et activation du compte via `/verifEmail`.
- **Gestion des Rôles :**
  - **ADMIN :** Accès complet (Ajout, modification, suppression des villes et gestion des pays).
  - **USER :** Consultation des villes et recherches (par pays ou par nom).
- **Route Guard (`villeGuard`) :** Protection des routes sensibles contre les accès non autorisés.
- **Intercepteur HTTP (`tokenInterceptor`) :** Injection automatique du header `Authorization: Bearer <token>` sur toutes les requêtes vers l'API.
- **UX & Notifications :** Notifications dynamiques avec **`ngx-toastr`** et indicateurs de chargement (**Spinner Bootstrap**).

### 🏙️ Gestion des Villes (Microservice Ville)
- **Affichage des villes :** Liste complète avec tri et pagination.
- **Ajout de ville :** Formulaire de création lié aux pays disponibles.
- **Modification de ville :** Mise à jour des informations d'une ville existante.
- **Suppression de ville :** Avec confirmation utilisateur.
- **Recherche par pays :** Filtrage dynamique des villes selon le pays sélectionné.
- **Recherche par nom :** Recherche instantanée grâce à un pipe de filtrage personnalisé.

---

## 🛠️ Technologies Utilisées

- **Framework :** [Angular 20](https://angular.dev/) (Architecture Standalone Components & Signal-ready)
- **Langage :** TypeScript (~5.9)
- **Style & UI :** Bootstrap 5.3
- **Animations & Notifications :** `@angular/animations` & `ngx-toastr`
- **Gestion JWT :** `@auth0/angular-jwt`
- **Programmation réactive :** RxJS (~7.8)

---

## 📁 Structure du Projet

```text
src/
└── app/
    ├── add-ville/              # Composant d'ajout d'une ville (ADMIN)
    ├── update-ville/           # Composant de modification d'une ville (ADMIN)
    ├── villes/                 # Liste et affichage des villes
    ├── recherche-par-nom/      # Recherche de ville par son nom
    ├── recherche-par-pays/     # Recherche de ville par son pays
    ├── liste-pays/             # Gestion et affichage des pays
    ├── update-pays/            # Mise à jour des pays
    ├── login/                  # Page de connexion
    ├── register/               # Page d'inscription (avec spinner & validation)
    ├── verif-email/            # Validation du compte par code secret
    ├── forbidden/              # Page d'erreur 403 (accès refusé)
    ├── model/                  # Modèles TypeScript (Ville, Pays, User)
    ├── services/               # Services Angular (AuthService, VilleService, TokenInterceptor)
    ├── search-filter.pipe.ts   # Pipe de recherche personnalisé
    ├── ville.guard.ts          # Guard de sécurité des routes
    ├── app.routes.ts           # Configuration du routage
    ├── app.config.ts           # Providers de l'application (HttpClient, Interceptor, Toastr, Animations)
    └── app.ts                  # Composant racine
```

---

## ⚙️ Prérequis

- [Node.js](https://nodejs.org/) (version 20.x ou supérieure recommandée)
- [Angular CLI](https://angular.dev/tools/cli) (`npm install -g @angular/cli`)
- Les microservices backend Spring Boot démarrés :
  - **`users-microservice`** sur le port `8081` (`http://localhost:8081/users`)
  - **`ville`** sur le port `8080` (`http://localhost:8080/ville`)

---

## 💻 Installation & Démarrage

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/elae620/ProjetVille-frontend-.git
   cd ProjetVille-frontend-
   ```

2. **Installer les dépendances :**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement :**
   ```bash
   ng serve
   ```
   *(ou `npm start`)*

4. **Accéder à l'application :**
   Ouvrez votre navigateur sur [http://localhost:4200/](http://localhost:4200/).

---

## 📦 Build de Production

Pour compiler le projet pour la production :

```bash
ng build
```
Les fichiers générés se trouveront dans le répertoire `dist/ProjetVille`.
