import { useEffect, useState } from "react";

// Veriyi tarayıcının LocalStorage'ında saklayan ve senkron tutan özel hook.
// Sayfa yenilense bile görevler kaybolmaz.
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Kota dolu veya erişilemiyorsa sessizce geç
    }
  }, [key, value]);

  return [value, setValue] as const;
}
