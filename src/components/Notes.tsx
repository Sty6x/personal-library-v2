import { motion } from "framer-motion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { t_extendedNote } from "../types/t_library";
import { formatDistance } from "date-fns";

interface t_dragEvents {
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}
const Note = ({
  contents,
  id,
  isEditing,
  handleSave,
  handleEditNoteState,
  note,
  dragEvents: { onDragStart, onDrop },
}: {
  isEditing?: boolean;
  note: t_extendedNote;
  contents: string;
  id: string;
  dragEvents: t_dragEvents;
  handleEditNoteState: () => void;
  handleSave: (contents: string, noteID: string) => void;
}) => {
  const [editorState, setEditorState] = useState<{
    value: string;
    text: string;
  }>({ value: contents, text: contents });
  const [isHovered, setIsHovered] = useState(false);

  function onDragEnter(e: React.DragEvent<HTMLDivElement>): void {
    const dropTarget = e.currentTarget;
    if (!dropTarget.classList.contains("droppable")) {
      dropTarget.classList.add("droppable");
      return;
    }
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>): void {
    const dropTarget = e.currentTarget;
    if (dropTarget.classList.contains("droppable")) {
      dropTarget.classList.remove("droppable");
      return;
    }
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
  }

  return (
    <>
      {isEditing ? (
        <div className="relative">
          <span className="absolute w-full px-4 top-1 flex justify-between ">
            <p className="inline-block font-semibold text-xl">
              Note #{note.noteNum}
            </p>
            <span className="flex gap-4 ">
              <button
                className="hover:underline font-semibold"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleSave(editorState.text, id);
                }}
              >
                Done
              </button>
              <button className="hover:underline" onClick={handleEditNoteState}>
                Cancel
              </button>
            </span>
          </span>
          <ReactQuill
            modules={{ toolbar: [] }}
            theme="snow"
            value={editorState.value}
            onChange={(value, delta, source, editor) => {
              setEditorState({ value, text: editor.getText() });
            }}
          />
        </div>
      ) : (
        <motion.div
          id={id}
          draggable={true}
          onDragStart={onDragStart}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragEnd={onDragLeave}
          onHoverStart={() => {
            setIsHovered(true);
          }}
          onHoverEnd={() => {
            setIsHovered(false);
          }}
          className="relative z-10 outline-[3px] cursor-pointer w-full note text-pretty mb-3 text-xl grid h-[max-content] border-solid border-b-note-separator py-4 border-b-[1px]"
        >
          <div className="flex flex-col">
            <span className="flex justify-between ">
              <span id="note-data">
                <p className="font-semibold text-xl">Note #{note.noteNum}</p>
                <p className=" text-sm">
                  Updated{" "}
                  {formatDistance(new Date(note.lastUpdated), new Date())} ago.
                </p>
              </span>
              <span className="flex gap-4">
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isHovered ? { scale: 1.4, opacity: 1 } : {}}
                  whileHover={{ scale: 1 }}
                  className="edit-icon edit-btn self-start
            drop-shadow-text-shadow 
            add-icon before:mr-[.3em]
            before:h-[20px] box-border
            py-1"
                  id={`button-${id}`}
                />

                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    isHovered
                      ? { scale: 1.4, opacity: 1, transition: { delay: 0.1 } }
                      : {}
                  }
                  whileHover={{ scale: 1 }}
                  className="trash-icon trash-btn self-start
            drop-shadow-text-shadow 
            add-icon before:mr-[.3em]
            before:h-[20px] box-border
            py-1"
                  id={`button-${id}`}
                />
              </span>
            </span>
          </div>
          <p className="text-lg  font-extralight">{contents}</p>
        </motion.div>
      )}
    </>
  );
};
export default Note;
