const EditBookBtn = ({
  openBookForm,
}: {
  openBookForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => openBookForm((prev) => (prev ? false : true))}
      id="edit-book-btn"
      className="fixed right-[11%] top-10 max-sm:right-[10%] rounded-md px-3 py-2 box-border
      bg-accent-one font-semibold shadow-btn-hover transition-shadow hover:transition-shadow z-[30]
        hover:shadow-btn-hover-active"
    >
      <div className="flex gap-1 items-center">
        <span
          id="edit-book-icon"
          className="edit-icon grid place-items-center max-sm:w-[20px]"
        ></span>
        <span className="text-lg max-sm:text-sm">Edit Book</span>
      </div>
    </button>
  );
};

export default EditBookBtn;
