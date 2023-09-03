export class LocalStorage {
  has(key) {
    return Boolean(localStorage.getItem(key));
  }

  get(key) {
    return localStorage.getItem(key);
  }

  set(key, value) {
    localStorage.setItem(key, value);
  }

  delete(key) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
