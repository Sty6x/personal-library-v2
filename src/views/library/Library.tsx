import { useLoaderData } from "react-router-dom";
import libImage from "../../assets/images/libimage.png";
import BookItemList from "../../components/BookItemList";
import { t_book } from "../../types/t_library";
import { useState } from "react";
import BookItem from "../../components/book-item/BookItem";
import { formatDistance } from "date-fns/formatDistance";
const Library = () => {
  const books: Array<t_book> = useLoaderData() as Array<t_book>;
  const [bookList, setBookList] = useState<Array<t_book>>([...books]);

  const renderBookItems = bookList.map((book, i) => {
    return (
      <BookItem key={book.id} color={"red"} motionKey={i} link={`/${book.id}`}>
        <span className="text-3xl min-[1930px]:text-[2.5rem] max-[1280px]:text-[1.4rem] max-[1280px]:leading-[1.4rem] font-bold">
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
      <div className="relative outline-none w-[80%] max-w-[1440px] flex flex-col justify-start mx-16 my-16">
        <header className="py-4">
          <div id="library-header-contents" className="flex items-center">
            <span className=" inline-block">
              <h2 className="text-6xl">Hello, Welcome back!</h2>
              <h1 className="text-5xl font-bold">Your Library</h1>
              <button className=" mt-4 flex items-center add-icon w-[max-content] text-xl font-regular py-1 px-4 bg-primary-link rounded-sm hover:shadow-btn-hover-active shadow-btn-hover hover:transition-shadow transition-shadow duration-200">
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
