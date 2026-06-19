// Uygulama genelinde kullanılan tip tanımları (TypeScript Interfaces)

export type Priority = "low" | "medium" | "high";

export type Category = "is" | "kisisel" | "okul" | "diger";

export type FilterType = "all" | "active" | "completed";

// Tek bir görevi temsil eden veri modeli
export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  category: Category;
  completed: boolean;
  createdAt: number;
}

// Form üzerinden gönderilen veri (id ve durum bilgisi içermez)
export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  category: Category;
}

// Açılır listelerde gösterilecek etiketler
export const PRIORITY_LABELS: Record<Priority, string> = {
  low: "Düşük",
  medium: "Orta",
  high: "Yüksek",
};

export const CATEGORY_LABELS: Record<Category, string> = {
  is: "İş",
  kisisel: "Kişisel",
  okul: "Okul",
  diger: "Diğer",
};
