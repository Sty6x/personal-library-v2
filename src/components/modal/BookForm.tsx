import { FormEvent, useEffect, useRef, useState } from "react";
import { t_bookFormData } from "../../types/t_library";

type t_newBookForm = {
  isOpened: boolean;
  type: "Add" | "Edit";
  isOpenedSetter: React.Dispatch<React.SetStateAction<boolean>>;
  submitHandler: (bookData: t_bookFormData) => void;
  editCurrentBook?: t_bookFormData;
};
const BookForm = ({
  isOpened,
  type,
  isOpenedSetter,
  submitHandler,
  editCurrentBook,
}: t_newBookForm) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isFavorite, setIsFavorite] = useState(
    editCurrentBook
      ? editCurrentBook.favorite === "favorite"
        ? true
        : false
      : false
  );
  useEffect(() => {
    if (isOpened) {
      dialogRef.current?.showModal();
      return;
    }

    dialogRef.current?.close();
  }, [isOpened]);

  return (
    <dialog
      onClose={() => {
        isOpenedSetter(false);
      }}
      ref={dialogRef}
      id=" book-modal"
      className="flex rounded-md shadow-btn-hover items-center"
    >
      <div className="h-[max-content] w-[400px] ">
        <div className="">
          <h1 className="text-2xl font-bold px-6 py-3">{type} Book</h1>
        </div>
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form as HTMLFormElement);
            const entries = Object.fromEntries(
              formData.entries()
            ) as t_bookFormData;

            submitHandler({
              ...entries,
              favorite: isFavorite ? "favorite" : "",
            });
            isOpenedSetter(false);
          }}
          className="px-6 py-2 flex flex-col gap-3"
        >
          <div className="book-form-inputs-container flex flex-col gap-1">
            <label className="text-md block text-lg" htmlFor="title">
              Title
            </label>
            <input
              defaultValue={editCurrentBook?.title}
              required
              type="text"
              name="title"
              id="title"
              className="rounded w-full px-2 py-1 outline-none border-separator-100 border border-solid"
            />
          </div>
          <div className="book-form-inputs-container flex flex-col gap-1">
            <label className="text-md block text-lg " htmlFor="author">
              Author
            </label>
            <input
              defaultValue={editCurrentBook?.author}
              required
              type="text"
              name="author"
              id="author"
              className="rounded w-full px-2 py-1 outline-none border-separator-100 border border-solid"
            />
          </div>

          <div className="book-form-inputs-container items-center flex gap-2">
            <label
              onClick={(e) => {
                const currentTarget = e.currentTarget;
                setIsFavorite(!isFavorite ? true : false);
                if (isFavorite) {
                  currentTarget.classList.replace(
                    "checked-favorite",
                    "unchecked-favorite"
                  );
                  return;
                }
                currentTarget.classList.replace(
                  "unchecked-favorite",
                  "checked-favorite"
                );
              }}
              id="favorite-label"
              className={`${
                editCurrentBook
                  ? editCurrentBook.favorite !== "favorite"
                    ? "unchecked-favorite"
                    : "checked-favorite"
                  : "unchecked-favorite"
              } text-md w-[3em] h-[1.4em] `}
              htmlFor="favorite"
            />
            <input
              defaultValue={
                editCurrentBook?.favorite !== undefined ? "favorite" : ""
              }
              type="checkbox"
              name="favorite"
              id="favorite"
              className="rounded w-[min-content] px-2 py-1 outline-none border-separator-100 border border-solid"
            />
            <label className="text-md" htmlFor="favorite">
              Add to favorites
            </label>
          </div>
          <div className="flex ">
            <span className="py-3">
              <button
                type="submit"
                className="text-white font-semibold bg-primary-main rounded p-2"
              >
                Done
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  isOpenedSetter(false);
                }}
                className="ml-3 hover:underline"
              >
                Cancel
              </button>
            </span>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default BookForm;
