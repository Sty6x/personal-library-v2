import { t_note } from "../../types/t_library";

const BookItem = ({
  title,
  color,
  author,
  note,
}: {
  title: string;
  color: string;
  author: string;
  date?: string;
  note: t_note;
}) => {
  return (
    // higher order composition
    <div
      style={{ backgroundColor: color }}
      className={`book-item grid place-content-center`}
    >
      <div className="flex flex-col max-w-[30em]">
        {/* set these as children components */}
        <span className="text-lg">Last updated yesterday</span>
        <span className="text-5xl font-bold leading-12">{title}</span>
        <span className="text-xl">{author}</span>
        <span className="text-sm">Page 51 • Note #5</span>
        {/* set these as children components */}
      </div>
    </div>
  );
};

export default BookItem;
