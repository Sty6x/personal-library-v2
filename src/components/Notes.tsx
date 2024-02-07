import { motion } from "framer-motion";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

interface t_dragEvents {
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}
const Note = ({
  contents,
  id,
  dragEvents: { onDragStart, onDrop },
}: {
  contents: string;
  id: string;
  dragEvents: t_dragEvents;
}) => {
  const [editorState, setEditorState] = useState<string>(contents);

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
    <div>
      {true ? (
        <ReactQuill
          theme="snow"
          value={editorState}
          onChange={setEditorState}
        />
      ) : (
        <motion.div
          whileTap={{ scale: 0.95 }}
          id={id}
          draggable={true}
          onDragStart={onDragStart}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragEnd={onDragLeave}
          className="relative z-10 outline-[3px] cursor-pointer w-full note text-pretty mb-3 text-xl grid h-[max-content] border-solid border-b-note-separator py-4 border-b-[1px]"
        >
          {contents}
        </motion.div>
      )}
    </div>
  );
};
export default Note;
