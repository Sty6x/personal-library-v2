import { useOutletContext, useParams } from "react-router-dom";
import {
  t_note,
  t_page,
  t_currentPage,
  t_extendedNote,
} from "../../../types/t_library";
import { useEffect, useRef, useState } from "react";
import getRelatedItems from "../../../utils/getRelatedItems";
import { AnimatePresence } from "framer-motion";
import Note from "../../../components/Notes";
import { uid } from "uid";
import PageHeader from "../../../components/book-item/PageHeader";
import LibraryStorage from "../../../utils/Library";

const Page = () => {
  const { bookAuthor, bookTitle, addPage } = useOutletContext<{
    bookTitle: string;
    bookAuthor: string;
    addPage: (currentPageID: string | Array<string>) => void;
  }>();
  const { pageID, bookID } = useParams<any>();
  const [pageData, setPageData] = useState<t_currentPage | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  function addNote() {
    const newID = uid(16);
    if (pageData) {
      const newNote: t_note = {
        bookID: pageData?.currentPage.bookID as string,
        pageID: pageData?.currentPage.id as string,
        noteNum: pageData?.notes.length + 1,
        contents: `This is a new note. \nHere is my note ID: ${newID}`,
        dateAdded: new Date().toString(),
        lastUpdated: new Date().toString(),
        id: newID,
      };
      setPageData(
        (prev) =>
          ({ ...prev, notes: [newNote, ...pageData.notes] } as t_currentPage)
      );
      LibraryStorage.addNote(newNote);
    }
  }

  function saveEdit(contents: string, noteID: string) {
    if (pageData) {
      const updateDate = new Date().toString();
      const currentNote = pageData.notes.find(
        (note) => note.id === noteID
      ) as t_extendedNote;

      const currentUpdatedNote = {
        ...currentNote,
        contents,
        lastUpdated: updateDate,
      };

      const updatedNotes: t_extendedNote[] = pageData?.notes.map((note) => {
        if (note.id !== noteID) return note;
        return currentUpdatedNote;
      });

      setPageData({
        ...pageData,
        currentPage: { ...pageData.currentPage, lastUpdated: updateDate },
        notes: updatedNotes,
      });

      delete currentUpdatedNote["isEditing"];
      LibraryStorage.updateNote(currentUpdatedNote);
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
      LibraryStorage.notes,
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
    getPageData(LibraryStorage.pages);
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
        handleEditNoteState={disableEditNote}
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

  function disableEditNote(): void {
    const checkIfEditing = pageData?.notes.some(
      (note) => note.isEditing === true
    );
    console.log(checkIfEditing);
    if (!checkIfEditing) return;
    const setEditingNote = pageData?.notes.map((note) => ({
      ...note,
      isEditing: false,
    }));
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
        if (e.key === "Escape") disableEditNote();
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
