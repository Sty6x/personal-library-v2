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
      <span className="text-sm font-semi-bold max-md:text-[.7rem]">
        Last updated {formatDistance(new Date(book.lastUpdated), new Date())}{" "}
        ago.
      </span>
      <span className="my-1 max-md:my-0">
        <div className="text-[1.7rem] max-lg:text-2xl max-lg:leading-6 max-md:text-[1.2rem] max-md:leading-5 w-full leading-[1.8rem] font-bold">
          <h1 className=" ">{book.title}</h1>
        </div>
        <span className="text-md font-semibold max-md:text-sm max-md:leading-5">
          by {book.author}
        </span>
      </span>
      <span className="text-sm font-semi-bold max-md:text-[.8rem] max-[300px]:text-[.7rem]  max-md:leading-5">
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
