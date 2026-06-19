import {
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  type Priority,
  type Task,
} from "../interfaces/Task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

// Öncelik seviyesine göre renkli rozet sınıfları
const priorityStyles: Record<Priority, string> = {
  low: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-rose-100 text-rose-700",
};

// Tek bir görev kartı. GÜNCELLE ve SİL butonlarını barındırır.
export default function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  return (
    <li className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-indigo-600"
        aria-label="Tamamlandı olarak işaretle"
      />

      <div className="min-w-0 flex-1">
        <h3
          className={`font-semibold text-slate-800 ${
            task.completed ? "text-slate-400 line-through" : ""
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p
            className={`mt-0.5 text-sm text-slate-500 ${
              task.completed ? "line-through" : ""
            }`}
          >
            {task.description}
          </p>
        )}

        <div className="mt-2 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyles[task.priority]}`}
          >
            {PRIORITY_LABELS[task.priority]} öncelik
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            {CATEGORY_LABELS[task.category]}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 gap-1">
        <button
          onClick={() => onEdit(task)}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
          aria-label="Düzenle"
          title="Düzenle"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
          aria-label="Sil"
          title="Sil"
        >
          🗑️
        </button>
      </div>
    </li>
  );
}
