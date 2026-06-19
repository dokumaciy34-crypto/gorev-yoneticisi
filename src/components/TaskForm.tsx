import { useEffect, useState } from "react";
import {
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  type Category,
  type Priority,
  type Task,
  type TaskFormData,
} from "../interfaces/Task";

interface TaskFormProps {
  // EKLE ve GÜNCELLE işlemleri aynı formu kullanır.
  onSubmit: (data: TaskFormData) => void;
  editingTask: Task | null;
  onCancelEdit: () => void;
}

const emptyForm: TaskFormData = {
  title: "",
  description: "",
  priority: "medium",
  category: "kisisel",
};

export default function TaskForm({
  onSubmit,
  editingTask,
  onCancelEdit,
}: TaskFormProps) {
  const [form, setForm] = useState<TaskFormData>(emptyForm);
  const isEditing = editingTask !== null;

  // Düzenleme moduna geçilince form, seçilen görevin verisiyle dolar.
  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        category: editingTask.category,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit({ ...form, title: form.title.trim() });
    setForm(emptyForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <h2 className="mb-4 text-lg font-semibold text-slate-800">
        {isEditing ? "✏️ Görevi Güncelle" : "➕ Yeni Görev Ekle"}
      </h2>

      <input
        type="text"
        placeholder="Görev başlığı..."
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="mb-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />

      <textarea
        placeholder="Açıklama (opsiyonel)..."
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        rows={2}
        className="mb-3 w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />

      <div className="mb-4 grid grid-cols-2 gap-3">
        <label className="text-sm font-medium text-slate-600">
          Öncelik
          <select
            value={form.priority}
            onChange={(e) =>
              setForm({ ...form, priority: e.target.value as Priority })
            }
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none focus:border-indigo-500"
          >
            {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm font-medium text-slate-600">
          Kategori
          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value as Category })
            }
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 outline-none focus:border-indigo-500"
          >
            {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700 active:scale-[0.99]"
        >
          {isEditing ? "Güncelle" : "Ekle"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-600 transition hover:bg-slate-50"
          >
            İptal
          </button>
        )}
      </div>
    </form>
  );
}
