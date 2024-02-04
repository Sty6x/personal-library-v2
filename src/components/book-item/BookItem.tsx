import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";

const BookItem = ({
  color,
  motionKey,
  children,
  noteContents,
}: {
  color: string;
  motionKey: number;
  children: ReactNode;
  noteContents: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    // higher order composition
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      key={motionKey}
      style={{ backgroundColor: color }}
      className={`book-item flex justify-center items-center hover:cursor-pointer`}
    >
      <AnimatePresence custom="popLayout">
        {!isHovered ? (
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
            className="flex flex-col px-20  w-[max-content] drop-shadow-text-shadow"
            key={"book"}
          >
            {children}
          </motion.div>
        ) : (
          <motion.div
            className="grid place-content-center gap-4 px-10 py-12 shadow-book-item min-w-[80%] min-h-[80%] max-h-[80%] max-w-[80%] w-[38em] h-[28em] bg-white rounded-md"
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
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">{children}</div>
              <div>
                <p className="note-contents-preview">{noteContents}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BookItem;
