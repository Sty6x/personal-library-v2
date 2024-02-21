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
      className={` flex justify-center items-center   text-black text-xl `}
      style={{ background: color }}
    >
      <div className="max-w-[70%] font-semibold">
        {quote}
        <span className="block text-right mt-4 font-bold">-{author}</span>
      </div>
    </div>
  );
};
export default PlaceholderBookItem;
