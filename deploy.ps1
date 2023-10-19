# Imposta il terminatore dell'esecuzione su errore
$ErrorActionPreference = "Stop"

# Esegui il comando di build
npm run build

# Sposta nella cartella 'dist'
cd .\dist

# Inizializza una nuova repo Git
git init

# Aggiungi tutti i file al repository Git
git add .

# Esegui il commit dei file
git commit -m "New Deploy"

# Esegui il push dei file nel branch gh-pages
git push -f https://github.com/valee8/giesse.git master:gh-pages

# Torna indietro alla directory precedente
cd ..

# Opzionale: rimuovi la cartella 'dist'
Remove-Item -Recurse -Force .\dist