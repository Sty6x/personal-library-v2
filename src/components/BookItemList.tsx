import { Link } from "react-router-dom";

type t_BookItemList = {
  bookItems: React.ReactNode[];
  headerTitle: string;
  addLink?: boolean;
  link?: string;
  linkName?: string;
  onEmptyText?: string;
};
const BookItemList = ({
  bookItems,
  headerTitle,
  addLink = true,
  linkName,
  link,
  onEmptyText,
}: t_BookItemList) => {
  return (
    <section>
      <div id="book-list-header" className="flex mb-4">
        <h3 className="text-3xl text-black">{headerTitle}</h3>

        {addLink && (
          <Link
            to={`/${link}`}
            className="flex items-center ml-auto py-1 px-4 font-bold bg-accent-three text-white rounded-sm hover:shadow-btn-hover-active shadow-btn-hover hover:transition-shadow transition-shadow duration-200"
          >
            {linkName}
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 auto-rows-[minmax(250px,1fr)] gap-4">
        {bookItems && bookItems.length > 0 ? bookItems : onEmptyText}
      </div>
    </section>
  );
};

export default BookItemList;
