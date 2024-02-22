import { motion } from "framer-motion";
import { useState } from "react";
import { t_extendedNote } from "../types/t_library";
import { formatDistance } from "date-fns";
import InputField from "./InputField";

interface t_dragEvents {
  onDragStart: (e: any) => void;
  onDrop: (e: any) => void;
}
const Note = ({
  index,
  contents,
  id,
  isEditing,
  handleSave,
  handleCancelNoteEdit,
  note,
  dragEvents: { onDragStart, onDrop },
}: {
  index: number;
  isEditing?: boolean;
  note: t_extendedNote;
  contents: string;
  id: string;
  dragEvents: t_dragEvents;
  handleCancelNoteEdit: () => void;
  handleSave: (contents: string, noteID: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  function onDragEnter(e: any): void {
    const dropTarget = e.target;
    if (!dropTarget.classList.contains("droppable")) {
      dropTarget.classList.add("droppable");
      return;
    }
  }

  function onDragLeave(e: any): void {
    const dropTarget = e.target;
    if (dropTarget.classList.contains("droppable")) {
      dropTarget.classList.remove("droppable");
      return;
    }
  }

  function onDragEnd(e: any): void {
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
        <InputField
          initialValue={contents}
          handleSave={handleSave}
          inputTitle={`Note #${note.noteNum}`}
          handleCancelNoteEdit={handleCancelNoteEdit}
          id={id}
        />
      ) : (
        <motion.div
          data-position={index}
          id={id}
          draggable={true}
          onDragStart={onDragStart}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragEnd={onDragEnd}
          onHoverStart={() => {
            setIsHovered(true);
          }}
          onHoverEnd={() => {
            setIsHovered(false);
          }}
          className="relative outline-[3px] cursor-pointer w-full note text-pretty mb-3 text-xl grid h-[max-content] border-solid border-b-note-separator py-4 border-b-[1px]"
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
            before:mr-[.3em]
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
