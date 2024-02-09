export type t_book = {
  id: string;
  title: string;
  author: string;
  pageIDs: Array<string>;
  dateAdded: string;
  lastUpdated: string;
};

export type t_page = {
  pageNum: number;
  id: string;
  bookID: string;
  noteIDs: Array<string>;
  dateAdded: string;
  lastUpdated: string;
};

export interface t_note {
  bookID: string;
  noteNum: number;
  pageID: string;
  id: string;
  contents: string;
  dateAdded: string;
  lastUpdated: string;
}

export type t_library = {
  books: Array<t_book>;
  pages: Array<t_page>;
  notes: Array<t_note>;
};

export interface t_currentBook extends t_book {
  note: Array<t_note>;
  page: t_page;
}

export type t_noteEditing = {
  isEditing: boolean;
};

export type t_extendedNote = t_note & t_noteEditing;

export type t_currentPage = {
  currentPage: t_page;
  book: { title: string; author: string };
  notes: Array<t_extendedNote>;
};
