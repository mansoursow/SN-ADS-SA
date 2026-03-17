# Mémorandum — mini-site (statique)

## Ouvrir le site

Option 1 (simple) :
- Ouvrir `memorandum-site/index.html` dans votre navigateur.

Option 2 (recommandé) : lancer un petit serveur local (pour éviter certaines restrictions navigateur)

### Avec Python (si installé)

Dans un terminal, depuis le dossier `memorandum-site/` :

```bash
python -m http.server 5173
```

Puis ouvrir `http://localhost:5173`.

### Avec Node (si installé)

```bash
npx serve .
```

## Personnalisation rapide

- Couleurs : `memorandum-site/styles.css` (variables `--blue`, `--orange`, etc.)
- Texte : `memorandum-site/index.html`
- Animations : `memorandum-site/app.js`

