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
    const convertLibrary = Object.entries(localStorage);
    const library = this.parseLibrary(convertLibrary);
    return library;
  }

  private delete(
    key: "books" | "notes" | "pages",
    newItem: t_book | t_note | t_page | (() => void)
  ) {
    if (typeof newItem === "function") return newItem();
    const filteredItems = this[key].filter((item) => item.id !== newItem.id);
    this[key] = filteredItems !== null ? filteredItems : (this[key] as any);
    localStorage.setItem(key, JSON.stringify(filteredItems));
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

  addPage(newPage: t_page) {
    const currentBook = this.books.find((book) => book.id === newPage.bookID);
    if (currentBook !== undefined) {
      this.save("pages", newPage);
      this.update("books", {
        ...currentBook,
        pageIDs: [...currentBook.pageIDs, newPage.id],
      });
    }
  }

  updatePage(updatedPage: t_page) {
    const currentBook = this.books.find(
      (book) => book.id === updatedPage.bookID
    );
    if (currentBook !== undefined) {
      this.update("pages", updatedPage);
      this.update("books", currentBook);
    }
  }

  // filter every note who's pageID matches the to be deleted page's ID
  removePage(page: t_page) {
    const currentBook = this.books.find((book) => book.id === page.bookID);
    if (currentBook !== undefined) {
      this.delete("pages", page);
      this.update("books", {
        ...currentBook,
        pageIDs: [
          ...currentBook.pageIDs.filter((pageID) => pageID !== page.id),
        ],
      });
      this.delete("notes", () => {
        const filterPageNotes = LibraryStorage.notes.filter(
          (note) => note.pageID !== page.id
        );

        LibraryStorage.notes =
          filterPageNotes !== null
            ? filterPageNotes
            : (LibraryStorage.notes as any);
        localStorage.setItem("notes", JSON.stringify(filterPageNotes));
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
  removeNote(note: t_note) {
    const currentPage = this.pages.find(
      (page) => page.id === note.pageID
    ) as t_page;

    const currentBook = this.books.find(
      (book) => book.id === note.bookID
    ) as t_book;

    this.delete("notes", note);
    this.update("pages", {
      ...currentPage,
      noteIDs: currentPage.noteIDs.filter((noteID) => noteID !== note.id),
    });

    this.update("books", currentBook);
  }

  updateNote(updatedNote: t_note) {
    const currentPage = this.pages.find(
      (page) => page.id === updatedNote.pageID
    );
    const currentBook = this.books.find(
      (book) => book.id === updatedNote.bookID
    );

    if (currentPage !== undefined && currentBook !== undefined) {
      this.update("pages", currentPage);
      this.update("notes", updatedNote);
      this.update("books", currentBook);
    }
  }

  addBook(newBook: t_book) {
    this.save("books", newBook);
  }

  updateBook(updatedBook: t_book) {
    this.update("books", updatedBook);
  }

  deleteBook(currentBook: t_book) {
    this.delete("notes", () => {
      const filteredNotes = this.notes.filter(
        (note) => note.bookID !== currentBook.id
      );
      this["notes"] = [...filteredNotes];
    });
    this.delete("pages", () => {
      const filteredNotes = this.pages.filter(
        (page) => page.bookID !== currentBook.id
      );
      this["pages"] = [...filteredNotes];
    });
    this.delete("books", currentBook);
  }
}
const LibraryStorage = Library.getInstance();
export default LibraryStorage;
