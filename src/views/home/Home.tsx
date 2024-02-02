import { useEffect, useState } from "react";
import BookItem from "../../components/book-item/BookItem";
import { data } from "../../placeholderData.ts";
import { t_book, t_library } from "../../types/t_library.ts";
import bg from "../../assets/images/grid-white-bg.png";

function Home() {
  const [recentBooks, setRecentBooks] = useState<Array<any> | []>([]);

  function getRecentBooks(library: t_library) {
    const colors = ["#CD8D7A", "#C3E2C2", "#DBCC95"];
    const mappedBooks = library.books.map((book, i) => {
      const notes = data?.notes.filter((note) => note.bookID === book.bookID);
      const pages = data?.pages.filter((page) => page.bookID === book.bookID);
      return { ...book, notes, pages, color: colors[i] };
    });
    setRecentBooks([...mappedBooks]);
  }

  const renderRecentBooks = recentBooks?.map((book: any) => {
    return (
      <BookItem
        key={book.bookID}
        title={book.title}
        color={book.color}
        author={book.author}
        note={book.notes[0]}
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
      <div
        id="card-items-container"
        className="grid grid-rows-2 grid-cols-2 h-full"
      >
        <div className="grid place-content-center max-w-full h-full bg-cover bg-gridWhite">
          <div className="flex-col gap-2 flex">
            <span className="">
              <p className="text-2xl font-bold">Personal Library.</p>
              <h1 className="text-4xl font-bold">Recent books you've read. </h1>
            </span>
            <span className="flex gap-1 flex-col">
              <button className="w-[max-content] py-1 px-3 bg-primary-link rounded-sm hover:shadow-lg">
                Add book
              </button>
              <button className="w-[max-content] py-1 px-3 rounded-sm">
                Open your library
              </button>
            </span>
          </div>
        </div>
        {recentBooks.length === 0 ? "Nothing here" : renderRecentBooks}
      </div>
    </main>
  );
}

export default Home;
