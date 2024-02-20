import { useOutletContext } from "react-router-dom";
import BookItemList from "../../components/BookItemList";

type t_library<T> = {
  renderItems: {
    [key: string]: Array<T>;
  };
};

const Library = () => {
  const {
    renderItems: { renderAllBooks, renderRecentBooks },
  } = useOutletContext<t_library<React.ReactNode>>();
  return (
    <section id="book-item-list-container" className="flex flex-col gap-16">
      <BookItemList
        link="recent-books"
        linkName="Recent Books"
        bookItems={renderRecentBooks}
        headerTitle="
      Here are the recent books you've read."
      />

      <BookItemList
        addLink={false}
        bookItems={renderAllBooks}
        headerTitle="Explore more of your books."
      />
    </section>
  );
};

export default Library;
