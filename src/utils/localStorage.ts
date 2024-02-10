import { json } from "react-router-dom";
import { t_library, t_note, t_page, t_book } from "../types/t_library";
import bookLoader from "./loader/bookLoader";

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

  private parseItems<Type>(key: string): Array<Type> {
    const items = localStorage.getItem(key);
    return JSON.parse(items as string);
  }

  getLocalStorage(): t_library {
    const convertLocalStorage = Object.entries(localStorage);
    const library = this.parseLocalStorage(convertLocalStorage);
    return library;
  }

  removeItem(item: any) {
    localStorage.removeItem(item);
  }
  addPage(bookID: string, newPage: t_page) {
    const parsedBooksArray = this.parseItems<t_book>("books" as string);
    const parsedPagesArray = this.parseItems<t_page>("pages" as string);
    const currentBook = parsedBooksArray.find((book) => book.id === bookID);
    if (currentBook !== undefined) {
      const filteredBooks = parsedBooksArray.filter(
        (book) => book.id !== currentBook.id
      );
      currentBook.pageIDs.push(newPage.id);
      parsedPagesArray.push(newPage);
      localStorage.setItem(
        "books",
        JSON.stringify([currentBook, ...filteredBooks])
      );

      localStorage.setItem("pages", JSON.stringify(parsedPagesArray));
    }
  }

  addNote(bookID: string, newPage: t_page) {
    const parsedBooksArray = this.parseItems<t_book>("books" as string);
    const parsedPagesArray = this.parseItems<t_page>("pages" as string);
    const currentBook = parsedBooksArray.find((book) => book.id === bookID);
    if (currentBook !== undefined) {
      const filterBooks = parsedBooksArray.filter((book) => book.id !== bookID);
      currentBook.pageIDs.push(newPage.id);
      parsedPagesArray.push(newPage);
    }
  }

  updateItem(item: any) {
    localStorage.setItem(item, JSON.stringify(item));
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
