import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Layers,
  Filter,
  Users,
  Home,
  Droplets,
  Zap,
  Building2,
  Heart,
  Award,
  Star,
  BarChart3
} from "lucide-react";
import { ScrollAnimatedSection } from "../components/UI/ScrollAnimatedSection";
import { AnimatedCounter } from "../components/UI/AnimatedCounter";
import { Button } from "../components/UI/button";
import { GoogleMapSample } from "../components/UI/GoogleMapSample";

export const AtlasPage = () => {
  const [activeLayers, setActiveLayers] = useState(["water", "pmkisan"]);
  const [mapCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // India center

  const layerControls = [
    { id: "water", label: "Water Resources", color: "text-info", icon: Droplets, active: true },
    { id: "pmkisan", label: "PM-KISAN Coverage", color: "text-success", icon: Home, active: true },
    { id: "population", label: "Population Density", color: "text-warning", icon: Users, active: false },
    { id: "infrastructure", label: "Infrastructure", color: "text-accent", icon: Building2, active: false },
  ];

  const toggleLayer = (id: string) => {
    setActiveLayers((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <ScrollAnimatedSection className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-glass-glow">
          FRA Digital Atlas
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Interactive Geospatial Data Visualization for Informed Decision Making
        </p>
      </ScrollAnimatedSection>

      {/* Main Content - Map & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <ScrollAnimatedSection className="lg:col-span-2 glass-container p-4 rounded-2xl min-h-[600px]">
          <div className="w-full h-[560px] rounded-lg overflow-hidden">
            <GoogleMapSample center={mapCenter} activeTypes={activeLayers as any} />
          </div>
        </ScrollAnimatedSection>

        {/* Controls */}
        <div className="space-y-6">
          {/* Quick Filters */}
          <ScrollAnimatedSection className="glass-container p-6 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <Filter className="h-5 w-5 text-primary-glow" />
              <h3 className="text-lg font-semibold">Quick Filters</h3>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">All Schemes</Button>
              <Button variant="outline" className="w-full justify-start">Water Resources</Button>
              <Button variant="outline" className="w-full justify-start">PM-KISAN</Button>
            </div>
          </ScrollAnimatedSection>

          {/* Layer Controls */}
          <div className="glass-container p-6 rounded-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <Layers className="h-5 w-5 text-secondary" />
              <h3 className="text-lg font-semibold">Layer Controls</h3>
            </div>
            <div className="space-y-4">
              {layerControls.map((layer) => (
                <motion.div
                  key={layer.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-glass-highlight transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3">
                    <layer.icon className={`h-5 w-5 ${layer.color}`} />
                    <span className="text-sm font-medium">
                      {layer.label}
                    </span>
                  </div>
                  <motion.div
                    className="glass-switch w-12 h-6 relative cursor-pointer"
                    onClick={() => toggleLayer(layer.id)}
                    animate={{
                      backgroundColor: activeLayers.includes(layer.id) 
                        ? "hsl(var(--primary))" 
                        : "hsl(var(--muted))"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                      animate={{
                        left: activeLayers.includes(layer.id) ? "calc(100% - 1.25rem)" : "0.25rem"
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Thematic Map Generator */}
      <ScrollAnimatedSection className="glass-container p-8 rounded-2xl text-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Thematic Map Generator</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate custom correlation maps by selecting two data variables to identify hotspots and patterns
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="lg" className="hover:scale-105">
              <Zap className="h-5 w-5 mr-2" />
              Generate Water vs PM-KISAN Map
            </Button>
            <Button variant="outline" size="lg" className="hover:scale-105">
              <BarChart3 className="h-5 w-5 mr-2" />
              Custom Variable Selection
            </Button>
          </div>
        </div>
      </ScrollAnimatedSection>
    </div>
  );
};