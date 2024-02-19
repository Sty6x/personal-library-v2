type t_BookItemList = {
  children: React.ReactNode;
};
const BookItemList = ({ children }: t_BookItemList) => {
  return (
    <div className="grid grid-cols-2 auto-rows-[minmax(250px,1fr)] gap-4">
      {children}
    </div>
  );
};

export default BookItemList;
