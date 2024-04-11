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
          <div className="max-w-[30em] flex flex-col gap-2">
            <h2 className=" font-bold leading-[1] text-xl">{book.title}</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
              modi perferendis. Perferendis totam exercitationem voluptatibus
              libero dolor in placeat necessitatibus vitae non atque, voluptatum
              beatae quod, deleniti mollitia nam alias?
            </p>
          </div>
        </Link>
      ) : (
        <Link
          to={link}
          style={{ backgroundColor: color }}
          className={`max-lg:hidden app-book-item flex justify-center items-center  ${
            !animate && "cursor-pointer"
          }`}
        >
          <div className="max-w-[30em] flex flex-col gap-2">
            <h2 className=" font-bold leading-[1] text-xl">{book.title}</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
              modi perferendis. Perferendis totam exercitationem voluptatibus
              libero dolor in placeat necessitatibus vitae non atque, voluptatum
              beatae quod, deleniti mollitia nam alias?
            </p>
          </div>
        </Link>
      )}
    </>
  );
};

export default AppBookItem;
