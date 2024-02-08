import { useOutletContext, useParams } from "react-router-dom";
import {
  t_note,
  t_page,
  t_currentPage,
  t_extendedNote,
} from "../../../types/t_library";
import {
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { data } from "../../../placeholderData";
import getRelatedItems from "../../../utils/getRelatedItems";
import { AnimatePresence } from "framer-motion";
import Note from "../../../components/Notes";
import { uid } from "uid";
import PageHeader from "../../../components/book-item/PageHeader";

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

  function saveEdit(contents: string, noteID: string) {
    if (pageData) {
      const updatedNotes: t_extendedNote[] = pageData?.notes.map((note) => {
        if (note.id !== noteID) return note;
        return { ...note, contents: contents, isEditing: false };
      });
      setPageData({ ...pageData, notes: updatedNotes });
    }
  }

  function onDragStart(e: React.DragEvent<HTMLDivElement>): void {
    const target = e.currentTarget;
    e.dataTransfer.setData("text/plain", target.id);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>): void {
    const transferedData = e.dataTransfer.getData("text/plain");
    const target = e.currentTarget;

    if (target.classList.contains("droppable")) {
      target.classList.remove("droppable");
      target.classList.add("dropped");
      setTimeout(() => {
        target.classList.remove("dropped");
      }, 500);
    }
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

  // set as loader
  function getPageData(storage: Array<t_page>) {
    const [currentPage] = storage.filter((page) => page.id === pageID);
    const getPageNotes = getRelatedItems<t_note>(
      currentPage.noteIDs,
      data.notes,
      (notes) => {
        return notes.map((note) => ({ ...note, isEditing: false }));
      }
    );
    console.log(getPageNotes);
    const currentPageData: t_currentPage = {
      book: {
        title: bookTitle,
        author: bookAuthor,
      },
      currentPage,
      notes: getPageNotes as Array<t_extendedNote>,
    };
    setPageData({ ...currentPageData });
  }

  function handleHeaderTransition(e: any) {
    setIsScrolling(true);
    if (window.scrollY === 0) {
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
        handleSave={saveEdit}
        dragEvents={{ onDragStart, onDrop }}
        key={note.id}
        id={note.id}
        note={note}
        contents={note.contents}
        isEditing={note.isEditing}
      />
    );
  });

  function isCurrentlyEditing(noteID: string) {
    const [editingNote]: any = pageData?.notes.filter(
      (note) => note.id === noteID
    );
    return editingNote.isEditing ? true : false;
  }

  function triggerEditNote(noteID: string) {
    const setEditingNote = pageData?.notes.map((note) => {
      if (note.id === noteID) return { ...note, isEditing: true };
      return { ...note, isEditing: false };
    });
    setPageData((prev) => ({
      ...(prev as t_currentPage),
      notes: [...(setEditingNote as Array<t_extendedNote>)],
    }));
  }
  function disableEditNote(notes: Array<t_extendedNote>): void {
    const checkIfEditing = notes.some((note) => note.isEditing === true);
    console.log(checkIfEditing);
    if (!checkIfEditing) return;
    const setEditingNote = notes.map((note) => ({
      ...note,
      isEditing: false,
    }));
    console.log(setEditingNote);
    setPageData((prev) => ({
      ...(prev as t_currentPage),
      notes: [...(setEditingNote as Array<t_extendedNote>)],
    }));
  }

  return (
    <div
      id="page"
      className="outline-none w-[80%] max-w-[1440px] flex flex-col justify-start mx-16 my-16"
      ref={pageRef}
      tabIndex={0}
      onKeyDown={(e: any) => {
        console.log(e.key);
        if (e.key === "Escape") {
          disableEditNote(pageData ? pageData?.notes : []);
        }
      }}
      onClick={(e: any) => {
        const target = e.target;
        const targetID = target.id.slice(7);
        if (target.classList.contains("edit-btn")) {
          if (!isCurrentlyEditing(targetID)) {
            triggerEditNote(targetID);
          }
        }
      }}
    >
      <PageHeader
        pageData={pageData as t_currentPage}
        handleOnAddNote={addNote}
        isScrolling={isScrolling}
      />
      <section className="min-w-[100%] flex-1 overflow-hidden">
        <div id="notes-container" className=" justify-start px-2 py-2 ">
          <AnimatePresence custom={"popLayout"}>{renderNotes}</AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Page;
