const PlaceholderBookItem = ({
  data: { color, quote, author },
}: {
  data: {
    color: string;
    quote: string;
    author: string;
  };
}) => {
  return (
    <div
      className={`max-lg:hidden flex justify-center h-full items-center items`}
      style={{ background: color }}
    >
      {/* bg-black text-white */}
      <div className="flex rounded-md justify-center items-center flex-col w-[80%] h-[80%] font-semibold ">
        <div className="p-6 text-lg leading-[1.2rem]">
          <em className=" italic">{quote}</em>
          <span className="block text-right mt-3 font-bold">-{author}</span>
        </div>
      </div>
    </div>
  );
};
export default PlaceholderBookItem;
