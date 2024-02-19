type t_BookItemList = {
  children: React.ReactElement;
};
const BookItemList = ({ children }: t_BookItemList) => {
  return <div>{children}</div>;
};

export default BookItemList;
