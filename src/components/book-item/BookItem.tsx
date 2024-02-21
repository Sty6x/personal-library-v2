import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

const BookItemContentsLayout = ({ children }: { children: ReactNode }) => {
  return (
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
      className="flex flex-col max-w-[70%] w-[350px] "
    >
      {children}
    </motion.div>
  );
};

const BookItem = ({
  color,
  motionKey,
  children,
  noteContents,
  link,
  animate = false,
}: {
  animate?: boolean;
  color: string;
  motionKey: number;
  children?: ReactNode;
  noteContents?: string;
  link: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      {/* NOTICE NOTICE  */}
      {/*  This section renders the book contents only */}
      {!animate ? (
        <Link
          className="flex items-center justify-center cursor-pointer rounded-sm shadow-btn-hover transition-shadow hover:transition-shadow hover:shadow-btn-hover-active"
          style={{ backgroundColor: color }}
          to={link}
        >
          <BookItemContentsLayout>{children}</BookItemContentsLayout>
        </Link>
      ) : (
        // {/* NOTICE NOTICE */}
        // {/*  This section renders the notes contents if a note exists */}
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          key={motionKey}
          style={{ backgroundColor: color }}
          className={`book-item h-full flex justify-center items-center  ${
            !animate &&
            "cursor-pointer  rounded-sm shadow-btn-hover transition-shadow hover:transition-shadow hover:shadow-btn-hover-active"
          }`}
        >
          <AnimatePresence custom="popLayout">
            {!isHovered ? (
              <BookItemContentsLayout key={"book"}>
                {children}
              </BookItemContentsLayout>
            ) : (
              <motion.a
                href={link}
                className="
            hover:cursor-pointer
            hover:shadow-book-item-active
            hover:transition-shadow
            transition-shadow
            hover:duration-200
            duration-200
            shadow-book-item
             gap-4 px-10 min-[1921px]:px-20 py-6  min-w-[80%] min-h-[80%] max-h-[80%] max-w-[80%] w-[38em] h-[28em] bg-white rounded-md"
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
                <div className="grid place-content-center gap-2">
                  <div className="flex flex-col">{children}</div>
                  <div>
                    {/* give fixed width and height for note contents  */}
                    <p className=" max-[1280px]:text-[1rem] text-[1rem] note-contents-preview">
                      {/* {noteContents} */}
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </p>
                  </div>
                </div>
              </motion.a>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
};

export default BookItem;
