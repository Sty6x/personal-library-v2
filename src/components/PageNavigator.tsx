import { Link, useOutletContext, useParams } from "react-router-dom";
import getRelatedItems from "../utils/getRelatedItems";
import { t_page } from "../types/t_library";
import LibraryStorage from "../utils/Library";
import { useEffect, useState } from "react";

const PageNavigator = ({ currentPageNum }: { currentPageNum: number }) => {
  const { bookPageIDs } = useOutletContext<{
    bookPageIDs: string[];
  }>();
  const { pageID, bookID } = useParams();

  const pages = getRelatedItems<t_page>(bookPageIDs, LibraryStorage.pages);
  const currentPage = pages.findIndex((page) => page.id === pageID);

  return (
    <div
      id="page-nav-container"
      className="fixed top-[90%] left-[50%] translate-x-[-50%] bg-black rounded-md z-10"
    >
      <div className="py-2 px-5 flex gap-4">
        <>
          {pages[currentPage - 1] !== undefined ? (
            <Link
              to={`/${bookID}/${pages[currentPage - 1].id}`}
              id="back"
              className="back-icon flex"
            />
          ) : (
            <p>lol</p>
          )}
        </>
        <div className="bg-[#ffffff] p-1 rounded" id="page-number">
          <span>{pages[currentPage].pageNum}/120</span>
        </div>
        <>
          {pages[currentPage + 1] !== undefined ? (
            <Link
              to={`/${bookID}/${pages[currentPage + 1].id}`}
              id="next"
              className="next-icon flex"
            />
          ) : (
            <p>lol</p>
          )}
        </>
      </div>
    </div>
  );
};

export default PageNavigator;
