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

  remove(item: any) {
    localStorage.removeItem(item);
  }

  save<Type>(key: string, newItem: t_book | t_note | t_page) {
    const existingItems = this.parseItems<Type>(key);
    localStorage.setItem(key, JSON.stringify([newItem, ...existingItems]));
  }

  addPage(bookID: string, newPage: t_page) {
    const { books, pages } = this.getLocalStorage();
    const currentBook = books.find((book) => book.id === bookID);
    if (currentBook !== undefined) {
      const filteredBooks = books.filter((book) => {
        if (book.id !== currentBook.id)
          return { ...book, pageIDs: [...book.pageIDs, newPage.id] };
      });
      pages.push(newPage);
      localStorage.setItem(
        "books",
        JSON.stringify([currentBook, ...filteredBooks])
      );
      localStorage.setItem("pages", JSON.stringify(pages));
    }
  }

  addNote(newNote: t_note) {
    const { notes, pages, books } = this.getLocalStorage();
    const currentBook = books.find((book) => book.id === newNote.bookID);
    const updatePage = pages.map((page) => {
      if (page.id === newNote.pageID)
        return {
          ...page,
          lastUpdated: newNote.lastUpdated,
          noteIDs: [...page.noteIDs, newNote.id],
        };
      return page;
    });
    if (currentBook !== undefined) {
      const filteredBooks = books.filter((book) => book.id !== newNote.bookID);
      notes.push(newNote);
      localStorage.setItem("notes", JSON.stringify(notes));
      localStorage.setItem("pages", JSON.stringify(updatePage));
      localStorage.setItem(
        "books",
        JSON.stringify([
          { ...currentBook, lastUpdated: newNote.lastUpdated },
          ...filteredBooks,
        ])
      );
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
