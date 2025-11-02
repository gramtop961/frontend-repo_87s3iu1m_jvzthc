import { ArrowLeftRight, MapPin } from "lucide-react";

export default function CitySelector({ cities, origin, destination, onChange }) {
  return (
    <section className="w-full max-w-screen-sm mx-auto px-4 py-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-gray-600">
              <MapPin size={16} />
            </span>
            <div className="flex-1">
              <label className="text-xs text-gray-500">From</label>
              <select
                value={origin}
                onChange={(e) => onChange({ origin: e.target.value, destination })}
                className="mt-0.5 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {cities.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => onChange({ origin: destination, destination: origin })}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <ArrowLeftRight size={14} /> Swap
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-gray-600">
              <MapPin size={16} />
            </span>
            <div className="flex-1">
              <label className="text-xs text-gray-500">To</label>
              <select
                value={destination}
                onChange={(e) => onChange({ origin, destination: e.target.value })}
                className="mt-0.5 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {cities.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
