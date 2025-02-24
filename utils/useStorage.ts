const isBrowser: boolean = typeof window !== "undefined";

export const storage = {
  setItem: (key: string, value: any) => {
    if (isBrowser) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  },
  getItem: (key: string) => {
    if (isBrowser) {
      try {
        const storedValue = window.localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        return null;
      }
    }
    return null;
  },
  removeItem: (key: string) => {
    if (isBrowser) {
      window.localStorage.removeItem(key);
    }
  },
  removeAll: () => {
    if (isBrowser) {
      window.localStorage.clear();
    }
  },
};
