import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type t_BookItemList = {
  bookItems: React.ReactNode[];
  headerTitle: string;
  addLink?: boolean;
  link?: string;
  linkName?: string;
  onEmptyText?: string;
};
const BookItemList = ({
  bookItems,
  headerTitle,
  addLink = true,
  linkName,
  link,
  onEmptyText,
}: t_BookItemList) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  function handleSmallScreenSizeCheck(): void {
    if (innerWidth <= 1280) {
      setIsSmallScreen(true);
      return;
    }
    setIsSmallScreen(false);
  }
  useEffect(() => {
    handleSmallScreenSizeCheck();
    window.addEventListener("resize", () => {
      handleSmallScreenSizeCheck();
    });
  }, []);

  return (
    <section>
      <div id="book-list-header" className="flex mb-4">
        <h3 className="text-2xl max-[850px]:text-2xl max-md:text-xl font-semibold text-black">
          {headerTitle}
        </h3>

        {addLink && (
          <Link
            to={`/${link}`}
            className={`${
              isSmallScreen && "hidden"
            } max-[850px]:text-sm max-sm:text-[.8rem] flex items-center ml-auto py-1 px-4 font-bold bg-accent-three text-white rounded-sm hover:shadow-btn-hover-active shadow-btn-hover hover:transition-shadow transition-shadow duration-200`}
          >
            {linkName}
          </Link>
        )}
      </div>
      <div
        className={`${
          isSmallScreen ? "grid-cols-2" : "grid-cols-3"
        } grid max-[800px]:flex flex-col auto-rows-[minmax(200px,1fr)] gap-4`}
      >
        {bookItems && bookItems.length > 0 ? bookItems : onEmptyText}
      </div>
    </section>
  );
};

export default BookItemList;
