import { useEffect, useState } from "react";
import BookItem from "../../components/book-item/BookItem.tsx";
import {
  t_book,
  t_bookFormData,
  t_library,
  t_note,
  t_page,
} from "../../types/t_library.ts";
import { motion } from "framer-motion";
import { formatDistance } from "date-fns";
import LibraryStorage from "../../utils/Library.ts";
import BookForm from "../../components/modal/BookForm.tsx";
import { uid } from "uid";
import { Link } from "react-router-dom";

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
  const [isBookFormOpen, setIsBookFormOpen] = useState(false);

  function getRecentBooks(library: t_library) {
    // grabs only the recently add or updated notes

    const colors = ["#E3C1C1", "#E0E3C4", "#C1E5E3"];
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
          // its going to keep pushing if some notes does not contain the same book id as the
          // recent notes.
          // else it will do nothing if it does and continue the loop
          const currentBookID = sortedByDateNotes[i].bookID;
          if (recentNotes.every((note) => note.bookID !== currentBookID)) {
            recentNotes.push(sortedByDateNotes[i]);
          }
        }
      }
    }

    console.log(recentNotes);
    // grabbing the books and pages from the most recent notes
    // Notes are important to get the recent books to be rendered on the home screen
    // NOTE bookItems will not occupy all spaces if:
    // if there are no notes that exist.
    // if there are missing notes aka if we are not able to grab different books.
    // if there are missing books or non-existing books.

    // if the recentNotes length < 3

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
          animate={true}
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

  function addNewBook(bookData: t_bookFormData) {
    const bookDate = new Date().toString();
    const newBook: t_book = {
      ...bookData,
      id: uid(16),
      lastUpdated: bookDate,
      dateAdded: bookDate,
      pageIDs: [],
    };
    LibraryStorage.addBook(newBook);
  }

  useEffect(() => {
    LibraryStorage.books.length > 0 && getRecentBooks(LibraryStorage);
  }, []);

  useEffect(() => {
    console.log(recentBooks);
  }, [recentBooks]);

  return (
    <main id="home-page" className="h-[100dvh]">
      {isBookFormOpen && (
        <BookForm
          submitHandler={addNewBook}
          isOpenedSetter={setIsBookFormOpen}
          isOpened={isBookFormOpen}
          type="Add"
        />
      )}
      <motion.div
        id="card-items-container"
        className="grid grid-rows-2 grid-cols-2 h-full max-w-full"
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
              <button
                onClick={() => setIsBookFormOpen(true)}
                className="flex content-center add-icon w-[max-content] text-xl font-regular py-1 px-3 bg-accent-three text-white rounded-sm hover:shadow-btn-hover-active shadow-btn-hover hover:transition-shadow transition-shadow duration-200"
              >
                Add book
              </button>
              <Link
                to={"/library"}
                className="flex content-center library-icon w-[max-content] text-xl font-regular py-1 px-3 bg-accent-one bg-accent-green-200 rounded-sm hover:shadow-btn-hover-active hover:transition-shadow shadow-btn-hover transition-shadow duration-200"
              >
                Open your library
              </Link>
            </span>
          </div>
        </motion.div>
        {recentBooks?.length === 0 ? null : renderRecentBooks}
      </motion.div>
    </main>
  );
}

export default Home;
