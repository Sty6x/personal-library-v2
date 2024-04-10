const EditBookBtn = ({
  openBookForm,
}: {
  openBookForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => openBookForm((prev) => (prev ? false : true))}
      id="edit-book-btn"
      className="fixed right-[3%] top-8 max-sm:top-[2%] rounded-full p-1 box-border
      bg-accent-one font-semibold shadow-btn-hover transition-shadow hover:transition-shadow z-[30]
        hover:shadow-btn-hover-active"
    >
      <div className="flex gap-1 items-center">
        <span
          id="edit-book-icon"
          className="edit-icon flex place-items-center  justify-center"
        />
      </div>
    </button>
  );
};

export default EditBookBtn;
