import { t_note } from "../../types/t_library";
import { formatDistance } from "date-fns";
import { AnimatePresence, motion, stagger } from "framer-motion";
import { useEffect, useState } from "react";

const BookItem = ({
  title,
  color,
  author,
  note,
  pageNum,
}: {
  title: string;
  color: string;
  author: string;
  date?: string;
  note: t_note;
  pageNum: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    // higher order composition
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundColor: color }}
      className={`book-item grid place-content-center hover:cursor-pointer`}
    >
      <AnimatePresence custom="popLayout">
        {isHovered ? (
          <motion.div
            initial={{ opacity: 0, scale: 0, display: "none" }}
            animate={{
              opacity: 1,
              scale: 1,
              display: "flex",
              transition: { delay: 0.2 },
            }}
            exit={{
              opacity: 0,
              scale: 0,
              transition: { duration: 0.2 },
            }}
            className="flex flex-col max-w-[30em] w-[max-content] drop-shadow-text-shadow"
            key={"book"}
          >
            {/* set these as children components */}
            <span className="text-lg font-semi-bold">
              Last updated{" "}
              {formatDistance(new Date(note.lastUpdated), new Date())} ago.
            </span>
            <span className="text-5xl font-bold leading-10">{title}</span>
            <span className="text-2xl font-semibold ">by {author}</span>
            <span className="text-lg leading-3">
              Page {pageNum} • Note #{note.noteNum}
            </span>
            {/* set these as children components */}
          </motion.div>
        ) : (
          <motion.div
            className="grid place-content-center drop-shadow-text-shadow min-h-[80%] min-w-[80%] w-[34em] h-[28em] bg-white rounded-md"
            key="contents"
            initial={{ opacity: 0, scale: 0, display: "none" }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { delay: 0.2 },
              display: "grid",
            }}
            exit={{
              opacity: 0,
              scale: 0,
              transition: { duration: 0.2 },
            }}
          >
            llol
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookItem;
