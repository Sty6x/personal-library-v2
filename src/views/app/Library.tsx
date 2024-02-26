import { useOutletContext } from "react-router-dom";
import BookItemList from "../../components/BookItemList";
import { t_appItems } from "../../types/context";

const Library = () => {
  const {
    renderItems: { renderNotRecent, renderRecentBooks },
  } = useOutletContext<t_appItems<React.ReactNode>>();
  return (
    <section id="library-page" className="flex flex-col gap-16 max-sm:gap-8">
      <BookItemList
        link="app/recent"
        linkName="Go to recent books"
        bookItems={renderRecentBooks}
        headerTitle="
      Here are the recent books you've read."
        onEmptyText="Looks like your library is empty :("
      />

      {renderNotRecent.length > 0 ? (
        <BookItemList
          addLink={false}
          bookItems={renderNotRecent}
          headerTitle="Explore more of your books."
          onEmptyText="Add more books."
        />
      ) : null}
    </section>
  );
};

export default Library;
