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
    <div style={{ backgroundColor: color }} className={`book-item`}>
      {title}
    </div>
  );
};

export default BookItem;
