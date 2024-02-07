import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { t_currentPage } from "../../types/t_library";

const PageHeader = ({
  isScrolling,
  pageData,
  handleOnAddNote,
}: {
  isScrolling: boolean;
  pageData: t_currentPage;
  handleOnAddNote: () => void;
}) => {
  const { bookID } = useParams();

  return (
    <header className="z-10 sticky top-0 border-b-black border-b-2 border-solid bg-white bg-gridWhite py-6">
      {!isScrolling ? (
        <>
          <Link to={"/library"} className="underline text-lg">
            Go back to library
          </Link>
          <Link to={`/${bookID}`}>
            <motion.div className="w-[fit-content]">
              <span>
                <h1 className="text-7xl font-bold drop-shadow-text-shadow">
                  {pageData?.book.title}
                </h1>
              </span>
              <span>
                <p className="text-2xl font-semibold drop-shadow-text-shadow">
                  by {pageData?.book.author}
                </p>
              </span>
            </motion.div>
          </Link>
          <p className="drop-shadow-text-shadow text-xl">
            Page {pageData?.currentPage.pageNum}
          </p>
          <div className="flex gap-4 mt-3">
            <motion.span whileHover={{ x: 5 }} className="w-[max-content]">
              <button
                onClick={() => {
                  handleOnAddNote();
                }}
                type="button"
                className="drop-shadow-text-shadow add-icon w-full before:mr-[.3em] items-center before:h-[20px] relative flex content-center font-semibold py-1 text-xl"
              >
                Add Note
              </button>
            </motion.span>

            <motion.span whileHover={{ x: 5 }} className=" w-[max-content]">
              <Link
                className="drop-shadow-text-shadow add-icon w-full before:mr-[.3em] items-center before:h-[20px] relative flex content-center font-semibold py-1 text-xl"
                to={"/#"}
              >
                Add Page
              </Link>
            </motion.span>
          </div>
        </>
      ) : (
        <p>Scrolled</p>
      )}
    </header>
  );
};

export default PageHeader;
