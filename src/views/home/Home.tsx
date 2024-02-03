import { useEffect, useState } from "react";
import BookItem from "../../components/book-item/BookItem";
import { data } from "../../placeholderData.ts";
import { t_book, t_library, t_note, t_page } from "../../types/t_library.ts";
import { closestTo, closestIndexTo } from "date-fns";
import getItems from "../../utils/getItems.ts";

type t_recentBooks = {
  bookID: string;
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
    const colors = ["#CD8D7A", "#C3E2C2", "#EAECCC"];
    const mappedBooks = library.books.map((book, i) => {
      const pages = getItems<t_page>(book.pageIDs, data.pages, (items) => {
        const time = items.map((item) => item.lastUpdated);
        const pageIndex = closestIndexTo(new Date(), time);
        return [items[pageIndex as number]];
      });
      console.log(pages);
      return { ...book, color: colors[i] };
    });
  }

  // const renderRecentBooks = recentBooks?.map((book: any) => {
  //   return (
  //     <BookItem
  //       key={book.bookID}
  //       title={book.title}
  //       color={book.color}
  //       author={book.author}
  //       note={book.note[0]}
  //     />
  //   );
  // });

  useEffect(() => {
    getRecentBooks(data);
  }, []);

  useEffect(() => {
    // console.log(recentBooks);
  }, [recentBooks]);

  return (
    <main id="home-page" className="h-screen">
      <div
        id="card-items-container"
        className="grid grid-rows-2 grid-cols-2 h-full"
      >
        <div className="grid place-content-center max-w-full h-full bg-cover bg-gridWhite">
          <div className="flex-col gap-1 flex">
            <span className="">
              <p className="text-3xl font-semibold drop-shadow-text-shadow">
                Personal Library.
              </p>
              <h1 className="text-5xl font-bold drop-shadow-text-shadow">
                Recent books you've read.{" "}
              </h1>
            </span>
            <span className="flex gap-2 flex-col">
              <button className="flex content-center add-icon w-[max-content] text-xl font-regular py-1 px-3 bg-primary-link rounded-sm hover:shadow-btn-hover transition-shadow">
                Add book
              </button>
              <button className="flex content-center library-icon w-[max-content] text-xl font-regular py-1 px-3 bg-accent-green-200 rounded-sm hover:shadow-btn-hover transition-shadow">
                Open your library
              </button>
            </span>
          </div>
        </div>
        {/* {recentBooks.length === 0 ? "Nothing here" : renderRecentBooks} */}
      </div>
    </main>
  );
}

export default Home;
