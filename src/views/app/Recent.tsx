import { useOutletContext } from "react-router-dom";
import { t_appItems } from "../../types/context";
import BookItemList from "../../components/BookItemList";

const Recent = () => {
  const {
    renderItems: { renderRecentBooks },
  } = useOutletContext<t_appItems<React.ReactNode>>();
  return (
    <section id="recents-page">
      <BookItemList
        addLink={false}
        headerTitle="Your recently read books."
        bookItems={renderRecentBooks}
        onEmptyText="Looks like you library is empty :("
      />
    </section>
  );
};

export default Recent;
