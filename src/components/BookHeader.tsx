const BookHeader = ({ title, author }: { title: string; author: string }) => {
  return (
    <div className=" w-[fit-content]">
      <span>
        <h1 className="text-7xl font-bold">{title}</h1>
      </span>
      <span>
        <p className="text-2xl font-semibold">by {author}</p>
      </span>
    </div>
  );
};

export default BookHeader;
