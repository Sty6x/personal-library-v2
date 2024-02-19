import libImage from "../../assets/images/libimage.png";
import BookItemList from "../../components/BookItemList";
const Library = () => {
  return (
    <main
      id="library-page"
      className="h-[100dvh] bg-gridWhite flex justify-center"
    >
      <div className="relative outline-none w-[80%] max-w-[1440px] flex flex-col justify-start mx-16 my-16">
        <header className="py-4">
          <div id="library-header-contents" className="flex items-center">
            <span className=" inline-block">
              <h2 className="text-6xl">Hello, Welcome back!</h2>
              <h1 className="text-5xl font-bold">Your Library</h1>
              <button className=" mt-4 flex items-center add-icon w-[max-content] text-xl font-regular py-1 px-4 bg-primary-link rounded-sm hover:shadow-btn-hover-active shadow-btn-hover hover:transition-shadow transition-shadow duration-200">
                Add Book
              </button>
            </span>
            <span className="inline-block ml-auto">
              <img id="library-image" alt="library" src={libImage} />
            </span>
          </div>
        </header>
        <BookItemList></BookItemList>
      </div>
    </main>
  );
};

export default Library;
