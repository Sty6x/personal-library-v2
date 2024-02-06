import { Link, useOutletContext, useParams } from "react-router-dom";
import {
  t_book,
  t_note,
  t_currentBook,
  t_page,
} from "../../../types/t_library";
import { useEffect, useState } from "react";
import { data } from "../../../placeholderData";
import getRelatedItems from "../../../utils/getRelatedItems";
import BookHeader from "../../../components/BookHeader";
import { AnimatePresence } from "framer-motion";

type t_currentPage = {
  currentPage: t_page;
  book: { title: string; author: string };
  notes: Array<t_note>;
};

const Page = () => {
  const { bookAuthor, bookTitle } = useOutletContext<{
    bookTitle: string;
    bookAuthor: string;
  }>();
  const { pageID } = useParams<any>();
  const [pageData, setPageData] = useState<t_currentPage | null>(null);

  // set as loader
  function getPageData(storage: Array<t_page>) {
    const [currentPage] = storage.filter((page) => page.id === pageID);
    const getPageNotes = getRelatedItems<t_note>(
      currentPage.noteIDs,
      data.notes
    );
    const currentPageData: t_currentPage = {
      book: {
        title: bookTitle,
        author: bookAuthor,
      },
      currentPage,
      notes: getPageNotes,
    };
    setPageData({ ...currentPageData });
  }

  useEffect(() => {
    getPageData(data.pages);
  }, []);

  useEffect(() => {
    console.log(pageData);
  }, [pageData]);

  // flex pushes the horizontal and vertical center of the component to the center
  return (
    <div
      id="page"
      className="max-w-[1440px] h-[90%] flex flex-col justify-start mx-16 overflow-hidden "
    >
      <header className="sticky top-0 border-b-black border-b-4 shadow-header border-solid bg-white bg-gridWhite py-6">
        <Link to={"/library"} className="underline text-lg">
          Go back to library
        </Link>
        <BookHeader
          title={pageData?.book.title as string}
          author={pageData?.book.author as string}
        />
        <p className="text-xl">Page {pageData?.currentPage.pageNum}</p>
        <span className="flex gap-4 items-center mt-3">
          <Link
            className="add-icon w-[max-content] before:mr-[.3em] items-center before:h-[20px] relative flex content-center bg-primary-link  rounded-sm shadow-btn-hover hover:shadow-btn-hover-active transition-shadow hover:transition-shadow duration-200 px-4 py-1 text-lg"
            to={"/#"}
          >
            Add Note
          </Link>
          <Link
            to={"/library"}
            className="add-icon w-[max-content] before:mr-[.3em] items-center before:h-[20px] relative flex content-center bg-accent-green-200  rounded-sm shadow-btn-hover hover:shadow-btn-hover-active transition-shadow hover:transition-shadow duration-200 px-4 py-1 text-lg"
          >
            Add Page
          </Link>
        </span>
      </header>
      <section className="">
        <div
          id="notes-container"
          className="max-h-[50em] w-[90em] justify-start overflow-y-auto"
        >
          <AnimatePresence custom={"popLayout"}></AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Page;
