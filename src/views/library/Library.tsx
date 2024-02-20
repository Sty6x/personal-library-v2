import { useLoaderData } from "react-router-dom";
import libImage from "../../assets/images/libimage.png";
import BookItemList from "../../components/BookItemList";
import { t_book, t_bookFormData } from "../../types/t_library";
import { useState } from "react";
import BookItem from "../../components/book-item/BookItem";
import BookForm from "../../components/modal/BookForm";
import LibraryStorage from "../../utils/Library";
import { uid } from "uid";

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

  const renderBookItems = bookList.map((book, i) => {
    return (
      <BookItem
        key={book.id}
        color={colors[Math.floor(Math.random() * colors.length)]}
        motionKey={i}
        link={`/${book.id}`}
      >
        <span className="max-w-[250px] leading-7 text-3xl min-[1930px]:text-[2.5rem] max-[1280px]:text-[1.4rem] max-[1280px]:leading-[1.4rem] font-bold">
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
    <main
      id="library-page"
      className="min-h-[100dvh] bg-gridWhite flex justify-center"
    >
      {isModalOpened && (
        <BookForm
          type="Add"
          isOpenedSetter={setIsModalOpened}
          isOpened={isModalOpened}
          submitHandler={addNewBook}
        />
      )}
      <div className="relative outline-none w-[80%] max-w-[1440px] flex flex-col justify-start mx-16 my-16">
        <header className="py-4">
          <div id="library-header-contents" className="flex items-center">
            <span className=" inline-block">
              <h2 className="text-6xl">Hello, Welcome back!</h2>
              <h1 className="text-5xl font-bold">Your Library</h1>
              <button
                onClick={() => setIsModalOpened(true)}
                className=" mt-4 flex items-center add-icon w-[max-content] text-xl font-regular py-1 px-4 bg-primary-link rounded-sm hover:shadow-btn-hover-active shadow-btn-hover hover:transition-shadow transition-shadow duration-200"
              >
                Add Book
              </button>
            </span>
            <span className="inline-block ml-auto">
              <img id="library-image" alt="library" src={libImage} />
            </span>
          </div>
        </header>
        <BookItemList>{renderBookItems}</BookItemList>
      </div>
    </main>
  );
};

export default Library;
