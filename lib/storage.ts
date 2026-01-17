export const STORAGE_KEYS = {
  SHEET_SNAP_INDEX: 'sheetSnapIndex',
} as const;

export const getSessionItem = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    console.warn(`Error reading from sessionStorage key "${key}":`, error);
    return null;
  }
};

export const setSessionItem = (key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Error writing to sessionStorage key "${key}":`, error);
  }
};

export const removeSessionItem = (key: string): void => {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing from sessionStorage key "${key}":`, error);
  }
};
