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
  const sortPagesByNum = pages.sort((a, b) => a.pageNum - b.pageNum);
  const currentPage = sortPagesByNum.findIndex((page) => page.id === pageID);
  const [isPageInputClicked, setIsPageInputClicked] = useState<boolean>(false);
  const [pageSearch, setPageSearch] = useState<number>(
    sortPagesByNum[currentPage].pageNum,
  );

  function handlePageIndexSearch() {}

  useEffect(() => {
    console.log(pageSearch);
  }, [pageSearch]);

  return (
    <div
      id="page-nav-container"
      className="fixed top-[90%] left-[50%] translate-x-[-50%] bg-black rounded-md z-10"
      onClick={(e) => {
        const target = e.target as any;
        setIsPageInputClicked(false);
        if (target.id === "page-nav-button") {
          setIsPageInputClicked(true);
          return;
        }
      }}
    >
      <div className="py-2 px-5 flex gap-4">
        <>
          {sortPagesByNum[currentPage - 1] !== undefined ? (
            <Link
              to={`/${bookID}/${sortPagesByNum[currentPage - 1].id}`}
              id="back"
              className="back-icon items-center flex"
            />
          ) : (
            <span className="w-[20px] h-[auto]" />
          )}
        </>
        <div
          className="bg-[#ffffff] px-4 py-2 rounded-sm max-w-full"
          id="page-number"
        >
          {isPageInputClicked ? (
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  console.log("search");
                }

                if (e.key === "Escape") {
                  e.currentTarget.blur();
                  console.log("Removed focus");
                }
              }}
              onChange={(e) =>
                setPageSearch(e.currentTarget.value as unknown as number)
              }
              value={pageSearch}
              type="number"
              max={20}
              autoFocus={isPageInputClicked}
              className="w-[50px] text-center appearance-none outline-none"
            />
          ) : (
            <button className="w-[50px] text-center " id="page-nav-button">
              {" "}
              {currentPageNum}
            </button>
          )}
        </div>
        <>
          {sortPagesByNum[currentPage + 1] !== undefined ? (
            <Link
              to={`/${bookID}/${pages[currentPage + 1].id}`}
              id="next"
              className="next-icon items-center flex"
            />
          ) : (
            <span className="w-[20px] h-[auto]" />
          )}
        </>
      </div>
    </div>
  );
};

export default PageNavigator;
