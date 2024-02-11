import { t_page } from "../../types/t_library";
import getRelatedItems from "../getRelatedItems";
import LibraryStorage from "../Library";

export default async function bookLoader({ params }: any) {
  const [currentBook] = LibraryStorage.books.filter(
    (book) => book.id === params.bookID
  );
  const getPages = getRelatedItems<t_page>(
    currentBook.pageIDs,
    LibraryStorage.pages
  );

  const countNotes = () => {
    let count = 0;
    getPages.forEach((page) => {
      count += page.noteIDs.length;
    });
    return count;
  };

  return { ...currentBook, numOfNotes: countNotes() };
}
