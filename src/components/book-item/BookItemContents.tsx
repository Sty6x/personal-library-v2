import { formatDistance } from "date-fns/formatDistance";
import { t_book, t_currentBook, t_note, t_page } from "../../types/t_library";
import getRelatedItems from "../../utils/getRelatedItems";
import LibraryStorage from "../../utils/Library";

const BookItemContents = ({
  book,
  recentNote,
  recentPage,
}: {
  book: t_book | t_currentBook;
  recentNote?: t_note;
  recentPage?: t_page;
}) => {
  return (
    <>
      <span className="text-sm font-semi-bold">
        Last updated {formatDistance(new Date(book.lastUpdated), new Date())}{" "}
        ago.
      </span>
      <span className="my-1">
        <div className="text-3xl w-full leading-[1.8rem] font-bold">
          <h1 className=" ">{book.title}</h1>
        </div>
        <span className="text-md font-semibold">by {book.author}</span>
      </span>
      <span className="text-sm font-semi-bold">
        {recentNote && recentPage
          ? `Page #${recentPage?.pageNum} • Note #${recentNote?.noteNum}`
          : `Pages written ${book.pageIDs.length} • Notes created ${
              getRelatedItems<t_note>(book.pageIDs, LibraryStorage.notes).length
            }`}
      </span>
    </>
  );
};
export default BookItemContents;
