type t_BookItemList = {
  children: React.ReactNode;
  bookItems: React.ReactNode;
};
const BookItemList = ({ bookItems, children }: t_BookItemList) => {
  return (
    <div>
      {children}
      <div className="grid grid-cols-2 auto-rows-[minmax(250px,1fr)] gap-4">
        {bookItems}
      </div>
    </div>
  );
};

export default BookItemList;
