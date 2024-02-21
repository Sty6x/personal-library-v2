import { Link, useOutletContext, useParams } from "react-router-dom";
import getRelatedItems from "../utils/getRelatedItems";
import { t_page } from "../types/t_library";
import LibraryStorage from "../utils/Library";

const PageNavigator = ({ currentPageNum }: { currentPageNum: number }) => {
  const { bookPageIDs } = useOutletContext<{
    bookPageIDs: string[];
  }>();
  const { pageID, bookID } = useParams();

  const pages = getRelatedItems<t_page>(bookPageIDs, LibraryStorage.pages);
  const sortPagesByNum = pages.sort((a, b) => a.pageNum - b.pageNum);
  const currentPage = sortPagesByNum.findIndex((page) => page.id === pageID);

  return (
    <div
      id="page-nav-container"
      className="fixed top-[90%] left-[50%] translate-x-[-50%] bg-black rounded-md z-10"
    >
      <div className="py-2 px-5 flex gap-4">
        <>
          {sortPagesByNum[currentPage - 1] !== undefined ? (
            <Link
              to={`/${bookID}/${sortPagesByNum[currentPage - 1].id}`}
              id="back"
              className="back-icon flex"
            />
          ) : (
            <span className="w-[20px] h-[auto]" />
          )}
        </>
        <div className="bg-[#ffffff] p-1 rounded" id="page-number">
          <span>
            {currentPageNum}/{pages.length}
          </span>
        </div>
        <>
          {sortPagesByNum[currentPage + 1] !== undefined ? (
            <Link
              to={`/${bookID}/${pages[currentPage + 1].id}`}
              id="next"
              className="next-icon flex"
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
