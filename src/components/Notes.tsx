import { motion } from "framer-motion";
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
    <motion.div
      whileTap={{ scale: 0.9 }}
      id={id}
      draggable={true}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragEnd={onDragLeave}
      className="z-0 outline-[3px] cursor-pointer w-full note text-pretty mb-3 text-xl grid h-[max-content] border-solid border-b-black py-6 border-b-[1px]"
    >
      {contents}
    </motion.div>
  );
};
export default Note;
