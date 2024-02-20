import { t_book } from "../../types/t_library";
import LibraryStorage from "../Library";

export default async function libraryLoader({ params }: any) {
  return [...LibraryStorage.books];
}
