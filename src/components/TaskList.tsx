import type { Task } from "../interfaces/Task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

// LISTELEME işlemi: görevleri kart olarak sıralar, liste boşsa bilgi mesajı gösterir.
export default function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-10 text-center">
        <div className="text-4xl">📭</div>
        <p className="mt-2 text-slate-500">
          Burada henüz görev yok. Yukarıdan yeni bir görev ekleyebilirsin.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
