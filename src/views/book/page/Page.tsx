import { useOutletContext, useParams } from "react-router-dom";
import {
  t_book,
  t_note,
  t_currentBook,
  t_page,
} from "../../../types/t_library";
import { useEffect, useState } from "react";
import { data } from "../../../placeholderData";
import getRelatedItems from "../../../utils/getRelatedItems";
import BookHeader from "../../../components/BookHeader";

type t_currentPage = {
  currentPage: t_page;
  book: { title: string; author: string };
  notes: Array<t_note>;
};

const Page = () => {
  const { bookAuthor, bookTitle } = useOutletContext<{
    bookTitle: string;
    bookAuthor: string;
  }>();
  const { pageID } = useParams<any>();
  const [pageData, setPageData] = useState<t_currentPage | null>(null);

  // set as loader
  function getPageData(storage: Array<t_page>) {
    const [currentPage] = storage.filter((page) => page.id === pageID);
    const getPageNotes = getRelatedItems<t_note>(
      currentPage.noteIDs,
      data.notes
    );
    const currentPageData: t_currentPage = {
      book: {
        title: bookTitle,
        author: bookAuthor,
      },
      currentPage,
      notes: getPageNotes,
    };
    setPageData({ ...currentPageData });
  }

  useEffect(() => {
    getPageData(data.pages);
  }, []);

  useEffect(() => {
    console.log(pageData);
  }, [pageData]);

  return (
    <main id="page">
      <BookHeader
        title={pageData?.book.title as string}
        author={pageData?.book.author as string}
      />
    </main>
  );
};

export default Page;
