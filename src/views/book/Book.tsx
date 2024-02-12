import { useEffect, useState } from "react";
import {
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import { t_book, t_page } from "../../types/t_library";
import { formatDistance } from "date-fns";
import BookHeader from "../../components/BookHeader";
import getRelatedItems from "../../utils/getRelatedItems";
import { uid } from "uid";
import LibraryStorage from "../../utils/Library";

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

  function handlePageAdd() {
    const testPages = getRelatedItems<t_page>(
      currentBook.pageIDs,
      LibraryStorage.pages,
      (pages) => {
        let i: number, j: number;
        let tmpArr: Array<t_page> = [...pages];
        for (i = 0; i < pages.length - 1; i++) {
          let minIndex: number = i;
          for (j = i + 1; j < pages.length; j++) {
            if (pages[j].pageNum < pages[i].pageNum) {
              minIndex = j;
              continue;
            }
          }
          // if we have a new minimum index
          if (minIndex !== i) {
            const mapPages = tmpArr.map((page, pageI) => {
              if (i === pageI) {
                return { ...tmpArr[minIndex] };
              } else if (minIndex === pageI) {
                return { ...tmpArr[i] };
              }
              return page;
            });
            tmpArr = [...mapPages];
          }
        }
        return tmpArr;
      }
    );
    const getCurrentPage = getRelatedItems<t_page>(
      currentBook.pageIDs,
      LibraryStorage.pages
    );
    // relying on this does not sort the pages based from least to most

    console.log({ test: testPages });
    console.log({ getCurrentPage });
    const creationDate = new Date().toString();
    const newPage: t_page = {
      bookID: currentBook.id,
      id: uid(16),
      pageNum:
        params.pageID !== undefined
          ? getCurrentPage[0].pageNum + 1
          : getCurrentPage[getCurrentPage.length - 1].pageNum + 1,
      noteIDs: [],
      lastUpdated: creationDate,
      dateAdded: creationDate,
    };
    console.log(newPage);
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
    const currentPageIndex = getPages.findIndex(
      (page) => page.id === params.pageID
    );
    const filterCurrentPageID = currentBook.pageIDs.filter(
      (pageID) => pageID !== params.pageID
    );
    navigate(
      `/${currentBook.id}/${
        getPages[currentPageIndex - 1] !== undefined
          ? getPages[currentPageIndex - 1].id
          : getPages[0].id
      }`
    );
    setCurrentbook((prev) => ({ ...prev, pageIDs: [...filterCurrentPageID] }));
    LibraryStorage.removePage(currentPage as t_page);
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
      className={`bg-gridWhite min-h-[100dvh] flex justify-center`}
    >
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
              <div className="">
                <Link
                  to={`/${currentBook.id}/${currentBook.pageIDs[0]}`}
                  className="before:h-[1em] before:w-[1em] before:mr-[.3em] read-icon  relative flex content-center bg-primary-link  items-center rounded-sm shadow-btn-hover hover:shadow-btn-hover-active transition-shadow hover:transition-shadow duration-200 px-5 py-2 text-3xl font-medium w-full"
                >
                  Start Reading
                </Link>
              </div>

              <span className="flex gap-4 items-center">
                <button
                  onClick={(e) => {
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
          <button
            onClick={() => {
              handlePageDelete();
            }}
          >
            Delete Page{" "}
          </button>
          <Outlet
            context={{
              addPage: handlePageAdd,
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
