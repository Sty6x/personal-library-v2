import { useOutletContext } from "react-router-dom";
import { t_appItems } from "../../types/context";
import BookItemList from "../../components/BookItemList";

const Favorites = () => {
  const {
    renderItems: { renderFavoriteBooks },
  } = useOutletContext<t_appItems<React.ReactNode>>();
  return (
    <section id="favorites-page">
      <BookItemList
        addLink={false}
        headerTitle="Your favorite books."
        bookItems={renderFavoriteBooks}
        onEmptyText="You dont have any favorite books."
      />
    </section>
  );
};

export default Favorites;
