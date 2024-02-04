import { useEffect, useState } from "react";
import BookItem from "../../components/book-item/BookItem.tsx";
import { data } from "../../placeholderData.ts";
import { t_library, t_note, t_page } from "../../types/t_library.ts";
import { closestIndexTo } from "date-fns";
import getRelatedItems from "../../utils/getRelatedItems.ts";
import { motion } from "framer-motion";

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
    const colors = ["#CD8D7A", "#C3E2C2", "#EAECCC"];
    let recentPages: Array<t_page> = [];
    const numberOfBooks = 3;

    const filteredBooks = library.books.filter((_book, i) => i < numberOfBooks);

    // grabs the filtered books' recently updated
    // PAGE (SINGULAR)
    const getRecentPages = filteredBooks.map((book, i) => {
      const [page] = getRelatedItems<t_page>(
        book.pageIDs,
        data.pages,
        (items) => {
          const time = items.map((item) => item.lastUpdated);
          const pageIndex = closestIndexTo(new Date(), time);
          return [items[pageIndex as number]];
        }
      );
      recentPages.push(page);
      return page;
    });

    // grabs the recently updated page's NOTE
    const getRecentNotes = recentPages.map((page) => {
      const [note] = getRelatedItems<t_note>(
        page.noteIDs,
        data.notes,
        (items) => {
          const time = items.map((item) => item.lastUpdated);
          const noteIndex = closestIndexTo(new Date(), time);
          return [items[noteIndex as number]];
        }
      );
      return note;
    });

    const mapBooks: Array<t_recentBooks> = filteredBooks.map((book, i) => {
      return {
        ...book,
        color: colors[i],
        page: getRecentPages[i],
        note: getRecentNotes[i],
      };
    });
    setRecentBooks([...mapBooks]);
  }

  const renderRecentBooks = recentBooks?.map((book: any, i: number) => {
    return (
      <BookItem
        key={book.id}
        title={book.title}
        color={book.color}
        author={book.author}
        note={book.note}
        pageNum={book.page.pageNum}
        motionKey={i}
      />
    );
  });

  useEffect(() => {
    getRecentBooks(data);
  }, []);

  useEffect(() => {
    console.log(recentBooks);
  }, [recentBooks]);

  return (
    <main id="home-page" className="h-screen">
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
          className="grid place-content-center max-w-full h-full bg-cover bg-gridWhite"
        >
          <div className="flex-col gap-1 flex max-w-[50em]">
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
        </motion.div>
        {recentBooks?.length === 0 ? "Nothing here" : renderRecentBooks}
      </motion.div>
    </main>
  );
}

export default Home;
