import { memo, useMemo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { sampleLocations } from "@/data/locations";

type LatLngLiteral = { lat: number; lng: number };
type GoogleMapSampleProps = {
  center?: LatLngLiteral;
  activeTypes?: Array<"water" | "pmkisan" | "population" | "infrastructure">;
};

const containerStyle = { width: "100%", height: "100%" } as const;

function GoogleMapSampleImpl({ center, activeTypes }: GoogleMapSampleProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  const defaultCenter = useMemo(() => ({ lat: 20.5937, lng: 78.9629 }), []);

  const filtered = useMemo(() => {
    if (!activeTypes || activeTypes.length === 0) return sampleLocations;
    return sampleLocations.filter((l) => activeTypes.includes(l.type));
  }, [activeTypes]);

  if (!isLoaded) {
    return (
      <div className="w-full h-full grid place-items-center text-muted-foreground">
        Loading map...
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center ?? defaultCenter}
      zoom={5}
      options={{ streetViewControl: false, mapTypeControl: false }}
   >
      {filtered.map((loc) => (
        <Marker key={loc.id} position={{ lat: loc.lat, lng: loc.lng }} title={loc.name} />
      ))}
    </GoogleMap>
  );
}

export const GoogleMapSample = memo(GoogleMapSampleImpl);


