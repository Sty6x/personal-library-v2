import React, { useState } from "react";
import { Link } from "react-router-dom";
import { t_book, t_note, t_page } from "../../../types/t_library";

interface t_appBook extends t_book {
  notes: Array<t_note> | [];
  color?: string;
  favorite: "favorite" | "";
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
      style={{ borderColor: color, background: "white" }}
      className={`${
        favorite !== "" ? "favorite-book" : ""
      } book-item-favorites grid place-items-start items-center border-[2px] px-10 rounded-lg hover:drop-shadow-lg hover:transition transition ease-in drop-shadow-md
      bg-white h-full max-[800px]:h-44 max-[800px]:px-6 max-[800px]:py-4 border-solid relative text-left`}
    >
      <div className="">{children}</div>
    </Link>
  );
};
const BookInitial = ({
  initial,
  color,
}: {
  initial: string;
  color: string;
}) => {
  return (
    <div
      style={{ background: color }}
      className="grid place-content-center rounded-full bg-[#43685020] p-1 h-14 min-w-[3.5em] box-border"
    >
      <span className="font-bold text-2xl">{initial}</span>
    </div>
  );
};
const BookData = ({ title, author }: { author: string; title: string }) => {
  return (
    <div className="flex flex-col gap-2">
      <span>
        {/* w-[250px] overflow-hidden whitespace-nowrap text-ellipsis text-nowrap */}
        <h2 className="line-clamp-2 font-bold leading-[1] text-2xl max-[800px]:text-xl max-[800px]:leading-[1.2] max-w-[14em]  ">
          {title}
        </h2>
        <span className="text-sm font-semibold"> by {author}</span>
      </span>
    </div>
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
  // console.log(book);
  return (
    <>
      {book.notes.length !== 0 ? (
        <AppBookLayout favorite={book.favorite} link={link} color={color}>
          <div className="mb-2 flex items-center box-border gap-4 justify-start">
            <BookInitial color={color} initial={book.title[0]} />
            <BookData title={book.title} author={book.author} />
          </div>
          <p className=" line-clamp-4 text-sm leading-4 box-border">
            {book.notes[0].contents}
          </p>
        </AppBookLayout>
      ) : (
        <AppBookLayout favorite={book.favorite} link={link} color={color}>
          <div className="mb-2 flex items-center box-border gap-4 justify-start">
            <BookInitial color={color} initial={book.title[0]} />
            <BookData title={book.title} author={book.author} />
          </div>
        </AppBookLayout>
      )}
    </>
  );
};

export default AppBookItem;
