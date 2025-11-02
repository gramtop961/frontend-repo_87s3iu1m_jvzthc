import { useMemo } from "react";

function interpolate(a, b, t) {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

export default function MapView({ cities, origin, destination, buses }) {
  const originCity = useMemo(() => cities.find((c) => c.name === origin), [cities, origin]);
  const destCity = useMemo(() => cities.find((c) => c.name === destination), [cities, destination]);

  const width = 360;
  const height = 260;

  return (
    <section className="w-full max-w-screen-sm mx-auto px-4">
      <div className="relative rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50" />
        <svg viewBox={`0 0 ${width} ${height}`} className="relative block w-full" style={{ height: 260 }}>
          {/* grid background */}
          <defs>
            <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#E5E7EB" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width={width} height={height} fill="url(#grid)" />

          {/* draw connections between all cities lightly */}
          {cities.map((a) =>
            cities.map((b) =>
              a.name !== b.name ? (
                <line
                  key={`${a.name}-${b.name}`}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="#E5E7EB"
                  strokeWidth={1}
                />
              ) : null
            )
          )}

          {/* active route */}
          {originCity && destCity && (
            <>
              <line
                x1={originCity.x}
                y1={originCity.y}
                x2={destCity.x}
                y2={destCity.y}
                stroke="#2563EB"
                strokeWidth={4}
                strokeLinecap="round"
              />
              {/* endpoints */}
              <g>
                <circle cx={originCity.x} cy={originCity.y} r={8} fill="#1D4ED8" />
                <text x={originCity.x + 10} y={originCity.y - 10} fontSize="12" fill="#1F2937">
                  {originCity.name}
                </text>
              </g>
              <g>
                <circle cx={destCity.x} cy={destCity.y} r={8} fill="#16A34A" />
                <text x={destCity.x + 10} y={destCity.y - 10} fontSize="12" fill="#1F2937">
                  {destCity.name}
                </text>
              </g>
            </>
          )}

          {/* buses moving towards destination on the active line */}
          {originCity && destCity && buses.map((bus) => {
            const pos = interpolate(originCity, destCity, Math.min(1, Math.max(0, bus.progress)));
            return (
              <g key={bus.id}>
                <circle cx={pos.x} cy={pos.y} r={6} fill="#F59E0B" stroke="#92400E" strokeWidth={1} />
                <text x={pos.x + 8} y={pos.y - 8} fontSize="11" fill="#374151">
                  {bus.name}
                </text>
              </g>
            );
          })}

          {/* city nodes */}
          {cities.map((c) => (
            <g key={c.name}>
              <circle cx={c.x} cy={c.y} r={3} fill="#6B7280" />
            </g>
          ))}
        </svg>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-white to-white/40">
          <p className="text-xs text-gray-600">
            Visual map is illustrative. Live positions update as buses approach your destination.
          </p>
        </div>
      </div>
    </section>
  );
}
