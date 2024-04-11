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
  favorite,
}: {
  children: React.ReactNode;
  link: string;
  color: string;
  favorite: string;
}) => {
  return (
    <Link
      to={link}
      style={{ borderColor: color, background: color }}
      className={`${
        favorite !== "" ? "favorite-book" : ""
      } app-book-item border-[2px] px-10  rounded-lg hover:drop-shadow-md hover:transition transition ease-in drop-shadow-sm
      bg-white h-full border-solid relative text-left`}
    >
      <div className="h-full flex-col flex justify-center">{children}</div>
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
        <AppBookLayout favorite={book.favorite} link={link} color={color}>
          <div className="grid place-content-center rounded-full bg-[#1d1d1d10] p-2 size-14 mb-2 box-border">
            <div className="grid place-content-center rounded-full bg-[#1d1d1d10] p-2 size-10 ">
              <span className="font-bold text-2xl">{book.title[0]}</span>
            </div>
          </div>
          <div className="max-w-[30em] min-w-[10em] w-[20em] flex flex-col gap-2">
            <span>
              <h2 className=" font-bold leading-[1] text-xl text-ellipsis overflow-hidden text-nowrap ">
                {book.title}
              </h2>
              <span className="text-sm font-semibold"> by {book.author}</span>
            </span>
            <p className=" line-clamp-2 text-pretty">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque,
              modi perferendis. Perferendis totam exercitationem voluptatibus
              libero dolor in placeat necessitatibus vitae non atque, voluptatum
              beatae quod, deleniti mollitia nam alias?
            </p>
          </div>
        </AppBookLayout>
      ) : (
        <AppBookLayout favorite={book.favorite} link={link} color={color}>
          <div className="max-w-[30em] min-w-[10em] w-[20em] flex flex-col ">
            <div className="grid place-content-center rounded-full bg-[#1d1d1d20] p-2 size-14 mb-2 box-border">
              <div className="grid place-content-center  rounded-full bg-[#1d1d1d10] p-2 size-10 ">
                <span className="font-bold text-2xl">{book.title[0]}</span>
              </div>
            </div>
            <span>
              <h2 className=" font-bold leading-[1] text-xl text-ellipsis overflow-hidden text-nowrap ">
                {book.title}
              </h2>
              <span className="text-sm font-semibold"> by {book.author}</span>
            </span>
          </div>
        </AppBookLayout>
      )}
    </>
  );
};

export default AppBookItem;
