import { Bus, Navigation, Wallet } from "lucide-react";

function formatMinutes(min) {
  if (min < 1) return "<1 min";
  if (min < 60) return `${Math.round(min)} min`;
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return `${h}h ${m}m`;
}

export default function BusList({ buses, onPay }) {
  const currency = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" });

  return (
    <section className="w-full max-w-screen-sm mx-auto px-4 py-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">
              <Bus size={16} />
            </span>
            <h2 className="text-sm font-semibold text-gray-900">Incoming buses</h2>
          </div>
          <p className="text-xs text-gray-500">Sorted by ETA</p>
        </div>
        <ul className="divide-y divide-gray-100">
          {buses.map((b) => (
            <li key={b.id} className="py-3 flex items-center gap-3">
              <div className="flex-none">
                <div className="h-10 w-10 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center border border-yellow-200">
                  <Bus size={18} />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">{b.name}</p>
                  <p className="text-xs text-gray-500">ETA {formatMinutes(b.etaMins)}</p>
                </div>
                <div className="mt-0.5 flex items-center justify-between">
                  <p className="text-xs text-gray-600 flex items-center gap-1">
                    <Navigation size={14} className="text-blue-600" />
                    {b.from} → {b.to}
                    <span className="mx-2 h-1 w-1 rounded-full bg-gray-300" />
                    {b.distanceRemainingKm.toFixed(1)} km left
                  </p>
                  <p className="text-sm font-semibold text-gray-900">{currency.format(b.fare)}</p>
                </div>
              </div>
              <div className="flex-none">
                <button
                  className="inline-flex items-center gap-1 rounded-full bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => onPay(b)}
                >
                  <Wallet size={14} /> Pay
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
