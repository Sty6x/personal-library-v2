import LibraryStorage from "../Library";

export default async function appLoader({ params }: any) {
  return [...LibraryStorage.books];
}
