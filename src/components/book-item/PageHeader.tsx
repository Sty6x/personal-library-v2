import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { t_currentPage } from "../../types/t_library";
import { useState } from "react";

const PageHeader = ({
  isScrolling,
  pageData,
  handleOnAddNote,
  handleOnAddPage,
  handleOnEditPage,
  handleRemovePageModal,
  bookAuthor,
  bookTitle,
}: {
  isScrolling: boolean;
  pageData: t_currentPage;

  bookAuthor: string;
  bookTitle: string;
  handleOnAddNote: () => void;
  handleRemovePageModal: () => void;
  handleOnAddPage: () => void;
  handleOnEditPage: (newPageNumber: number) => void;
}) => {
  const { bookID } = useParams();
  const [isPageEditing, setIsPageEditing] = useState(false);
  const [pageNumberInput, setPageNumberInput] = useState<number>(
    pageData.currentPage.pageNum
  );

  return (
    <header
      className={`z-20 sticky top-0 border-b-black border-solid bg-white bg-gridWhite py-6`}
    >
      <Link to={"/library"} className="underline text-lg">
        Go back to library
      </Link>
      <Link to={`/${bookID}`}>
        <div className="w-[fit-content]">
          <span>
            <h1
              className={`
              ${isScrolling ? "text-4xl" : "text-7xl"}
               font-bold `}
            >
              {bookTitle}
            </h1>
          </span>
          <span>
            <p
              className={`
              ${isScrolling ? "text-lg" : "text-2xl"}
            font-semibold `}
            >
              by {bookAuthor}
            </p>
          </span>
        </div>
      </Link>
      <>
        {isPageEditing ? (
          <div
            id="pageNumberEdit"
            className="mt-4 flex flex-col gap-1 w-[fit-content]"
          >
            <div className="">
              <span className="flex gap-4 ">
                <button
                  className="hover:underline font-semibold"
                  type="button"
                  onClick={() => {
                    handleOnEditPage(pageNumberInput);
                    setIsPageEditing(false);
                  }}
                >
                  Done
                </button>
                <button
                  className="hover:underline"
                  type="button"
                  onClick={() => {
                    setIsPageEditing(false);
                  }}
                >
                  Cancel
                </button>
              </span>
            </div>
            <div className="w-[fit-content] ">
              <span
                className={`
                ${isScrolling ? "text-md" : "text-xl"}
                `}
              >
                Page{" "}
              </span>
              <input
                type="number"
                className={`w-[2em] appearance-none outline-none  focus-within:border-b border-b border-b-black
                ${isScrolling ? "text-md" : "text-xl"}
                `}
                defaultValue={pageNumberInput}
                onChange={(e) => {
                  setPageNumberInput(Number(e.target.value));
                }}
              />
            </div>
          </div>
        ) : (
          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => {
              setIsPageEditing(true);
            }}
            className={` 
              ${isScrolling ? "text-md" : "text-xl"} w-[fit-content]`}
          >
            Page {pageData?.currentPage.pageNum}
          </motion.button>
        )}
      </>
      <div className={`flex gap-4 mt-3`}>
        <motion.span whileHover={{ x: 5 }} className="w-[max-content]">
          <button
            onClick={() => {
              handleOnAddNote();
            }}
            type="button"
            className={`
            ${isScrolling ? "text-md" : "text-xl"}
             add-icon w-full before:mr-[.3em] items-center before:h-[20px] relative flex content-center py-1 `}
          >
            Add Note
          </button>
        </motion.span>

        <motion.span whileHover={{ x: 5 }} className=" w-[max-content]">
          <button
            className={`
            ${isScrolling ? "text-md" : "text-xl"}
             add-icon w-full before:mr-[.3em] items-center before:h-[20px] relative flex content-center py-1`}
            onClick={() => {
              handleOnAddPage();
            }}
          >
            Add Page
          </button>
        </motion.span>

        <motion.span whileHover={{ x: 5 }} className=" w-[max-content]">
          <button
            className={`
            ${isScrolling ? "text-md" : "text-xl"}
            trash-icon self-start box-border text-accent-danger font-bold
            w-full before:mr-[.3em] items-center before:h-[20px] relative flex content-center py-1`}
            onClick={() => {
              handleRemovePageModal();
            }}
          >
            Delete Page
          </button>
        </motion.span>
      </div>
    </header>
  );
};

export default PageHeader;
