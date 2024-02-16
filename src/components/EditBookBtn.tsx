const EditBookBtn = ({
  openBookForm,
}: {
  openBookForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <button
      onClick={() => openBookForm((prev) => (prev ? false : true))}
      id="edit-book-btn"
      className="fixed right-20 top-10 rounded-md px-3 py-2 box-border
      bg-white shadow-btn-hover transition-shadow hover:transition-shadow z-[30]
        hover:shadow-btn-hover-active"
    >
      <div className="flex gap-2 justify-center">
        <span id="edit-book-icon"></span>
        <span className="text-lg">Edit Book</span>
      </div>
    </button>
  );
};

export default EditBookBtn;
