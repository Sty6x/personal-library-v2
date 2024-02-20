import { t_book } from "../../types/t_library";
import LibraryStorage from "../Library";

export default async function libraryLoader({ params }: any) {
  const [first, second]: Array<t_book> = LibraryStorage.books.sort(
    (a, b) =>
      (new Date(b.lastUpdated) as any) - (new Date(a.lastUpdated) as any)
  );
  return [first, second];
}
