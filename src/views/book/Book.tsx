import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { t_book, t_bookFormData, t_page } from "../../types/t_library";
import { formatDistance } from "date-fns";
import BookHeader from "../../components/BookHeader";
import getRelatedItems from "../../utils/getRelatedItems";
import { uid } from "uid";
import LibraryStorage from "../../utils/Library";
import BookForm from "../../components/modal/BookForm";
import EditBookBtn from "../../components/EditBookBtn";

interface t_currentBook extends t_book {
  numOfNotes: number;
}

const Book = () => {
  const bookData = useLoaderData();
  const params = useParams();
  const navigate = useNavigate();
  const [currentBook, setCurrentbook] = useState<t_currentBook>({
    ...(bookData as t_currentBook),
  });
  const [redirect, setRedirect] = useState(false);

  const [isBookFormOpen, setIsBookFormOpen] = useState(false);

  function handlePageAdd() {
    const sortedPages = getRelatedItems<t_page>(
      currentBook.pageIDs,
      LibraryStorage.pages,
      (pages) => {
        return pages.sort((a, b) => a.pageNum - b.pageNum);
      }
    );

    const getNewPageNum = (): number => {
      if (params.pageID === undefined) {
        return sortedPages.length !== 0
          ? sortedPages[sortedPages.length - 1].pageNum + 1
          : 1;
      }
      const currentPageIndex = sortedPages.findIndex(
        (page) => page.id === params.pageID
      );
      return sortedPages[currentPageIndex].pageNum + 1;
    };

    const creationDate = new Date().toString();
    const newPage: t_page = {
      bookID: currentBook.id,
      id: uid(16),
      pageNum: getNewPageNum(),
      noteIDs: [],
      lastUpdated: creationDate,
      dateAdded: creationDate,
    };
    setCurrentbook(
      (prev) =>
        ({ ...prev, pageIDs: [...prev.pageIDs, newPage.id] } as t_currentBook)
    );
    LibraryStorage.addPage(newPage);
    navigate(`/${currentBook.id}/${newPage.id}`);
  }

  function handlePageDelete() {
    const getPages = getRelatedItems<t_page>(
      currentBook.pageIDs,
      LibraryStorage.pages
    );
    const currentPage = getPages.find((page) => page.id === params.pageID);
    const filterCurrentPageID = currentBook.pageIDs.filter(
      (pageID) => pageID !== params.pageID
    );

    navigate(safePageRedirection());
    setCurrentbook((prev) => ({ ...prev, pageIDs: [...filterCurrentPageID] }));
    LibraryStorage.removePage(currentPage as t_page);
  }

  function safePageRedirection(): string {
    const getPages = getRelatedItems<t_page>(
      currentBook.pageIDs,
      LibraryStorage.pages
    );
    const currentDeletedPageIndex = getPages.findIndex(
      (page) => page.id === params.pageID
    );
    if (currentDeletedPageIndex > 0) {
      return `/${currentBook.id}/${
        currentBook.pageIDs[currentDeletedPageIndex - 1]
      }`;
    } else if (
      currentDeletedPageIndex == 0 &&
      currentBook.pageIDs.length - 1 > 0
    ) {
      return `/${currentBook.id}/${
        currentBook.pageIDs[currentDeletedPageIndex + 1]
      }`;
    } else if (currentDeletedPageIndex == 0) {
      return `/${currentBook.id}`;
    } else {
      return `/${currentBook.id}`;
    }
  }

  function handlePageEdit(updatedBook: t_bookFormData) {
    console.log(updatedBook);
  }

  useEffect(() => {
    if (Object.keys(params)[1] === "pageID") {
      setRedirect(true);
      return;
    }
    setRedirect(false);
  }, [params]);

  return (
    <main
      id="book-page"
      className={`relative bg-gridWhite min-h-[100dvh] flex justify-center`}
    >
      <EditBookBtn openBookForm={setIsBookFormOpen} />
      {isBookFormOpen && (
        <BookForm
          submitHandler={handlePageEdit}
          isOpened={isBookFormOpen}
          isOpenedSetter={setIsBookFormOpen}
          type="Edit"
          editCurrentBook={currentBook}
        />
      )}
      {!redirect ? (
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
              <motion.div
                whileTap={{
                  x: currentBook.pageIDs.length === 0 ? [0, 5, -5, 0] : [],
                }}
              >
                <Link
                  to={`/${currentBook.id}/${
                    currentBook.pageIDs.length === 0
                      ? " "
                      : currentBook.pageIDs[0]
                  }`}
                  className="before:h-[1em] before:w-[1em] before:mr-[.3em] read-icon  relative flex content-center bg-primary-link  items-center rounded-sm shadow-btn-hover hover:shadow-btn-hover-active transition-shadow hover:transition-shadow duration-200 px-5 py-2 text-3xl font-medium w-full"
                >
                  Start Reading
                </Link>
              </motion.div>

              <span className="flex gap-4 items-center">
                <button
                  onClick={() => {
                    handlePageAdd();
                  }}
                  className="add-icon w-[max-content] before:mr-[.3em] items-center before:h-[20px] relative flex content-center bg-accent-green-200  rounded-sm shadow-btn-hover hover:shadow-btn-hover-active transition-shadow hover:transition-shadow duration-200 px-2 py-1 text-lg"
                >
                  Add a page
                </button>
                <Link to={"/library"} className="underline">
                  Go back to library
                </Link>
              </span>
            </div>
          </div>
        </section>
      ) : (
        <>
          <Outlet
            context={{
              addPage: handlePageAdd,
              removePage: handlePageDelete,
              bookTitle: currentBook.title,
              bookAuthor: currentBook.author,
              bookPageIDs: currentBook.pageIDs,
            }}
          />
        </>
      )}
    </main>
  );
};

export default Book;
