import { useEffect, useState } from "react";
import BookItem from "../../components/book-item/BookItem.tsx";
import { data } from "../../placeholderData.ts";
import { t_book, t_library, t_note, t_page } from "../../types/t_library.ts";
import { closestIndexTo } from "date-fns";
import getRelatedItems from "../../utils/getRelatedItems.ts";
import { motion } from "framer-motion";
import { formatDistance } from "date-fns";
import LibraryStorage from "../../utils/Library.ts";

type t_recentBooks = {
  id: string;
  title: string;
  author: string;
  pageIDs: Array<string>;
  dateAdded: string;
  lastUpdated: string;
  color: string;
  note: t_note;
  page: t_page;
};
function Home() {
  const [recentBooks, setRecentBooks] = useState<Array<t_recentBooks> | []>([]);

  function getRecentBooks(library: t_library) {
    // grabs only the recently add or updated notes

    const colors = ["#CD8D7A", "#C3E2C2", "#EAECCC"];
    const sortedByDateNotes: Array<t_note> = library.notes.sort(
      (a, b) =>
        (new Date(b.lastUpdated) as any) - (new Date(a.lastUpdated) as any)
    );
    let recentNotes: Array<t_note> = [];
    for (let i = 0; i < sortedByDateNotes.length; i++) {
      if (recentNotes.length < 3) {
        if (recentNotes.length === 0) {
          recentNotes.push(sortedByDateNotes[i]);
        } else {
          const currentBookID = sortedByDateNotes[i].bookID;
          if (recentNotes.every((note) => note.bookID !== currentBookID)) {
            recentNotes.push(sortedByDateNotes[i]);
          }
        }
      }
    }

    const getRecentBooks: Array<t_recentBooks> = recentNotes.map((note, i) => {
      const book = LibraryStorage.books.find(
        (book) => book.id === note.bookID
      ) as t_book;
      const page = LibraryStorage.pages.find(
        (page) => page.id === note.pageID
      ) as t_page;
      return { ...book, color: colors[i], note, page };
    });
    setRecentBooks([...getRecentBooks]);
  }

  const renderRecentBooks = recentBooks?.map(
    (book: t_recentBooks, i: number) => {
      return (
        <BookItem
          key={book.id}
          color={book.color}
          motionKey={i}
          noteContents={book.note.contents}
          link={`/${book.id}/${book.page.id}`}
        >
          <span className="text-md min-[1930px]:text-[1rem] max-[1440px]:text-[.8rem] font-semi-bold">
            Last updated{" "}
            {formatDistance(new Date(book.note.lastUpdated), new Date())} ago.
          </span>
          <span className="text-3xl min-[1930px]:text-[2.5rem] max-[1280px]:text-[1.4rem] max-[1280px]:leading-[1.4rem] font-bold">
            {book.title}
          </span>
          <span className="text-md min-[1930px]:text-[1.4rem] max-[1440px]:text-[1rem] font-semibold">
            by {book.author}
          </span>
          <span className="text-md min-[1930px]:text-[1rem]  max-[1440px]:text-[.8rem] font-semi-bold">
            Page {book.page.pageNum} • Note #{book.note.noteNum}
          </span>
        </BookItem>
      );
    }
  );

  useEffect(() => {
    getRecentBooks(LibraryStorage);
  }, []);

  useEffect(() => {
    console.log(recentBooks);
  }, [recentBooks]);

  return (
    <main id="home-page" className="h-[100dvh]">
      <motion.div
        id="card-items-container"
        className="grid grid-rows-2 grid-cols-2 h-full"
        key={"container"}
      >
        <motion.div
          variants={{
            initial: { opacity: 0, scale: 0 },
            animate: { opacity: 1, scale: 0.4 },
          }}
          className="grid place-content-center bg-cover bg-gridWhite"
        >
          <div className="flex-col gap-1 flex max-w-[max-content]">
            <span className="">
              <p
                className="
              text-3xl
              min-[1930px]:text-[2.5rem] max-[1280px]:text-[1.8rem]  
              font-semibold drop-shadow-text-shadow"
              >
                Personal Library.
              </p>
              <h1
                className="
              text-5xl
              min-[1930px]:text-[2.8rem] max-[1280px]:text-[2.8rem] max-[1280px]:leading-[2.4rem] font-bold drop-shadow-text-shadow"
              >
                Recent books you've read.{" "}
              </h1>
            </span>
            <span className="flex gap-2 flex-col">
              <button className="flex content-center add-icon w-[max-content] text-xl font-regular py-1 px-3 bg-primary-link rounded-sm hover:shadow-btn-hover-active shadow-btn-hover hover:transition-shadow transition-shadow duration-200">
                Add book
              </button>
              <button className="flex content-center library-icon w-[max-content] text-xl font-regular py-1 px-3 bg-accent-green-200 rounded-sm hover:shadow-btn-hover-active hover:transition-shadow shadow-btn-hover transition-shadow duration-200">
                Open your library
              </button>
            </span>
          </div>
        </motion.div>
        {recentBooks?.length === 0 ? "Nothing here" : renderRecentBooks}
      </motion.div>
    </main>
  );
}

export default Home;
