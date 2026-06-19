import type { FilterType } from "../interfaces/Task";

interface FilterBarProps {
  filter: FilterType;
  onChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: "all", label: "Tümü" },
  { value: "active", label: "Aktif" },
  { value: "completed", label: "Tamamlanan" },
];

// Görev listesini duruma göre filtreleyen sekme çubuğu
export default function FilterBar({ filter, onChange }: FilterBarProps) {
  return (
    <div className="flex gap-2 rounded-xl bg-slate-100 p-1">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
            filter === f.value
              ? "bg-white text-indigo-600 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
