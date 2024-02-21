import { t_book, t_currentBook } from "../../types/t_library";

const BookItemContents = ({ book }: { book: t_book | t_currentBook }) => {
  return (
    <>
      <span className="max-w-[400px] leading-7 text-3xl min-[1930px]:text-[2.5rem] max-[1280px]:text-[1.4rem] max-[1280px]:leading-[1.4rem] font-bold">
        {book.title}
      </span>
      <span className="text-md min-[1930px]:text-[1.4rem] max-[1440px]:text-[1rem] font-semibold">
        by {book.author}
      </span>
      <span className="text-md min-[1930px]:text-[1rem]  max-[1440px]:text-[.8rem] font-semi-bold">
        Pages {book.pageIDs.length} • Notes {3}
      </span>
    </>
  );
};
export default BookItemContents;
