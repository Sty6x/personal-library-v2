import LibraryStorage from "../Library";

export default async function appLoader({ params }: any) {
  const books = LibraryStorage.books.map((book) => {
    const getNotes = LibraryStorage.notes.filter(
      (note) => note.bookID === book.id
    );

    return { ...book, notes: getNotes };
  });
  console.log(books);
  return books;
}
