### Google Maps Setup

Add a Vite env var with your Google Maps JavaScript API key.

1) Create a file named `.env` in the project root with:

```
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE
```

2) Ensure the "Maps JavaScript API" is enabled in your Google Cloud project and restrict the key to localhost for development.

3) Install and run:

```
npm install
npm run dev
```

Open `/` to see the FRA Atlas with sample markers rendered on the map.

Markers source: `src/data/locations.ts`. Toggle filters on the page control which markers are visible.

