import { data } from "../../placeholderData";
import { t_note, t_page } from "../../types/t_library";
import getRelatedItems from "../getRelatedItems";
import LibraryStorage from "../localStorage";

export default async function bookLoader({ params }: any) {
  const [currentBook] = data.books.filter((book) => book.id === params.bookID);
  const { pages } = LibraryStorage.getLocalStorage();
  const getPages = getRelatedItems<t_page>(currentBook.pageIDs, pages);

  const countNotes = () => {
    let count = 0;
    getPages.forEach((page) => {
      count += page.noteIDs.length;
    });
    return count;
  };

  return { ...currentBook, numOfNotes: countNotes() };
}
