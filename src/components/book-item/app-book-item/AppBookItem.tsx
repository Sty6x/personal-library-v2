import { motion } from "framer-motion";
import React, { useState } from "react";
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

const AppBookLayout = ({
  children,
  link,
  color,
}: {
  children: React.ReactNode;
  link: string;
  color: string;
}) => {
  return (
    <Link
      to={link}
      style={{ borderColor: color, background: color }}
      className={` border-[2px] px-4 rounded-lg hover:drop-shadow-md hover:transition transition ease-in drop-shadow-sm
      bg-white border-solid app-book-item flex justify-center items-center`}
    >
      {children}
    </Link>
  );
};

const AppBookItem = ({
  color,
  link,
  book,
}: {
  book: t_appBook;
  color: string;
  link: string;
}) => {
  return (
    <>
      {book.notes.length !== 0 ? (
        <AppBookLayout link={link} color={color}>
          <div className="max-w-[30em] min-w-[10em] w-[20em] flex flex-col gap-2">
            <span>
              <h2 className=" font-bold leading-[1] text-xl text-ellipsis overflow-hidden text-nowrap ">
                {book.title}
              </h2>

              <span className="text-sm font-semibold"> by {book.author}</span>
            </span>
            <p className=" line-clamp-5 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
              modi perferendis. Perferendis totam exercitationem voluptatibus
              libero dolor in placeat necessitatibus vitae non atque, voluptatum
              beatae quod, deleniti mollitia nam alias?
            </p>
          </div>
        </AppBookLayout>
      ) : (
        <AppBookLayout link={link} color={color}>
          <div className="max-w-[30em] min-w-[10em] w-[20em] flex flex-col gap-2">
            <span>
              <h2 className=" font-bold leading-[1] text-xl text-ellipsis overflow-hidden text-nowrap ">
                {book.title}
              </h2>
              <span className="text-sm font-semibold"> by {book.author}</span>
            </span>
            <p className=" line-clamp-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
              modi perferendis. Perferendis totam exercitationem voluptatibus
              libero dolor in placeat necessitatibus vitae non atque, voluptatum
              beatae quod, deleniti mollitia nam alias?
            </p>
          </div>
        </AppBookLayout>
      )}
    </>
  );
};

export default AppBookItem;
