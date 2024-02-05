import { data } from "../../placeholderData";
import { t_note, t_page } from "../../types/t_library";
import getRelatedItems from "../getRelatedItems";

export default async function bookLoader({ params }) {
  const [currentBook] = data.books.filter((book) => book.id === params.bookID);
  const getPages = getRelatedItems<t_page>(currentBook.pageIDs, data.pages);

  const countNotes = () => {
    let count = 0;
    getPages.forEach((page) => {
      count += page.noteIDs.length;
    });
    return count;
  };

  return { ...currentBook, numOfNotes: countNotes() };
}
