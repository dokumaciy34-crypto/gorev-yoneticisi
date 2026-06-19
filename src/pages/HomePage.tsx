import { useMemo, useState } from "react";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import FilterBar from "../components/FilterBar";
import TaskList from "../components/TaskList";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { FilterType, Task, TaskFormData } from "../interfaces/Task";

// Başlangıçta gösterilecek örnek görevler (LocalStorage boşsa yüklenir)
const seedTasks: Task[] = [
  {
    id: "seed-1",
    title: "Projeyi GitHub'a yükle",
    description: "Public repo oluştur ve kodları gönder.",
    priority: "high",
    category: "okul",
    completed: false,
    createdAt: 1,
  },
  {
    id: "seed-2",
    title: "Netlify ile yayına al",
    description: "Repoyu bağla ve build ayarlarını yap.",
    priority: "medium",
    category: "okul",
    completed: false,
    createdAt: 2,
  },
];

// Benzersiz kimlik üretici
function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.floor(Math.random() * 1_000_000)}`;
}

// Ana sayfa: dört CRUD işleminin (Ekle / Listele / Güncelle / Sil) yönetildiği yer.
export default function HomePage() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("gorev-yoneticisi", seedTasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");

  // EKLE veya GÜNCELLE: düzenleme modundaysa mevcut görevi günceller, değilse yeni ekler.
  const handleSubmit = (data: TaskFormData) => {
    if (editingTask) {
      // GÜNCELLEME işlemi
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...data } : t))
      );
      setEditingTask(null);
    } else {
      // EKLEME işlemi
      const newTask: Task = {
        id: createId(),
        ...data,
        completed: false,
        createdAt: Date.now(),
      };
      setTasks((prev) => [newTask, ...prev]);
    }
  };

  // Tamamlandı durumunu değiştir (bir güncelleme türü)
  const handleToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // SİLME işlemi
  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (editingTask?.id === id) setEditingTask(null);
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  // Seçilen filtreye göre listeyi hesapla
  const visibleTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((t) => !t.completed);
    if (filter === "completed") return tasks.filter((t) => t.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header total={tasks.length} completed={completedCount} />

      <main className="mx-auto max-w-3xl space-y-5 px-6 py-8">
        <TaskForm
          onSubmit={handleSubmit}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        <FilterBar filter={filter} onChange={setFilter} />

        <TaskList
          tasks={visibleTasks}
          onToggle={handleToggle}
          onEdit={setEditingTask}
          onDelete={handleDelete}
        />
      </main>

      <footer className="py-6 text-center text-sm text-slate-400">
        Görev Yöneticisi · Web Geliştirme JavaScript Projesi
      </footer>
    </div>
  );
}
