const saveItemToLocalStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const removeItemFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

const getItemFromLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return item;
    }
    return JSON.parse(item);
  } catch (error) {
    return null;
  }
};

export {
  saveItemToLocalStorage,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
};
