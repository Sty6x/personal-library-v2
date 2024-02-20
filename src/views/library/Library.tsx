import { Link, useLoaderData } from "react-router-dom";
import libImage from "../../assets/images/libimage.png";
import BookItemList from "../../components/BookItemList";
import { t_book, t_bookFormData } from "../../types/t_library";
import { useState } from "react";
import BookItem from "../../components/book-item/BookItem";
import BookForm from "../../components/modal/BookForm";
import LibraryStorage from "../../utils/Library";
import { uid } from "uid";
import Sidebar from "../../components/Sidebar";

const colors = [
  "#CD8D7A",
  "#C3E2C2",
  "#EAECCC",
  "#BFA68D",
  "#A4C4A3",
  "#D9E4D1",
  "#D4BE9B",
  "#A4AEA0",
  "#BEBFAE",
  "#D1D8D3",
];
const Library = () => {
  const books: Array<t_book> = useLoaderData() as Array<t_book>;
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [bookList, setBookList] = useState<Array<t_book>>([...books]);

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

  function getRecentBooks(): t_book[] {
    const [first, second]: Array<t_book> = LibraryStorage.books.sort(
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
  const renderAllBooks = getNotRecentBooks().map((book, i) => {
    return (
      <BookItem
        key={book.id}
        color={colors[Math.floor(Math.random() * colors.length)]}
        motionKey={i}
        link={`/${book.id}`}
      >
        <span className="max-w-[400px] leading-7 text-3xl min-[1930px]:text-[2.5rem] max-[1280px]:text-[1.4rem] max-[1280px]:leading-[1.4rem] font-bold">
          {book.title}
        </span>
        <span className="text-md min-[1930px]:text-[1.4rem] max-[1440px]:text-[1rem] font-semibold">
          by {book.author}
        </span>
        <span className="text-md min-[1930px]:text-[1rem]  max-[1440px]:text-[.8rem] font-semi-bold">
          Pages {book.pageIDs.length} • Notes {3}
        </span>
      </BookItem>
    );
  });

  const renderRecentBooks = getRecentBooks().map((book, i) => {
    return (
      <BookItem
        key={book.id}
        color={colors[Math.floor(Math.random() * colors.length)]}
        motionKey={i}
        link={`/${book.id}`}
      >
        <span className="max-w-[400px] leading-7 text-3xl min-[1930px]:text-[2.5rem] max-[1280px]:text-[1.4rem] max-[1280px]:leading-[1.4rem] font-bold">
          {book.title}
        </span>
        <span className="text-md min-[1930px]:text-[1.4rem] max-[1440px]:text-[1rem] font-semibold">
          by {book.author}
        </span>
        <span className="text-md min-[1930px]:text-[1rem]  max-[1440px]:text-[.8rem] font-semi-bold">
          Pages {book.pageIDs.length} • Notes {3}
        </span>
      </BookItem>
    );
  });

  return (
    <main id="library-page" className="min-h-[100dvh] bg-gridWhite flex ">
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
              <div className="mt-4 items-center flex border-gray-100 border-2 border-solid rounded px-2 py-1">
                <span id="search-bar" className="items-center flex">
                  <label id="search-label" htmlFor="search" />
                  <input
                    className="py-2 px-3 outline-none w-[300px] max-w-[400px]"
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Search you books..."
                  />
                </span>
                <button
                  className="ml-auto py-2 px-5 font-semibold bg-primary-main text-white rounded-sm  "
                  type="button"
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
        <section id="book-item-list-container" className="flex flex-col gap-16">
          <BookItemList
            link="/recent-books"
            linkName="Recent Books"
            bookItems={renderRecentBooks}
            headerTitle="
              Here are the recent books you've read."
          />

          <BookItemList
            addLink={false}
            bookItems={renderAllBooks}
            headerTitle="Explore more of your books."
          />
        </section>
      </div>
    </main>
  );
};

export default Library;
