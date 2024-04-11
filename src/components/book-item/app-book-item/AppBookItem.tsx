import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { t_book, t_note, t_page } from "../../../types/t_library";

interface t_recentBooks extends t_book {
  color: string;
  note: t_note | undefined;
  page: t_page | undefined;
}

interface t_appBook extends t_recentBooks {
  notes: Array<t_note> | [];
}

const AppBookItem = ({
  color,
  link,
  animate = false,
  book,
}: {
  animate?: boolean;
  book: t_appBook;
  color: string;
  motionKey: number;
  link: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      {book.notes.length !== 0 ? (
        <Link
          to={link}
          style={{ backgroundColor: color }}
          className={`max-lg:hidden app-book-item flex justify-center items-center  ${
            !animate && "cursor-pointer"
          }`}
        >
          {book.notes[0].contents}
        </Link>
      ) : (
        <Link
          to={link}
          style={{ backgroundColor: color }}
          className={`max-lg:hidden app-book-item flex justify-center items-center  ${
            !animate && "cursor-pointer"
          }`}
        >
          Do Something
        </Link>
      )}
    </>
  );
};

export default AppBookItem;
