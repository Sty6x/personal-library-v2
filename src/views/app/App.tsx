import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import libImage from "../../assets/images/libimage.png";
import { AnimatePresence, motion } from "framer-motion";
import { t_book, t_bookFormData } from "../../types/t_library";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import BookItem from "../../components/book-item/BookItem";
import BookForm from "../../components/modal/BookForm";
import LibraryStorage from "../../utils/Library";
import { uid } from "uid";
import Sidebar from "../../components/Sidebar";
import BookItemList from "../../components/BookItemList";

const colors = [
  "#ECE1C4", // Similar to original
  "#E8E3C3", // Similar to original
  "#E3E2C2", // Similar to original
  "#E0E3C4", // Similar to original
  "#DCE2C4", // Similar to original
  "#D9E2C4", // Similar to original
  "#C1E5E3", // More blue hue
  "#C1DAE5", // More blue hue
  "#C1CCE5", // More blue hue
  "#C1BEE5", // More blue hue
  "#E3C1C1", // More red hue
  "#E5C1C1", // More red hue
  "#E5C1CF", // More red hue
  "#E5C1E0", // More red hue
];

const BookItemContents = ({ book }: { book: t_book }) => {
  return (
    <>
      <span className="max-w-[400px] leading-7 text-3xl min-[1930px]:text-[2.5rem] max-[1280px]:text-[1.4rem] max-[1280px]:leading-[1.4rem] font-bold">
        {book.title}
      </span>
      <span className="text-md min-[1930px]:text-[1.4rem] max-[1440px]:text-[1rem] font-semibold">
        by {book.author}
      </span>
      <span className="text-md min-[1930px]:text-[1rem]  max-[1440px]:text-[.8rem] font-semi-bold">
        Pages {book.pageIDs.length} • Notes {3}
      </span>
    </>
  );
};

const App = () => {
  const books: Array<t_book> = useLoaderData() as Array<t_book>;
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [bookList, setBookList] = useState<Array<t_book>>([...books]);
  const [queriedBookList, setQueriedBookList] = useState<Array<t_book>>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

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

  // simple Search query for looking up a single category,
  // TITLE
  // filter through the books that contains the title when user presses enter or search button
  // on out of focus

  // advanced recursively check each data set and return the items
  // that contains the queried string, title, author

  function handleBookSearch(input: string) {
    if (input === "") return setQueriedBookList([]);
    const filterBooks = bookList.filter((book) =>
      book.title.toLowerCase().includes(input.toLowerCase())
    );
    setQueriedBookList([...filterBooks]);
  }

  function getFavorites(): t_book[] {
    const favorites: Array<t_book> = bookList.filter(
      (book) => book.favorite === "favorite"
    );
    console.log(favorites);
    return favorites;
  }

  function getRecentBooks(): t_book[] {
    const [first, second]: Array<t_book> = bookList.sort(
      (a, b) =>
        (new Date(b.lastUpdated) as any) - (new Date(a.lastUpdated) as any)
    );
    return [first, second];
  }

  function getNotRecentBooks(): t_book[] {
    const filter = bookList.filter(
      (book) =>
        book.id !== getRecentBooks()[0].id && book.id !== getRecentBooks()[1].id
    );
    return filter;
  }

  function bookRenderer(books: () => Array<t_book>) {
    return books().map((book, i) => {
      return (
        <BookItem
          key={book.id}
          color={colors[Math.floor(Math.random() * colors.length)]}
          motionKey={i}
          link={`/${book.id}`}
        >
          <BookItemContents book={book} />
        </BookItem>
      );
    });
  }

  useEffect(() => {
    setQueriedBookList([]);
  }, [isSearchFocused]);

  useEffect(() => {
    if (inputRef.current && inputRef.current.value === "") {
      setIsSearchFocused(false);
    }
  }, []);

  useEffect(() => {
    console.log(location.pathname === "/app");
    if (location.pathname === "/app" || location.pathname === "/app/")
      navigate("/app/library");
  }, []);
  return (
    <main
      id="library-page"
      className="relative min-h-[100dvh] bg-gridWhite flex "
      onClick={(e: any) => {
        const target = e.target;
        if (target.id !== "search") setIsSearchFocused(false);
      }}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === "Escape") setIsSearchFocused(false);
      }}
    >
      {isModalOpened && (
        <BookForm
          type="Add"
          isOpenedSetter={setIsModalOpened}
          isOpened={isModalOpened}
          submitHandler={addNewBook}
        />
      )}
      <Sidebar />
      <div className="relative outline-none w-full max-w-[1440px] flex flex-col justify-start mx-16 my-5">
        <header className="py-4">
          <div id="library-header-contents" className="flex items-center">
            <span className=" inline-block">
              <h2 className="text-6xl">Library</h2>
              <div
                className={`mt-4 items-center flex ${
                  isSearchFocused
                    ? "border-pallete-test shadow-focus-border"
                    : "border-gray-100"
                } transition-all duration-150 ease-in-out border-2 border-solid rounded px-2 py-1`}
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleBookSearch(
                      inputRef.current ? inputRef.current.value : " "
                    );
                  }}
                  id="search-bar"
                  className="items-center flex"
                >
                  <label id="search-label" htmlFor="search" />
                  <input
                    ref={inputRef}
                    onFocus={() => setIsSearchFocused(true)}
                    className="py-2 px-3 placeholder:font-bold placeholder:text-gray-200 font-bold text-md outline-none w-[300px] max-w-[400px]"
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search book titles..."
                    autoComplete="off"
                  />
                </form>
                <button
                  id="submit"
                  className="ml-auto py-2 px-5 font-semibold bg-primary-main text-white rounded-sm  "
                >
                  Search
                </button>
              </div>
              <button
                onClick={() => setIsModalOpened(true)}
                className="mt-4 flex items-center add-icon w-[max-content] text-xl font-regular py-1 px-4 bg-accent-three text-white rounded-sm hover:shadow-btn-hover-active shadow-btn-hover hover:transition-shadow transition-shadow duration-200"
              >
                Add Book
              </button>
            </span>
            <span className="inline-block ml-auto">
              <img id="library-image" alt="library" src={libImage} />
            </span>
          </div>
        </header>
        <div>
          <AnimatePresence>
            {isSearchFocused ? (
              <motion.div
                key={"searched-items"}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                exit={{ y: 10, opacity: 0, transition: { duration: 0.2 } }}
              >
                <BookItemList
                  bookItems={bookRenderer(() => queriedBookList)}
                  headerTitle={`Search results for: ${
                    inputRef.current ? inputRef.current.value : " "
                  }`}
                  addLink={false}
                />
              </motion.div>
            ) : (
              <motion.div
                key={"outlet-items"}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
                exit={{ y: 10, opacity: 0, transition: { duration: 0.2 } }}
              >
                <Outlet
                  context={{
                    renderItems: {
                      renderNotRecent: bookRenderer(getNotRecentBooks),
                      renderRecentBooks: bookRenderer(getRecentBooks),
                      renderFavoriteBooks: bookRenderer(getFavorites),
                    },
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

export default App;
