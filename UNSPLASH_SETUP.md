# Unsplash Integration

Diese Website verwendet die Unsplash API, um hochwertige Fotos anzuzeigen.

## Setup auf Vercel

### 1. Unsplash Developer Account

1. Gehen Sie zu [Unsplash Developers](https://unsplash.com/developers)
2. Melden Sie sich an oder erstellen Sie ein Konto
3. Erstellen Sie eine neue Anwendung
4. Notieren Sie sich den **Access Key**

### 2. Umgebungsvariablen in Vercel

1. Gehen Sie zu Ihrem Vercel Dashboard
2. Wählen Sie Ihr Projekt aus
3. Gehen Sie zu **Settings** → **Environment Variables**
4. Fügen Sie folgende Variable hinzu:

```
Name: UNSPLASH_ACCESS_KEY
Value: [Ihr Unsplash Access Key]
Environment: Production, Preview, Development
```

### 3. Deployment

Nach dem Hinzufügen der Umgebungsvariable deployen Sie Ihr Projekt neu:

```bash
vercel --prod
```

## Funktionen

- **Foto-Suche**: Suchen Sie nach spezifischen Themen
- **Zufällige Fotos**: Entdecken Sie kuratierte Sammlungen
- **Download-Tracking**: Automatisches Tracking für API-Compliance
- **Responsive Galerie**: Optimiert für alle Bildschirmgrößen

## API-Routen

- `/api/unsplash/search` - Suche nach Fotos
- `/api/unsplash/random` - Zufällige Fotos
- `/api/unsplash/track-download` - Download-Tracking

## Sicherheit

Der API-Schlüssel wird sicher auf dem Server gespeichert und niemals an den Client übertragen. Alle Anfragen werden über sichere API-Routen geleitet.

## Usage Limits

Beachten Sie die [Unsplash API Rate Limits](https://unsplash.com/documentation#rate-limiting):
- Demo: 50 Anfragen pro Stunde
- Production: 5.000 Anfragen pro Stunde
