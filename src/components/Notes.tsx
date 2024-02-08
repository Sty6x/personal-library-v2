import { motion } from "framer-motion";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef, useState } from "react";

interface t_dragEvents {
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}
const Note = ({
  contents,
  id,
  isEditing,
  handleSave,
  dragEvents: { onDragStart, onDrop },
}: {
  isEditing: boolean;
  contents: string;
  id: string;
  dragEvents: t_dragEvents;
  handleSave: (contents: string, noteID: string) => void;
}) => {
  const [editorState, setEditorState] = useState<string>(contents);
  const [isHovered, setIsHovered] = useState(false);
  const quillEditorRef = useRef(null);

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
        <>
          <ReactQuill
            ref={(el) => (quillEditorRef.current = el as any)}
            theme="snow"
            value={editorState}
            onChange={setEditorState}
          />
        </>
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
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={isHovered ? { scale: 1.4, opacity: 1 } : {}}
            whileTap={{ scale: 0.95 }}
            className="absolute right-0 top-[-10px]"
          >
            <button
              className="edit-icon edit-btn 
            drop-shadow-text-shadow 
            add-icon w-full before:mr-[.3em]
            items-center before:h-[20px] 
            flex content-center py-1"
              id={`button-${id}`}
            ></button>
          </motion.span>
          {contents}
        </motion.div>
      )}
    </>
  );
};
export default Note;
