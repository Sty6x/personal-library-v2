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
      className={`grid place-content-center max-w-fit px-10 text-black text-xl `}
      style={{ background: color }}
    >
      {quote}
      <span className="ml-auto mt-4 font-bold">-{author}</span>
    </div>
  );
};
export default PlaceholderBookItem;
