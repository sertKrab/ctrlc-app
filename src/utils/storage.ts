type StorageType = 'local' | 'session';

function resolveStorage(type: StorageType): Storage {
  return type === 'session' ? sessionStorage : localStorage;
}

export function getItem<T>(key: string, type: StorageType = 'local'): T | null {
  try {
    const raw = resolveStorage(type).getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function setItem<T>(key: string, value: T, type: StorageType = 'local'): void {
  try {
    resolveStorage(type).setItem(key, JSON.stringify(value));
  } catch {
    // Storage may be unavailable (e.g. private browsing quota)
  }
}

export function removeItem(key: string, type: StorageType = 'local'): void {
  try {
    resolveStorage(type).removeItem(key);
  } catch {
    // Ignore
  }
}

export function clearStorage(type: StorageType = 'local'): void {
  try {
    resolveStorage(type).clear();
  } catch {
    // Ignore
  }
}
