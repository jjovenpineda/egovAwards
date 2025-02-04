const isBrowser: boolean = typeof window !== "undefined";

export const storage = {
  setItem: (key: string, value: any) => {
    if (isBrowser) {
      window.localStorage.setItem(key, value);
    }
  },
  getItem: (key: string) => {
    if (isBrowser) {
      return window.localStorage.getItem(key) || null;
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
