import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import libImage from "../../assets/images/libimage.png";
import { AnimatePresence, motion } from "framer-motion";
import { t_page, t_note, t_book, t_bookFormData } from "../../types/t_library";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import AppBookItem from "../../components/book-item/app-book-item/AppBookItem";
import BookForm from "../../components/modal/BookForm";
import LibraryStorage from "../../utils/Library";
import { uid } from "uid";
import Sidebar from "../../components/Sidebar";
import BookItemList from "../../components/BookItemList";

interface t_appBook extends t_book {
  notes: Array<t_note> | [];
  color?: string;
}

const colors = [
  "#ECE1C4",
  "#E8E3C3",
  "#E3E2C2",
  "#E0E3C4",
  "#DCE2C4",
  "#D9E2C4",
  "#C1E5E3",
  "#C1DAE5",
  "#C1CCE5",
  "#C1BEE5",
  "#E3C1C1",
  "#E5C1C1",
  "#E5C1CF",
  "#E5C1E0",
  "#D6D1A5",
  "#D2CD9F",
  "#CCCBA0",
  "#C9CCA2",
  "#C5CAA2",
  "#C1C9A3",
  "#A9CDCB",
  "#A9C2CD",
  "#A9B4CD",
  "#A9A6CD",
];

const App = () => {
  const books: Array<t_appBook> = useLoaderData() as Array<t_appBook>;
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [bookList, setBookList] = useState<Array<t_appBook>>([...books]);
  const [queriedBookList, setQueriedBookList] = useState<Array<t_appBook>>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setBookList([...books]);
  }, []);

  function addNewBook(bookData: t_bookFormData) {
    const bookDate = new Date().toString();
    const newBook: any = {
      ...bookData,
      id: uid(16),
      lastUpdated: bookDate,
      dateAdded: bookDate,
      pageIDs: [],
      notes: [],
    };
    LibraryStorage.addBook(newBook);
    console.log(newBook);
    setBookList((prev) => [...prev, newBook as t_appBook]);
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
      book.title.toLowerCase().includes(input.toLowerCase()),
    );
    setQueriedBookList([...filterBooks]);
  }

  function getFavorites(): t_appBook[] {
    const favorites: Array<t_appBook> = bookList.filter(
      (book) => book.favorite === "favorite",
    );
    return favorites;
  }

  function getRecentBooks(): t_appBook[] {
    if (bookList.length <= 3) return [...bookList];
    const [first, second, third]: Array<t_appBook> = bookList.sort(
      (a, b) =>
        (new Date(b.lastUpdated) as any) - (new Date(a.lastUpdated) as any),
    );
    if (isSmallScreen) {
      return [first, second];
    }
    return [first, second, third];
  }

  function getNotRecentBooks(): t_appBook[] {
    if (bookList.length < 3) return [];
    const [one, two, three, ...books] = bookList;
    return [...books];
  }

  function bookRenderer(books: () => Array<t_appBook>) {
    return books().map((book, i) => {
      return (
        <AppBookItem
          key={book.id}
          color={colors[Math.floor(Math.random() * colors.length)]}
          link={`/${book.id}`}
          book={book}
        />
      );
    });
  }

  function handleSmallScreenSizeCheck(): void {
    if (innerWidth <= 1280) {
      console.log("Hide");
      setIsSmallScreen(true);
      return;
    }
    console.log("Show");
    setIsSmallScreen(false);
  }

  useEffect(() => {
    handleSmallScreenSizeCheck();
    window.addEventListener("resize", () => {
      handleSmallScreenSizeCheck();
    });
  }, []);

  useEffect(() => {
    setQueriedBookList([]);
  }, [isSearchFocused]);

  useEffect(() => {
    if (inputRef.current && inputRef.current.value === "") {
      setIsSearchFocused(false);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/app" || location.pathname === "/app/")
      navigate("/app/library");
  }, []);
  return (
    <main
      id="library-page"
      className="relative min-h-[100dvh] bg-gridWhite flex max-sm:flex-col"
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
      <div
        id="main-app-contents"
        className="flex flex-1 items-start justify-center"
      >
        <div className="max-sm:flex-1 max-sm:mx-6 max-[400px]:mx-4 max-sm:w-[inherit] max-sm:mt-2 relative outline-none w-full max-w-[1440px] flex flex-col justify-start mx-16 max-lg:mx-10 my-5">
          <header className="py-4">
            <div id="library-header-contents" className="flex items-center">
              <span className=" inline-block max-[850px]:w-full ">
                <h2 className="text-5xl max-[350px]:text-5xl ">Your Library</h2>
                <div
                  className={`mt-4 items-center flex ${
                    isSearchFocused
                      ? "border-pallete-test shadow-focus-border"
                      : "border-gray-100"
                  } transition-all duration-150 ease-in-out border-2 border-solid rounded px-2 py-1 bg-white`}
                >
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleBookSearch(
                        inputRef.current ? inputRef.current.value : " ",
                      );
                    }}
                    id="search-bar"
                    className="items-center flex"
                  >
                    <label id="search-label" htmlFor="search" />
                    <input
                      ref={inputRef}
                      onFocus={() => setIsSearchFocused(true)}
                      className="py-2 max-[500px]:w-full px-3 placeholder:font-bold placeholder:text-gray-200 font-bold text-md outline-none min-[500px]:min-w-[300px] bg-transparent"
                      type="search"
                      name="search"
                      id="search"
                      placeholder="Search book titles..."
                      autoComplete="off"
                    />
                  </form>
                  <button
                    id="submit"
                    className="ml-auto py-2 px-5 font-semibold bg-primary-main text-white rounded-sm max-sm:text-sm "
                  >
                    Search
                  </button>
                </div>
                <button
                  onClick={() => setIsModalOpened(true)}
                  className="max-md:text-base mt-4 flex items-center add-icon w-[max-content] text-xl font-regular py-1 px-4 bg-accent-three text-white rounded-sm hover:shadow-btn-hover-active shadow-btn-hover hover:transition-shadow transition-shadow duration-200"
                >
                  Add Book
                </button>
              </span>
              <span className="inline-block ml-auto max-[850px]:hidden">
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
                  {bookList.length > 0 ? (
                    <Outlet
                      context={{
                        renderItems: {
                          renderNotRecent: bookRenderer(getNotRecentBooks),
                          renderRecentBooks: bookRenderer(getRecentBooks),
                          renderFavoriteBooks: bookRenderer(getFavorites),
                        },
                      }}
                    />
                  ) : (
                    <p>Looks like your library is empty {":("}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
