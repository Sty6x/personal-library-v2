const BookHeader = ({ title, author }: { title: string; author: string }) => {
  return (
    <div className=" w-[max-content]">
      <span>
        <h1 className="text-7xl font-bold drop-shadow-text-shadow">{title}</h1>
      </span>
      <span>
        <p className="text-2xl font-semibold drop-shadow-text-shadow">
          by {author}
        </p>
      </span>
    </div>
  );
};

export default BookHeader;
