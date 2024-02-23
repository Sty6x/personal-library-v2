const BookHeader = ({ title, author }: { title: string; author: string }) => {
  return (
    <div className="w-[fit-content] max-md:w-[30em] max-[640px]:w-[20em] max-[400px]:w-full">
      <span>
        <h1 className="text-7xl text-pretty max-sm:text-4xl max-md:text-5xl max-[320px]:text-3xl font-bold">
          {title}
        </h1>
      </span>
      <span>
        <p className="text-2xl max-md:text-lg max-[320px]:text-base font-semibold">
          by {author}
        </p>
      </span>
    </div>
  );
};

export default BookHeader;
