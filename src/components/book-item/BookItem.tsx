import { t_note } from "../../types/t_library";
import { formatDistance } from "date-fns";

const BookItem = ({
  title,
  color,
  author,
  note,
  pageNum,
}: {
  title: string;
  color: string;
  author: string;
  date?: string;
  note: t_note;
  pageNum: number;
}) => {
  return (
    // higher order composition
    <div
      style={{ backgroundColor: color }}
      className={`book-item grid place-content-center hover:cursor-pointer`}
    >
      <div className="flex flex-col max-w-[30em] w-[max-content] drop-shadow-text-shadow">
        {/* set these as children components */}
        <span className="text-lg font-semi-bold">
          Last updated {formatDistance(new Date(note.lastUpdated), new Date())}{" "}
          ago.
        </span>
        <span className="text-5xl font-bold leading-10">{title}</span>
        <span className="text-2xl font-semibold ">by {author}</span>
        <span className="text-lg leading-3">
          Page {pageNum} • Note #{note.noteNum}
        </span>
        {/* set these as children components */}
      </div>
    </div>
  );
};

export default BookItem;
