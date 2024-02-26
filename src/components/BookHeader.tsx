const BookHeader = ({ title, author }: { title: string; author: string }) => {
  return (
    <div className="min-[600px]:max-w-[28em] md:max-w-[40em] max-sm:max-w-[20em] flex flex-col max-[400px]:w-full ">
      <span className=" inline-block">
        <h1 className="text-7xl text-pretty max-sm:text-4xl max-md:text-5xl max-[320px]:text-3xl font-bold">
          {title}
        </h1>
      </span>
      <span className="w-fit  inline-block">
        <p className="text-2xl max-md:text-lg max-[320px]:text-base font-semibold">
          by {author}
        </p>
      </span>
    </div>
  );
};

export default BookHeader;
