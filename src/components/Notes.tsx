import { motion } from "framer-motion";
interface t_dragEvents {
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}
const Note = ({
  contents,
  id,
  dragEvents: { onDragStart, onDrop, onDragOver },
}: {
  contents: string;
  id: string;
  dragEvents: t_dragEvents;
}) => {
  return (
    <motion.div
      whileHover={{
        x: [0, 5, -5, 0],
        transition: { repeat: Infinity, repeatType: "loop" },
      }}
      id={id}
      draggable={true}
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
      className="z-0 cursor-pointer w-full note text-pretty mb-3 text-xl grid h-[max-content] border-solid border-b-black py-6 border-b-[1px]"
    >
      {contents}
    </motion.div>
  );
};
export default Note;
