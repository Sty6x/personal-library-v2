export type t_book = {
  bookID: string;
  title: string;
  author: string;
  pageIDs: Array<string>;
  dateAdded: string;
  lastUpdated: string;
};

export type t_page = {
  pageNum: number;
  pageID: string;
  bookID: string;
  noteIDs: Array<string>;
  dateAdded: string;
  lastUpdated: string;
};

export type t_note = {
  bookID: string;
  pageID: string;
  noteID: string;
  contents: string;
  dateAdded: string;
  lastUpdated: string;
};

export type t_library = {
  books: Array<t_book>;
  pages: Array<t_page>;
  notes: Array<t_note>;
};
