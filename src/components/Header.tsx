interface HeaderProps {
  total: number;
  completed: number;
}

// Üst başlık alanı: uygulama adı ve özet istatistikler
export default function Header({ total, completed }: HeaderProps) {
  const active = total - completed;

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white shadow-lg">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <div className="flex items-center gap-3">
          <span className="text-4xl">✅</span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Görev Yöneticisi
            </h1>
            <p className="text-sm text-indigo-100">
              React + TypeScript + Tailwind CSS ile geliştirildi
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <Stat label="Toplam" value={total} />
          <Stat label="Aktif" value={active} />
          <Stat label="Tamamlanan" value={completed} />
        </div>
      </div>
    </header>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-white/15 px-4 py-3 text-center backdrop-blur">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs uppercase tracking-wide text-indigo-100">
        {label}
      </div>
    </div>
  );
}
