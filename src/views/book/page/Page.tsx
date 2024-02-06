import { Link, useOutletContext, useParams } from "react-router-dom";
import { t_note, t_page } from "../../../types/t_library";
import { useEffect, useState } from "react";
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
    setPageData(
      (prev) =>
        ({ ...prev, notes: [newNote, ...pageData.notes] } as t_currentPage)
    );
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

  useEffect(() => {
    getPageData(data.pages);
  }, []);

  useEffect(() => {
    console.log(pageData);
  }, [pageData]);

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

  // flex pushes the horizontal and vertical center of the component to the center
  return (
    <div
      id="page"
      className="max-w-[1440px] h-[90%] flex flex-col justify-start mx-16 overflow-hidden "
    >
      <header className="sticky top-0 border-b-black border-b-2 border-solid bg-white bg-gridWhite py-6">
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
          <motion.span whileHover={{ x: 5 }} className="  w-[max-content]">
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
            {/* <Link
            to={"/library"}
            className="add-icon w-[max-content] before:mr-[.3em] items-center before:h-[20px] relative flex content-center bg-accent-green-200  rounded-sm shadow-btn-hover hover:shadow-btn-hover-active transition-shadow hover:transition-shadow duration-200 px-4 py-1 text-lg"
          >
            Add Page
          </Link> */}
          </motion.span>
        </div>
      </header>
      <section>
        <div
          id="notes-container"
          className="max-h-[50em] w-[90em] justify-start overflow-y-auto"
        >
          <AnimatePresence custom={"popLayout"}>{renderNotes}</AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Page;
