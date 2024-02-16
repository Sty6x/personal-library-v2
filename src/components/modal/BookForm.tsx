import { useEffect, useRef } from "react";

type t_newBookForm = {
  isOpened: boolean;
  type: "Add" | "Edit";
  children?: React.ReactNode;
};
const BookForm = ({ isOpened, type, children }: t_newBookForm) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      id=" book-modal"
      className="flex rounded-md shadow-btn-hover items-center"
    >
      <div className="h-[max-content] w-[400px] ">
        <div className="">
          <h1 className="text-2xl font-bold px-6 py-3">{type} Book</h1>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="px-6 py-2 flex flex-col gap-3"
        >
          <div className="book-form-inputs-container flex flex-col gap-1">
            <label className="text-md block text-lg" htmlFor="title">
              Title
            </label>
            <input
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
              type="text"
              name="author"
              id="author"
              className="rounded w-full px-2 py-1 outline-none border-separator-100 border border-solid"
            />
          </div>

          <div className="book-form-inputs-container items-center flex gap-2">
            <input
              type="button"
              name="favorite"
              id="favorite-button-form"
              className="rounded w-[min-content] px-2 py-1 outline-none border-separator-100 border border-solid"
            />
            <label className="text-md" htmlFor="favorite">
              Add to favorites
            </label>
          </div>
          <div className="flex ">
            <span className="py-3">
              <button className="text-white font-semibold bg-primary-main rounded p-2">
                Done
              </button>
              <button className="ml-3 hover:underline">Cancel</button>
            </span>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default BookForm;
