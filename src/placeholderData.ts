import { t_book, t_library, t_note, t_page } from "./types/t_library";

const books: Array<t_book> = [
  {
    id: "A",
    title: "The Great Book",
    author: "John Doe",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-01",
    pageIDs: ["page-1", "page-2"],
  },
  {
    id: "B",
    title: "Fantastic Stories",
    author: "Jane Smith",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-15",
    pageIDs: ["page-3", "page-4"],
  },

  {
    id: "C",
    title: "Person",
    author: "Arhuan loranbi",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-15",
    pageIDs: ["page-6", "page-5"],
  },
];

const pages: Array<t_page> = [
  {
    id: "page-1",
    pageNum: 1,
    lastUpdated: "2024-01-01",
    dateAdded: "2024-01-05",
    bookID: "A",
    noteIDs: ["note-1", "note-2"],
  },
  {
    id: "page-2",
    pageNum: 2,
    lastUpdated: "2024-01-24",
    dateAdded: "2024-01-10",
    bookID: "A",
    noteIDs: ["note-3"],
  },
  {
    id: "page-3",
    pageNum: 1,
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-20",
    bookID: "B",
    noteIDs: ["note-4", "note-5"],
  },
  {
    id: "page-4",
    pageNum: 2,
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-25",
    bookID: "B",
    noteIDs: ["note-6"],
  },

  {
    id: "page-5",
    pageNum: 1,
    lastUpdated: "2024-02-01",
    dateAdded: "2024-01-20",
    bookID: "C",
    noteIDs: ["note-1", "note-3"],
  },
  {
    id: "page-6",
    pageNum: 2,
    lastUpdated: "2024-02-03",
    dateAdded: "2024-01-25",
    bookID: "C",
    noteIDs: ["note-6"],
  },
];

const notes: Array<t_note> = [
  {
    id: "note-1",
    bookID: "A",
    pageID: "page-1",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-07",
    contents: "This is a note about page 1 of Book A.",
  },
  {
    id: "note-2",
    bookID: "A",
    pageID: "page-1",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-09",
    contents: "Another note about page 1 of Book A.",
  },
  {
    id: "note-3",
    bookID: "A",
    pageID: "page-2",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-12",
    contents: "Note about page 2 of Book A.",
  },
  {
    id: "note-4",
    bookID: "B",
    pageID: "page-3",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-22",
    contents: "Note about page 1 of Book B.",
  },
  {
    id: "note-5",
    bookID: "B",
    pageID: "page-3",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-23",
    contents: "Another note about page 1 of Book B.",
  },
  {
    id: "note-6",
    bookID: "B",
    pageID: "page-4",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-28",
    contents: "Note about page 2 of Book B.",
  },

  {
    id: "note-10",
    bookID: "C",
    pageID: "page-5",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-23",
    contents: "Another note about page 5 of Book C.",
  },
  {
    id: "note-3",
    bookID: "C",
    pageID: "page-5",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-28",
    contents: "Note about page 5 of Book C.",
  },

  {
    id: "note-6",
    bookID: "C",
    pageID: "page-6",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-28",
    contents: "Note about page 6 of Book C.",
  },
];

export const data: t_library = { books, pages, notes };
