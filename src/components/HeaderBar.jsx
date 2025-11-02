import { Bus, MapPin } from "lucide-react";

export default function HeaderBar() {
  return (
    <header className="sticky top-0 z-20 w-full bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100">
      <div className="max-w-screen-sm mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Bus size={18} />
          </span>
          <div>
            <p className="text-sm text-gray-500 leading-none">Catch the right ride</p>
            <h1 className="text-base font-semibold text-gray-900 leading-tight">City Bus Tracker</h1>
          </div>
        </div>
        <div className="flex items-center gap-1 text-blue-600">
          <MapPin size={18} />
          <span className="text-sm font-medium">Live</span>
        </div>
      </div>
    </header>
  );
}
