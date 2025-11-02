import { useMemo, useState } from "react";
import HeaderBar from "./components/HeaderBar";
import CitySelector from "./components/CitySelector";
import MapView from "./components/MapView";
import BusList from "./components/BusList";

// Simple city coordinates for illustrative map (0-360 x 0-260 space)
const CITY_MAP = [
  { name: "Central City", x: 60, y: 200 },
  { name: "Northville", x: 100, y: 40 },
  { name: "Eastport", x: 300, y: 120 },
  { name: "Southgate", x: 220, y: 230 },
  { name: "Westhaven", x: 40, y: 120 },
];

function distanceUnits(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export default function App() {
  const [origin, setOrigin] = useState("Central City");
  const [destination, setDestination] = useState("Eastport");

  const { originCity, destCity } = useMemo(() => {
    return {
      originCity: CITY_MAP.find((c) => c.name === origin) || CITY_MAP[0],
      destCity: CITY_MAP.find((c) => c.name === destination) || CITY_MAP[1],
    };
  }, [origin, destination]);

  // Conversion: map unit ~ 2.2 km (arbitrary for demo)
  const unitToKm = 2.2;
  const baseDistanceKm = useMemo(() => distanceUnits(originCity, destCity) * unitToKm, [originCity, destCity]);

  const buses = useMemo(() => {
    const now = Date.now();
    // Create three buses heading to destination at different progress levels
    const templates = [
      { id: "A", name: "Blue Line A", progress: 0.25, speedKmh: 50 },
      { id: "B", name: "Express B", progress: 0.55, speedKmh: 70 },
      { id: "C", name: "Regional C", progress: 0.85, speedKmh: 60 },
    ];

    return templates.map((t, idx) => {
      const remainingKm = Math.max(0, (1 - t.progress) * baseDistanceKm);
      const etaHours = remainingKm / Math.max(20, t.speedKmh);
      const etaMins = etaHours * 60;
      const fareRate = 0.5; // $ per km
      const fare = remainingKm * fareRate;
      return {
        id: t.id + origin + destination + idx + now,
        name: t.name,
        from: originCity.name,
        to: destCity.name,
        progress: t.progress,
        etaMins,
        distanceRemainingKm: remainingKm,
        fare,
      };
    }).sort((a, b) => a.etaMins - b.etaMins);
  }, [originCity, destCity, baseDistanceKm, origin, destination]);

  const handleCityChange = ({ origin: o, destination: d }) => {
    setOrigin(o);
    setDestination(d);
  };

  const handlePay = (bus) => {
    const fmt = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" });
    alert(`Payment initiated for ${bus.name} to ${bus.to}\nDistance: ${bus.distanceRemainingKm.toFixed(1)} km\nAmount: ${fmt.format(bus.fare)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <HeaderBar />

      <CitySelector
        cities={CITY_MAP}
        origin={origin}
        destination={destination}
        onChange={handleCityChange}
      />

      <MapView cities={CITY_MAP} origin={origin} destination={destination} buses={buses} />

      <BusList buses={buses} onPay={handlePay} />

      <footer className="py-8 text-center text-xs text-gray-500">
        Fares are estimates. For production, connect to live transit and payments APIs.
      </footer>
    </div>
  );
}
