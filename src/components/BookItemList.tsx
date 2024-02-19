type t_BookItemList = {
  children: React.ReactNode;
};
const BookItemList = ({ children }: t_BookItemList) => {
  return (
    <div className="grid grid-cols-2 auto-rows-[minmax(300px,1fr)] gap-4">
      {children}
    </div>
  );
};

export default BookItemList;
