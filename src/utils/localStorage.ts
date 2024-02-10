import { t_library } from "../types/t_library";

class LocalStorage {
  private static instance: LocalStorage | null = null;
  hello: string;
  private constructor(hello: string) {
    this.hello = hello;
  }

  static getInstance() {
    if (LocalStorage.instance === null) {
      LocalStorage.instance = new LocalStorage("Hello");
    }
    return LocalStorage.instance;
  }

  private parseLocalStorage(arr: any) {
    const [notes, pages, books] = arr.map((item: any) => {
      return [...JSON.parse(item[1])];
    });
    return { notes, pages, books };
  }

  getLocalStorage(): t_library {
    const convertLocalStorage = Object.entries(localStorage);
    const library = this.parseLocalStorage(convertLocalStorage);
    return library;
  }

  removeItem(item: any) {
    localStorage.removeItem(item.id);
  }
  addItem(item: any) {
    localStorage.setItem(item.id, JSON.stringify(item));
  }

  updateItem(item: any) {
    localStorage.setItem(item.id, JSON.stringify(item));
  }

  localStorageItemExist(itemId: string) {
    const convertLocalStorage = Object.entries(localStorage);
    const getKeys = convertLocalStorage.map((item) => item[0]);
    const checkKey = getKeys.find((item) => item === itemId);
    return checkKey !== undefined ? true : false;
  }
}
const LibraryStorage = LocalStorage.getInstance();
export default LibraryStorage;
