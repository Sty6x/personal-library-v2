import { t_library, t_note, t_page, t_book } from "../types/t_library";

class Library {
  private static instance: Library | null = null;
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
    const { notes, books, pages } = this.getLibrary();
    this.books = books;
    this.notes = notes;
    this.pages = pages;
  }

  static getInstance() {
    if (Library.instance === null) {
      Library.instance = new Library("Hello");
    }
    return Library.instance;
  }

  private parseLibrary(arr: any) {
    const [notes, pages, books] = arr.map((item: any) => {
      return [...JSON.parse(item[1])];
    });
    return { notes, pages, books };
  }

  private getLibrary(): t_library {
    const convertLibrary = Object.entries(Library);
    const library = this.parseLibrary(convertLibrary);
    return library;
  }

  private save(
    key: "books" | "notes" | "pages",
    newItem: t_book | t_note | t_page
  ) {
    const prependNewItem = [newItem, ...this[key]];
    this[key] = prependNewItem !== null ? prependNewItem : (this[key] as any);
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
      this[key] = updateItems !== null ? updateItems : (this[key] as any);
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
}
const LibraryStorage = Library.getInstance();
export default LibraryStorage;
