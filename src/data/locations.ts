export type LocationItem = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: "water" | "pmkisan" | "population" | "infrastructure";
};

export const sampleLocations: LocationItem[] = [
  { id: "delhi-water", name: "Yamuna Barrage", lat: 28.6139, lng: 77.209, type: "water" },
  { id: "mumbai-pmkisan", name: "PM-KISAN Center", lat: 19.076, lng: 72.8777, type: "pmkisan" },
  { id: "kolkata-pop", name: "High Density Ward", lat: 22.5726, lng: 88.3639, type: "population" },
  { id: "bengaluru-infra", name: "Tech Park", lat: 12.9716, lng: 77.5946, type: "infrastructure" },
  { id: "hydr-water", name: "Reservoir Site", lat: 17.385, lng: 78.4867, type: "water" },
  { id: "jaipur-pmkisan", name: "Agri Outreach", lat: 26.9124, lng: 75.7873, type: "pmkisan" },
];


