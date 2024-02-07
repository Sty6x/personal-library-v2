import { Link, useOutletContext, useParams } from "react-router-dom";
import { t_note, t_page } from "../../../types/t_library";
import { EventHandler, useEffect, useMemo, useRef, useState } from "react";
import { data } from "../../../placeholderData";
import getRelatedItems from "../../../utils/getRelatedItems";
import BookHeader from "../../../components/BookHeader";
import { AnimatePresence } from "framer-motion";
import Note from "../../../components/Notes";
import { motion } from "framer-motion";
import { uid } from "uid";

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
  const { pageID, bookID } = useParams<any>();
  const [pageData, setPageData] = useState<t_currentPage | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  function addNote() {
    const newID = uid(16);
    const newNote: t_note = {
      bookID: pageData?.currentPage.bookID as string,
      pageID: pageData?.currentPage.id as string,
      noteIndex: 0,
      contents: `This is a new note. \nHere is my note ID: ${newID}`,
      dateAdded: new Date().toString(),
      lastUpdated: new Date().toString(),
      id: newID,
    };
    if (pageData) {
      setPageData(
        (prev) =>
          ({ ...prev, notes: [newNote, ...pageData.notes] } as t_currentPage)
      );
    }
  }

  function onDragStart(e: React.DragEvent<HTMLDivElement>): void {
    const target = e.currentTarget;
    console.log(target.id);
    e.dataTransfer.setData("text/plain", target.id);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>): void {
    const transferedData = e.dataTransfer.getData("text/plain");
    const target = e.currentTarget;
    if (pageData) {
      const [currentTarget, dropTarget]: Array<t_note> = pageData?.notes.filter(
        (note) => note.id === transferedData || note.id === target.id
      );
      console.log({ draggedTarget: currentTarget, target: dropTarget });
      const updateNotePosition: Array<t_note> = pageData?.notes.map((note) => {
        if (dropTarget.id === note.id) {
          return { ...currentTarget };
        }
        if (currentTarget.id === note.id) {
          return { ...dropTarget };
        }
        return note;
      });
      setPageData(
        (prev) => ({ ...prev, notes: [...updateNotePosition] } as t_currentPage)
      );
    }
  }
  function onDragOver(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
  }
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

  function handleHeaderTransition(e: any) {
    console.log(window.scrollY);
    if (window.scrollY > 5) {
      setIsScrolling(true);
    } else if (window.scrollY < 5) {
      setIsScrolling(false);
    }
  }

  useEffect(() => {
    getPageData(data.pages);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleHeaderTransition);
    return window.removeEventListener("scroll", () => {
      console.log("throw");
    });
  }, []);

  const renderNotes = pageData?.notes.map((note) => {
    return (
      <Note
        dragEvents={{ onDragStart, onDrop, onDragOver }}
        key={note.id}
        id={note.id}
        contents={note.contents}
      />
    );
  });

  return (
    <div
      id="page"
      className="w-[80%] max-w-[1560px] flex flex-col justify-start mx-16 my-16"
      ref={pageRef}
    >
      <header className="z-10 sticky top-0 border-b-black border-b-2 border-solid bg-white bg-gridWhite py-6">
        {!isScrolling ? (
          <>
            <Link to={"/library"} className="underline text-lg">
              Go back to library
            </Link>
            <Link to={`/${bookID}`}>
              <BookHeader
                title={pageData?.book.title as string}
                author={pageData?.book.author as string}
              />
            </Link>
            <p className="drop-shadow-text-shadow text-xl">
              Page {pageData?.currentPage.pageNum}
            </p>
            <div className="flex gap-4 mt-3">
              <motion.span whileHover={{ x: 5 }} className="w-[max-content]">
                <button
                  onClick={() => {
                    addNote();
                  }}
                  type="button"
                  className="drop-shadow-text-shadow add-icon w-full before:mr-[.3em] items-center before:h-[20px] relative flex content-center font-semibold py-1 text-xl"
                >
                  Add Note
                </button>
              </motion.span>

              <motion.span whileHover={{ x: 5 }} className=" w-[max-content]">
                <Link
                  className="drop-shadow-text-shadow add-icon w-full before:mr-[.3em] items-center before:h-[20px] relative flex content-center font-semibold py-1 text-xl"
                  to={"/#"}
                >
                  Add Page
                </Link>
              </motion.span>
            </div>
          </>
        ) : (
          <p>Scrolled</p>
        )}
      </header>
      <section className="min-w-[100%] flex-1 overflow-hidden">
        <div id="notes-container" className=" justify-start ">
          <AnimatePresence custom={"popLayout"}>{renderNotes}</AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Page;
