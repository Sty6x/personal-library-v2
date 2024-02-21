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
import BookItemContents from "../../components/book-item/BookItemContents.tsx";
import PlaceholderBookItem from "../../components/PlaceholderBookItem.tsx";

type t_recentBooks = {
  id: string;
  title: string;
  author: string;
  pageIDs: Array<string>;
  dateAdded: string;
  lastUpdated: string;
  color: string;
  note: t_note | undefined;
  page: t_page | undefined;
};
function Home() {
  const [recentBooks, setRecentBooks] = useState<
    Array<t_recentBooks | undefined> | []
  >([]);
  const [isBookFormOpen, setIsBookFormOpen] = useState(false);

  function getRecentBooks(library: t_library) {
    const colors = ["#E3C1C1", "#E0E3C4", "#C1E5E3"];
    const sortedByDateBooks: Array<t_book> = library.books.sort(
      (a, b) =>
        (new Date(b.lastUpdated) as any) - (new Date(a.lastUpdated) as any)
    );
    let recentBooks: Array<t_book> = [];
    for (let i = 0; i < 3; i++) {
      recentBooks.push(sortedByDateBooks[i]);
    }

    const getRecentBooks: Array<t_recentBooks | undefined> = recentBooks.map(
      (book, i) => {
        if (book === undefined) return undefined;
        const note = library.notes.find(
          (note) =>
            note.bookID === book.id && note.lastUpdated === book.lastUpdated
        );

        const page = library.pages.find((page) => page.id === note?.pageID);
        console.log({ ...book, note, page });
        return { ...book, note, page, color: colors[i] };
      }
    );
    console.log(recentBooks);
    setRecentBooks([...getRecentBooks]);
  }

  const renderRecentBooks = recentBooks?.map(
    (book: t_recentBooks | undefined, i: number) => {
      return (
        <>
          {book ? (
            <>
              {book.note && book.page ? (
                <BookItem
                  animate={true}
                  key={book.id}
                  color={book.color}
                  motionKey={i}
                  noteContents={book.note.contents}
                  link={`/${book.id}/${book.page.id}`}
                >
                  <BookItemContents
                    book={book}
                    recentNote={book.note}
                    recentPage={book.page}
                  />
                </BookItem>
              ) : (
                <BookItem
                  key={book.id}
                  color={book.color}
                  motionKey={i}
                  link={`/${book.id}`}
                >
                  <BookItemContents book={book} />
                </BookItem>
              )}
            </>
          ) : (
            <PlaceholderBookItem text={"Higher tonight"} color="wheat" />
          )}
        </>
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

    setRecentBooks((prev) => [
      ...prev,
      { ...newBook, color: "pink", note: undefined, page: undefined },
    ]);
  }

  useEffect(() => {
    getRecentBooks(LibraryStorage);
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
                to={"/app/library"}
                className="flex content-center library-icon w-[max-content] text-xl font-regular py-1 px-3 bg-accent-one bg-accent-green-200 rounded-sm hover:shadow-btn-hover-active hover:transition-shadow shadow-btn-hover transition-shadow duration-200"
              >
                Open your library
              </Link>
            </span>
          </div>
        </motion.div>
        {recentBooks?.length > 0 && renderRecentBooks}
      </motion.div>
    </main>
  );
}

export default Home;
