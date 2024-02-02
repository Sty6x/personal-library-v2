import { useState } from "react";
import BookItem from "../../components/book-item/BookItem";
import { data } from "../../placeholderData.ts";
import { t_book, t_library, t_note, t_page } from "../../types/t_library.ts";

function Home() {
  const [recentBooks, setRecentBooks] = useState<t_library | null>(data);

  return (
    <main id="home-page" className="h-screen">
      <div
        id="card-items-container"
        className="grid grid-rows-2 grid-cols-2 h-full"
      >
        <BookItem />
        <div className="bg-transparent">
          <div>Personal Library</div>
        </div>
        <BookItem />
        <BookItem />
      </div>
    </main>
  );
}

export default Home;
