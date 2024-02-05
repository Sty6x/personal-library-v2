import { Link, useOutletContext, useParams } from "react-router-dom";
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
import { AnimatePresence } from "framer-motion";

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
    <div
      id="page"
      className="max-w-[1440px] flex gap-6 flex-col justify-start w-[100%]"
    >
      <header>
        <BookHeader
          title={pageData?.book.title as string}
          author={pageData?.book.author as string}
        />
        <p className="text-xl">Page {pageData?.currentPage.pageNum}</p>
        <span className="flex gap-4 items-center mt-3">
          <Link
            className="add-icon w-[max-content] before:mr-[.3em] items-center before:h-[20px] relative flex content-center bg-primary-link  rounded-sm shadow-btn-hover hover:shadow-btn-hover-active transition-shadow hover:transition-shadow duration-200 px-4 py-1 text-lg"
            to={"/#"}
          >
            Add Note
          </Link>
          <Link
            to={"/library"}
            className="add-icon w-[max-content] before:mr-[.3em] items-center before:h-[20px] relative flex content-center bg-accent-green-200  rounded-sm shadow-btn-hover hover:shadow-btn-hover-active transition-shadow hover:transition-shadow duration-200 px-4 py-1 text-lg"
          >
            Add Page
          </Link>
        </span>
      </header>
      <section className="w-[80em] max-h-[80%]">
        <div
          id="notes-container"
          className="h-[35em] justify-start overflow-y-auto"
        >
          <AnimatePresence custom={"popLayout"}>
            <div className="w-full note mb-3  text-2xl grid place-items-center h-[max-content] border-solid border-b-black py-6 border-b-2">
              War's Brutality: "In the chaos of battle, we lost our humanity.
              The brutality of war stripped away our illusions, leaving only the
              stark reality of survival amidst destruction."
            </div>
            <div className="w-full note mb-3  text-2xl grid place-items-center h-[max-content] border-solid border-b-black py-6 border-b-2">
              War's Brutality: "In the chaos of battle, we lost our humanity.
              The brutality of war stripped away our illusions, leaving only the
              stark reality of survival amidst destruction." War's Brutality:
              "In the chaos of battle, we lost our humanity. The brutality of
              war stripped away our illusions, leaving only the stark reality of
              survival amidst destruction." War's Brutality: "In the chaos of
              battle, we lost our humanity. The brutality of war stripped away
              our illusions, leaving only the stark reality of survival amidst
              destruction."
            </div>

            <div className="w-full note mb-3  text-2xl grid place-items-center h-[max-content] border-solid border-b-black py-6 border-b-2">
              Loss of Innocence: "The frontlines were a graveyard for innocence.
              Youthful dreams perished in the mud and blood, replaced by a grim
              understanding of the harsh realities of warfare." Loss of Loss of
              Innocence: "The frontlines were a graveyard for innocence.
              Youthful dreams perished in the mud and blood, replaced by a grim
              understanding of the harsh realities of warfare." Innocence: "The
              frontlines were a graveyard for innocence. Youthful dreams
              perished in the mud and blood, replaced by a grim understanding of
              the harsh realities of warfare." Loss of Innocence: "The
              frontlines were a graveyard for innocence. Youthful dreams
              perished in the mud and blood, replaced by a grim understanding of
              the harsh realities of warfare."
            </div>

            <div className="w-full note mb-3  text-2xl grid place-items-center h-[max-content] border-solid border-b-black py-6 border-b-2">
              The Futility of War: "As the battles raged on, we questioned the
              purpose of it all. The once glorified notions of heroism and honor
              faded, giving way to the senseless and cyclical nature of
              conflict." The Futility of War: "As the battles raged on, we
              questioned the purpose of it all. The once glorified notions of
              heroism and honor faded, giving way to the senseless and cyclical
              nature of conflict." The Futility of War: "As the battles raged
              on, we questioned the purpose of it all. The once glorified
              notions of heroism and honor faded, giving way to the senseless
              and cyclical nature of conflict." The Futility of War: "As the
              battles raged on, we questioned the purpose of it all. The once
              glorified notions of heroism and honor faded, giving way to the
              senseless and cyclical nature of conflict." The Futility of War:
              "As the battles raged on, we questioned the purpose of it all. The
              once glorified notions of heroism and honor faded, giving way to
              the senseless and cyclical nature of conflict."
            </div>
            <div className="w-full note mb-3  text-2xl grid place-items-center h-[max-content] border-solid border-b-black py-6 border-b-2">
              Post-War Trauma: "Surviving the war was only the beginning. The
              scars of battle haunted us long after the guns fell silent, a
              constant reminder of the toll war exacts on the human soul."
              Post-War Trauma: "Surviving the war was only the beginning. The
              scars of battle haunted us long after the guns fell silent, a
              constant reminder of the toll war exacts on the human soul."
              Post-War Trauma: "Surviving the war was only the beginning. The
              scars of battle haunted us long after the guns fell silent, a
              constant reminder of the toll war exacts on the human soul."
            </div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Page;
