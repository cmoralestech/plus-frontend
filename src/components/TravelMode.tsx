"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Plane, MapPin, X, Navigation, Loader2 } from "lucide-react";

interface City {
  city: string;
  state: string | null;
  country: string;
  lat: number;
  lon: number;
}

interface LocationInfo {
  city: string | null;
  is_traveling: boolean;
  travel_city: string | null;
  active_city: string | null;
}

interface TravelModeProps {
  onCityChange?: (city: string | null) => void;
}

export default function TravelMode({ onCityChange }: TravelModeProps = {}) {
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);

  useEffect(() => {
    fetchLocation();
    fetchCities();
  }, []);

  const fetchLocation = async () => {
    try {
      const { data } = await api.get("/api/location/me");
      setLocation(data);
      if (data.is_traveling && data.travel_city) {
        onCityChange?.(data.travel_city);
      }
    } catch {}
  };

  const fetchCities = async () => {
    try {
      const { data } = await api.get("/api/location/popular-cities");
      setCities(data);
    } catch {}
  };

  const handleTravelTo = async (city: City) => {
    setLoading(true);
    try {
      const { data } = await api.post("/api/location/travel", {
        travel_city: city.city,
        travel_latitude: city.lat,
        travel_longitude: city.lon,
      });
      setLocation(data);
      setShowPanel(false);
      onCityChange?.(city.city);
    } catch {}
    setLoading(false);
  };

  const handleStopTravel = async () => {
    setLoading(true);
    try {
      const { data } = await api.delete("/api/location/travel");
      setLocation(data);
      onCityChange?.(null);
    } catch {}
    setLoading(false);
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) return;
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          await api.patch("/api/location/update", {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          await fetchLocation();
        } catch {}
        setGeoLoading(false);
      },
      () => setGeoLoading(false),
      { enableHighAccuracy: false, timeout: 10000 }
    );
  };

  if (!location) return null;

  return (
    <>
      {/* Location pill */}
      <button
        onClick={() => setShowPanel(!showPanel)}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors min-h-[36px] ${
          location.is_traveling
            ? "bg-accent/10 text-accent   "
            : "bg-muted-bg text-muted border border-card-border"
        }`}
      >
        {location.is_traveling ? (
          <>
            <Plane size={13} />
            {location.travel_city}
          </>
        ) : (
          <>
            <MapPin size={13} />
            {location.active_city || "Set location"}
          </>
        )}
      </button>

      {/* Travel panel */}
      {showPanel && (
        <div className="bg-card rounded-xl border border-card-border p-4 mt-3 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold flex items-center gap-1.5">
              <Plane size={15} className="text-accent" />
              {location.is_traveling ? "Currently traveling" : "Travel Mode"}
            </h3>
            <button onClick={() => setShowPanel(false)} className="p-1 text-muted hover:text-foreground" aria-label="Close">
              <X size={16} />
            </button>
          </div>

          {location.is_traveling ? (
            <div className="space-y-3">
              <p className="text-sm text-muted">
                Showing you to people in <span className="font-medium text-foreground">{location.travel_city}</span>.
                Your home location ({location.city}) is saved.
              </p>
              <button
                onClick={handleStopTravel}
                disabled={loading}
                className="w-full py-2.5 border border-card-border rounded-lg text-sm font-medium hover:bg-muted-bg transition-colors min-h-[44px]"
              >
                {loading ? "Stopping..." : "Back to home location"}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-muted">
                See and be seen by people in another city. Your home location is saved.
              </p>

              {/* Detect current location */}
              <button
                onClick={handleDetectLocation}
                disabled={geoLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 border border-accent/30 text-accent rounded-lg text-sm font-medium hover:bg-accent/5 transition-colors min-h-[44px]"
              >
                {geoLoading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Navigation size={14} />
                )}
                {geoLoading ? "Detecting..." : "Use my current location"}
              </button>

              {/* Popular cities grid */}
              <div>
                <p className="text-xs font-medium text-muted mb-2">Popular destinations</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {cities.map((city) => (
                    <button
                      key={`${city.city}-${city.country}`}
                      onClick={() => handleTravelTo(city)}
                      disabled={loading}
                      className="px-3 py-2 text-left rounded-lg border border-card-border hover:border-accent/30 hover:bg-accent/5 transition-colors text-sm min-h-[44px]"
                    >
                      <span className="font-medium">{city.city}</span>
                      <span className="text-muted text-xs ml-1">{city.country}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
