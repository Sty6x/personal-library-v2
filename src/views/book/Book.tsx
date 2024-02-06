import { useEffect, useState } from "react";
import { Link, Outlet, useLoaderData, useParams } from "react-router-dom";
import { t_book } from "../../types/t_library";
import { format, formatDistance } from "date-fns";
import BookHeader from "../../components/BookHeader";

interface t_currentBook extends t_book {
  numOfNotes: number;
}

const Book = () => {
  const bookData = useLoaderData();
  const params = useParams();
  console.log(params);
  const [currentBook, setCurrentbook] = useState<t_currentBook>({
    ...(bookData as t_currentBook),
  });
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (Object.keys(params)[1] === "pageID") {
      setRedirect(false);
      return;
    }
    setRedirect(true);
  }, [params]);

  return (
    <main
      id="book-page"
      className={`bg-gridWhite min-h-[100dvh] flex justify-center`}
    >
      {redirect ? (
        <section id="book-page-contents" className="grid place-items-center">
          <div className="max-w-[60em]">
            <div>
              <span className="text-lg">
                Last updated{" "}
                {formatDistance(new Date(currentBook.lastUpdated), new Date())}{" "}
                ago.
              </span>
              <BookHeader
                title={currentBook.title}
                author={currentBook.author}
              />
              <span className="text-lg drop-shadow-text-shadow">
                Pages Written {currentBook?.pageIDs.length} • Notes Added{" "}
                {currentBook?.numOfNotes}
              </span>
            </div>
            <div className="max-w-[max-content] flex gap-3 flex-col mt-3">
              <div className="">
                <Link
                  to={`/${currentBook.id}/${currentBook.pageIDs[0]}`}
                  className="before:h-[1em] before:w-[1em] before:mr-[.3em] read-icon  relative flex content-center bg-primary-link  items-center rounded-sm shadow-btn-hover hover:shadow-btn-hover-active transition-shadow hover:transition-shadow duration-200 px-5 py-2 text-3xl font-medium w-full"
                >
                  Start Reading
                </Link>
              </div>

              <span className="flex gap-4 items-center">
                <Link
                  className="add-icon w-[max-content] before:mr-[.3em] items-center before:h-[20px] relative flex content-center bg-accent-green-200  rounded-sm shadow-btn-hover hover:shadow-btn-hover-active transition-shadow hover:transition-shadow duration-200 px-2 py-1 text-lg"
                  to={"/#"}
                >
                  Add a page
                </Link>
                <Link to={"/library"} className="underline">
                  Go back to library
                </Link>
              </span>
            </div>
          </div>
        </section>
      ) : (
        <Outlet
          context={{
            bookTitle: currentBook.title,
            bookAuthor: currentBook.author,
          }}
        />
      )}
    </main>
  );
};

export default Book;
