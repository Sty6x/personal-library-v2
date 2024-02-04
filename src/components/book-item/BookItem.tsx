import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";

const BookItem = ({
  color,
  motionKey,
  children,
  noteContents,
  link,
}: {
  color: string;
  motionKey: number;
  children: ReactNode;
  noteContents: string;
  link: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    // higher order composition
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      key={motionKey}
      style={{ backgroundColor: color }}
      className={`book-item flex justify-center items-center `}
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
            className="flex flex-col max-w-[70%] w-[max-content] drop-shadow-text-shadow"
            key={"book"}
          >
            {children}
          </motion.div>
        ) : (
          <motion.a
            href="#"
            className="
            hover:cursor-pointer
             hover:shadow-book-item-active
            hover:transition-shadow
            transition-shadow
            hover:duration-200
            duration-200
            shadow-book-item
            grid place-content-center gap-4 px-10 min-[1921px]:px-20 py-12  min-w-[80%] min-h-[80%] max-h-[80%] max-w-[80%] w-[38em] h-[28em] bg-white rounded-md"
            key="contents"
            initial={{ opacity: 0, scale: 0, display: "none" }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.2,
              },
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
                <p className=" max-[1280px]:text-[1rem] text-[1.2rem] note-contents-preview">
                  {noteContents}
                </p>
              </div>
            </div>
          </motion.a>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BookItem;
