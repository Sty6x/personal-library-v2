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
import { Link, useNavigate } from "react-router-dom";
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

const colors = ["#A3BC9F", "#ECCCCC", "#9FB5BC"];
const placeHolderData: Array<{ quote: string; color: string; author: string }> =
  [
    {
      quote:
        "“It’s difficult in times like these: ideals, dreams and cherished hopes rise within us, only to be crushed by grim reality. It’s a wonder I haven’t abandoned all my ideals, they seem so absurd and impractical. Yet I cling to them because I still believe, in spite of everything, that people are truly good at heart.“",
      author: " Anne frank, The Diary of a Young Girl",
      color: "#A3BC9F",
    },

    {
      quote:
        "“If some people are so hungry for a feeling of importance that they actually go insane to get it, imagine what miracle you and I can achieve by giving people honest appreciation this side of insanity“",
      author: "Daniel Carnegie, How to Win Friends and Influence People",
      color: "#ECCCCC",
    },

    {
      quote:
        "“The way in which a man accepts his fate and all the suffering it entails, the way in which he takes up his cross, gives him ample opportunity—even under the most difficult circumstances—to add a deeper meaning to his life. It may remain brave, dignified and unselfish. Or in the bitter fight for self-preservation he may forget his human dignity and become no more than an animal.”",
      author: "Viktor Frankl, Man's Search For Meaning",
      color: "#9FB5BC",
    },
  ];

function Home() {
  const [recentBooks, setRecentBooks] = useState<
    Array<t_recentBooks | undefined> | []
  >([]);
  const [isBookFormOpen, setIsBookFormOpen] = useState(false);
  const [isSmallScreen, setSmallScreen] = useState(false);
  const navigate = useNavigate();

  function getRecentBooks(library: t_library) {
    const sortedByDateBooks: Array<t_book> = library.books.sort(
      (a, b) =>
        (new Date(b.lastUpdated) as any) - (new Date(a.lastUpdated) as any),
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
            note.bookID === book.id && note.lastUpdated === book.lastUpdated,
        );

        const page = library.pages.find((page) => page.id === note?.pageID);
        return { ...book, note, page, color: colors[i] };
      },
    );
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
                  hide={isSmallScreen}
                  animate={true}
                  key={book.id}
                  color={book.color}
                  motionKey={i}
                  noteContents={book.note.contents}
                  link={`/${book.id}/${book.page.id}`}
                >
                  <BookItemContents
                    key={book.id}
                    book={book}
                    recentNote={book.note}
                    recentPage={book.page}
                  />
                </BookItem>
              ) : (
                <BookItem
                  hide={isSmallScreen}
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
            <PlaceholderBookItem key={uid(16)} data={placeHolderData[i]} />
          )}
        </>
      );
    },
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
    navigate(`/${newBook.id}`);
  }

  useEffect(() => {
    getRecentBooks(LibraryStorage);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      if (innerWidth <= 1024) {
        setSmallScreen(true);
        return;
      }
      setSmallScreen(false);
    });
  }, []);

  return (
    <main id="home-page" className="h-[100dvh]">
      {isBookFormOpen && (
        <BookForm
          submitHandler={addNewBook}
          isOpenedSetter={setIsBookFormOpen}
          isOpened={isBookFormOpen}
          type="Add"
          key={"bookform"}
        />
      )}
      <motion.div
        id="card-items-container"
        className="grid grid-rows-2 grid-cols-2 max-lg:block h-full max-w-full"
        key={"container"}
      >
        <motion.div
          key={"home-item"}
          variants={{
            initial: { opacity: 0, scale: 0 },
            animate: { opacity: 1, scale: 0.4 },
          }}
          className="items grid place-content-center max-lg:min-h-[100dvh] bg-cover bg-gridWhite"
        >
          <div className="text-black flex-col gap-2 flex max-w-[max-content] max-lg:mx-10 max-sm:mx-2">
            <span className="">
              <p
                className="
              text-3xl
              max-sm:text-[1.2rem]
              font-semibold flex items-center gap-3"
              >
                Welcome to Re:Read <span id="home-logo" />
              </p>
              <h1
                className="
              text-[2.6rem] max-sm:text-[1.5rem] max-w-[13em] text-pretty font-bold"
              >
                {LibraryStorage.books.length === 0
                  ? "Your Library is empty."
                  : "Recent books you've read."}
              </h1>
            </span>
            <span className="mt flex gap-2 ">
              <Link
                to={"/app/library"}
                className="max-md:text-lg max-sm:text-sm flex items-center library-icon w-[max-content] text-xl font-regular py-1 px-3 bg-accent-one bg-accent-green-200 rounded-sm hover:shadow-btn-hover-active hover:transition-shadow shadow-btn-hover transition-shadow duration-200"
              >
                Open your library
              </Link>
              <button
                onClick={() => setIsBookFormOpen(true)}
                className="max-md:text-lg max-sm:text-sm flex  items-center add-icon w-[max-content] text-xl font-regular py-1 px-3 bg-accent-three text-white rounded-sm hover:shadow-btn-hover-active shadow-btn-hover hover:transition-shadow transition-shadow duration-200"
              >
                Add book
              </button>
            </span>
          </div>
        </motion.div>
        {recentBooks?.length > 0 && renderRecentBooks}
      </motion.div>
    </main>
  );
}

export default Home;
