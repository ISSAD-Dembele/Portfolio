## Portfolio Laravel

Portfolio personnel (Laravel 9 + Blade + Vite).

### Prérequis
- **PHP**: 8.0+
- **Composer**
- **Node.js / npm**

### Installation

```bash
composer install
cp .env.example .env
php artisan key:generate
npm install
```

### Lancer en local

Deux options (recommandé: Vite en dev).

- **Option A — dev (hot reload)**:

```bash
npm run dev
php artisan serve
```

- **Option B — build (sans serveur Vite)**:

```bash
npm run build
php artisan serve
```

Puis ouvre `http://127.0.0.1:8000`.

### Routes utiles

- **Home**: `/` (nommée `home`)
- **Téléchargement CV (force download)**: `/cv/download` (nommée `cv.download`)
- **Accès direct au PDF**: `/pdf/ISSAD.pdf`

### Assets (photo + CV)

- **CV**: `public/pdf/ISSAD.pdf`
  - accessible via `/pdf/ISSAD.pdf`
  - téléchargeable via `/cv/download`
- **Photo**: `public/images/issaphoto.JPG`
  - utilisée dans `resources/views/partials/about.blade.php`

### Structure (vue rapide)

- **Routes**: `routes/web.php`
- **Vues**: `resources/views/layouts` + `resources/views/pages` + `resources/views/partials`
- **Assets**:
  - source: `resources/css/app.css`, `resources/js/app.js`
  - build: `public/build/*` (généré par Vite)

### Dépannage

- **Page blanche / erreur 500**: regarde la sortie dans le navigateur (Ignition) et/ou `storage/logs/laravel.log`.
- **Assets CSS/JS ne chargent pas**:
  - en dev: lance `npm run dev`
  - en prod: lance `npm run build` (doit générer `public/build/manifest.json`)