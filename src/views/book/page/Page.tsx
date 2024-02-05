import { useParams } from "react-router-dom";
import { t_book, t_note, t_currentBook } from "../../../types/t_library";
import { useEffect, useState } from "react";
import { data } from "../../../placeholderData";
import getRelatedItems from "../../../utils/getRelatedItems";

const Page = () => {
  const { bookID, pageID } = useParams<any>();
  const [book, setBook] = useState<t_currentBook | null>(null);

  // set as loader
  function getBookData(storage: Array<t_book>) {
    const [currentPage] = data.pages.filter((page) => page.id === pageID);

    const getPageNotes = getRelatedItems<t_note>(
      currentPage.noteIDs,
      data.notes
    );
    const setCurrentBook = {
      page: currentPage,
      note: getPageNotes,
    };
  }

  useEffect(() => {
    // getBookData(data.books);
  }, []);

  useEffect(() => {
    console.log(book);
  }, [book]);

  return <main id="page"></main>;
};

export default Page;
