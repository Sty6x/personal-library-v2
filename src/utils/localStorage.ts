import { t_library, t_note, t_page, t_book } from "../types/t_library";

class LocalStorage {
  private static instance: LocalStorage | null = null;
  hello: string;
  books: Array<t_book> | [];
  pages: Array<t_page> | [];
  notes: Array<t_note> | [];
  private constructor(hello: string) {
    this.hello = hello;
    this.books = [];
    this.pages = [];
    this.notes = [];
    this.populateLibrary();
  }
  private populateLibrary() {
    const { notes, books, pages } = this.getLocalStorage();
    this.books = books;
    this.notes = notes;
    this.pages = pages;
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

  private getLocalStorage(): t_library {
    const convertLocalStorage = Object.entries(localStorage);
    const library = this.parseLocalStorage(convertLocalStorage);
    return library;
  }

  private remove(item: any) {
    localStorage.removeItem(item);
  }

  private save(
    key: "books" | "notes" | "pages",
    newItem: t_book | t_note | t_page
  ) {
    const prependNewItem = [newItem, ...this[key]];
    this[key] = prependNewItem !== null ? prependNewItem : ([] as any);
    localStorage.setItem(key, JSON.stringify(prependNewItem));
  }

  private update(
    key: "books" | "notes" | "pages",
    updatedItem: t_book | t_note | t_page
  ) {
    if (updatedItem !== null) {
      const updateItems = this[key].map((item) => {
        if (item.id === updatedItem?.id) {
          return {
            ...item,
            ...updatedItem,
            lastUpdated: new Date().toString(),
          };
        }
        return item;
      });
      this[key] = updateItems !== null ? updateItems : ([] as any);
      localStorage.setItem(key, JSON.stringify(updateItems));
    }
  }

  addPage(bookID: string, newPage: t_page) {
    const currentBook = this.books.find((book) => book.id === bookID);
    if (currentBook !== undefined) {
      this.save("pages", newPage);
      this.update("books", {
        ...currentBook,
        pageIDs: [...currentBook.pageIDs, newPage.id],
      });
    }
  }

  addNote(newNote: t_note) {
    const currentPage = this.pages.find((page) => page.id === newNote.pageID);
    const currentBook = this.books.find((book) => book.id === newNote.bookID);

    if (currentPage !== undefined && currentBook !== undefined) {
      this.update("pages", {
        ...currentPage,
        noteIDs: [...currentPage.noteIDs, newNote.id],
      });

      this.save("notes", newNote);
      this.update("books", currentBook);
    }
  }

  localStorageItemExist(itemId: string) {
    const convertLocalStorage = Object.entries(localStorage);
    const getKeys = convertLocalStorage.map((item) => item[0]);
    const checkKey = getKeys.find((item) => item === itemId);
    return checkKey !== null ? true : false;
  }
}
const LibraryStorage = LocalStorage.getInstance();
export default LibraryStorage;
