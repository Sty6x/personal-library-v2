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
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-15",
    pageIDs: ["page-3", "page-4"],
  },

  {
    id: "C",
    title: "1984",
    author: "George Orwell",
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
    noteIDs: ["note-4", "note-5", "note-22", "note-32"],
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
    noteIDs: ["note-1", "note-12"],
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
    index: 0,
    noteNum: 1,
    bookID: "A",
    pageID: "page-1",
    lastUpdated: "2024-01-20",
    dateAdded: "2024-01-07",
    contents: "This is a note about page 1 of Book A.",
  },
  {
    id: "note-2",
    index: 0,
    noteNum: 2,
    bookID: "A",
    pageID: "page-1",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-09",
    contents: "Another note about page 1 of Book A.",
  },
  {
    id: "note-3",
    index: 0,
    noteNum: 3,
    bookID: "A",
    pageID: "page-2",
    lastUpdated: "2024-1-01",
    dateAdded: "2024-01-12",
    contents: "Note about page 2 of Book A.",
  },
  {
    id: "note-4",
    index: 0,
    noteNum: 5,
    bookID: "B",
    pageID: "page-3",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-22",
    contents: `“Women should be respected as well! Generally speaking, men are held in great esteem in all parts of the world, so why shouldn't women have their share? Soldiers and war heroes are honored and commemorated, explorers are granted immortal fame, martyrs are revered, but how many people look upon women too as soldiers?...Women, who struggle and suffer pain to ensure the continuation of the human race, make much tougher and more courageous soldiers than all those big-mouthed freedom-fighting heroes put together!”― Anne Frank, The Diary of a Young Girl"`,
  },

  {
    id: "note-32",
    index: 0,
    noteNum: 5,
    bookID: "B",
    pageID: "page-10",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-22",
    contents: `“Women should be respected as well! Generally speaking, men are held in great esteem in all parts of the world, so why shouldn't women have their share? Soldiers and war heroes are honored and commemorated, explorers are granted immortal fame, martyrs are revered, but how many people look upon women too as soldiers?...Women, who struggle and suffer pain to ensure the continuation of the human race, make much tougher and more courageous soldiers than all those big-mouthed freedom-fighting heroes put together!”― Anne Frank, The Diary of a Young Girl"`,
  },

  {
    id: "note-22",
    index: 0,
    noteNum: 1,
    bookID: "B",
    pageID: "page-3",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-28",
    contents: `"“Now I will tell you the answer to my question. It is this. The Party seeks power entirely for its own sake. We are not interested in the good of others; we are interested solely in power, pure power. What pure power means you will understand presently. We are different from the oligarchies of the past in that we know what we are doing. All the others, even those who resembled ourselves, were cowards and hypocrites. The German Nazis and the Russian Communists came very close to us in their methods, but they never had the courage to recognize their own motives. They pretended, perhaps they even believed, that they had seized power unwillingly and for a limited time, and that just around the corner there lay a paradise where human beings would be free and equal. We are not like that. We know that no one ever seizes power with the intention of relinquishing it. Power is not a means; it is an end. One does not establish a dictatorship in order to safeguard a revolution; one makes the revolution in order to establish the dictatorship. The object of persecution is persecution. The object of torture is torture. The object of power is power. Now you begin to understand me.”
    ― George Orwell, 1984"`,
  },
  {
    id: "note-6",
    index: 0,
    noteNum: 1,
    bookID: "B",
    pageID: "page-4",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-28",
    contents: `"“Now I will tell you the answer to my question. It is this. The Party seeks power entirely for its own sake. We are not interested in the good of others; we are interested solely in power, pure power. What pure power means you will understand presently. We are different from the oligarchies of the past in that we know what we are doing. All the others, even those who resembled ourselves, were cowards and hypocrites. The German Nazis and the Russian Communists came very close to us in their methods, but they never had the courage to recognize their own motives. They pretended, perhaps they even believed, that they had seized power unwillingly and for a limited time, and that just around the corner there lay a paradise where human beings would be free and equal. We are not like that. We know that no one ever seizes power with the intention of relinquishing it. Power is not a means; it is an end. One does not establish a dictatorship in order to safeguard a revolution; one makes the revolution in order to establish the dictatorship. The object of persecution is persecution. The object of torture is torture. The object of power is power. Now you begin to understand me.”
    ― George Orwell, 1984"`,
  },

  {
    id: "note-10",
    index: 0,
    noteNum: 1,
    bookID: "C",
    pageID: "page-5",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-23",
    contents: "Another note about page 5 of Book C.",
  },
  {
    id: "note-12",
    index: 0,
    noteNum: 8,
    bookID: "C",
    pageID: "page-5",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-28",
    contents:
      "“The best remedy for those who are afraid, lonely or unhappy is to go outside, somewhere where they can be quite alone with the heavens, nature and God. Because only then does one feel that all is as it should be and that God wishes to see people happy, amidst the simple beauty of nature. As longs as this exists, and it certainly always will, I know that then there will always be comfort for every sorrow, whatever the circumstances may be. And I firmly believe that nature brings solace in all troubles.”― Anne Frank, The Diary of a Young Girl.",
  },

  {
    id: "note-6",
    index: 0,
    noteNum: 8,
    bookID: "C",
    pageID: "page-6",
    lastUpdated: "2024-02-02",
    dateAdded: "2024-01-28",
    contents: "Note about page 6 of Book C.",
  },
];

export const data: t_library = { books, pages, notes };

// localStorage.setItem("books", JSON.stringify(books));
// localStorage.setItem("pages", JSON.stringify(pages));
// localStorage.setItem("notes", JSON.stringify(notes));
