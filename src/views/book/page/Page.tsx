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

type t_currentPage = {
  bookTitle: string;
  bookAuthor: string;
  page: t_page;
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
  function getData(storage: Array<t_page>) {
    const [currentPage] = storage.filter((page) => page.id === pageID);
    const getPageNotes = getRelatedItems<t_note>(
      currentPage.noteIDs,
      data.notes
    );
    const currentPageData: t_currentPage = {
      bookTitle,
      bookAuthor,
      page: currentPage,
      notes: getPageNotes,
    };
    setPageData({ ...currentPageData });
  }

  useEffect(() => {
    getData(data.pages);
  }, []);

  useEffect(() => {
    console.log(pageData);
  }, [pageData]);

  return <main id="page"></main>;
};

export default Page;
